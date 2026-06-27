from sqlalchemy import select
from sqlalchemy.orm import Session
from fastapi import FastAPI, Request, HTTPException
from datetime import datetime
from core.database import Base, engine
from models import Products
from fastapi.middleware.cors import CORSMiddleware
import stripe
from schemas.payment_requests import PaymentRequest
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()
stripe.api_key = os.getenv("STRIPE_API_KEY")
app.add_middleware(  
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_headers=["*"],
    allow_methods=["*"],
)
Base.metadata.create_all(engine)
FRONTEND_URL_TEST = "http://localhost:3000"

@app.get("/")
async def root():
    return { 
        "message": "hello world",
        "current_time": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"),
        "status": 200
    }

@app.get("/products")
async def get_products():
    with Session(engine) as session: 
        stmt = select(Products)
        result = session.scalars(stmt).all()
        return result
    
@app.post("/join")
async def join(request: Request):
    data: dict = await request.json()
    email: str = data.get("email")
    return { 
        "new user": email,
        "status": "success"
    }

@app.post("/create-checkout-session")
async def payment(request: PaymentRequest):
    amount_in_cents = request.amount
    try:   
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data':{
                    'currency': request.currency,
                    'unit_amount': amount_in_cents,
                    'product_data': {
                        'name': 'total del carrito',
                        'description': 'Compra de varios articulos'
                    }
                },
                "quantity": 1
            }],
            mode='payment',
            success_url=f'{FRONTEND_URL_TEST}/', 
            cancel_url=f'{FRONTEND_URL_TEST}/' 
        )
        return {'checkout_url': session.url}

    except Exception as e:
        return HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app="app:app", reload=True, port=8000)