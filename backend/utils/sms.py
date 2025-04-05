# from fastapi import FastAPI, Request, HTTPException, Header
# from pymongo import MongoClient
# from datetime import datetime
# import os
# import jwt
# from pydantic import BaseModel, Field
# from dotenv import load_dotenv
# from typing import Optional

# # Load environment variables first
# load_dotenv()

# app = FastAPI()

# # Get config from environment
# SIGNING_KEY = os.getenv("HTTPSMS_SIGNING_KEY", "default_secret")
# MONGO_URI = os.getenv("MONGO_ENDPOINT", "mongodb://localhost:27017")

# # MongoDB connection
# client = MongoClient(MONGO_URI)
# db = client["haven_alerts"]
# sms_collection = db["incoming_sms"]

# # Pydantic models
# class SMSUser(BaseModel):
#     phone_number: str = Field(..., alias="phoneNumber")

# class SMSDataFlat(BaseModel):
#     message_id: str
#     user_id: str
#     owner: str  # sender
#     contact: str  # receiver
#     timestamp: str
#     content: str
#     sim: Optional[str] = None
#     encrypted: Optional[bool] = False

# class SMSWebhookPayload(BaseModel):
#     id: Optional[str] = None
#     type: Optional[str] = None
#     data: SMSDataFlat
#     time: Optional[str] = None


# class SMSWebhookPayload(BaseModel):
#     id: Optional[str] = None
#     type: Optional[str] = None
#     data: SMSDataFlat
#     time: Optional[str] = None

# def validate_jwt(token: str):
#     try:
#         return jwt.decode(
#             token,
#             SIGNING_KEY,
#             algorithms=["HS256"],
#             options={"verify_aud": False}
#         )
#     except jwt.PyJWTError as e:
#         raise HTTPException(status_code=401, detail=f"Invalid token: {str(e)}")

# # @app.post("/webhook/sms")
# # async def handle_sms_webhook(
# #     payload: SMSWebhookPayload,
# #     request: Request,
# #     x_event_type: str = Header(...),
# #     authorization: str = Header(default="")
# # ):
# #     if not authorization.startswith("Bearer "):
# #         raise HTTPException(status_code=401, detail="Missing Bearer token")
    
# #     jwt_token = authorization.split("Bearer ")[1].strip()
# #     validate_jwt(jwt_token)

# #     if x_event_type != "message.phone.received":
# #         return {"status": "ignored", "event": x_event_type}

# #     try:
# #         sms_data = {
# #     "sender": payload.data.owner,
# #     "receiver": payload.data.contact,
# #     "content": payload.data.content,
# #     "timestamp": datetime.fromisoformat(payload.data.timestamp.replace("Z", "+00:00")),
# #     "event_id": payload.id or payload.data.message_id
# # }

# #     except ValueError as e:
# #         raise HTTPException(
# #             status_code=422,
# #             detail=f"Invalid timestamp format: {str(e)}"
# #         )

# #     result = sms_collection.insert_one(sms_data)
    
# #     return {
# #         "status": "success",
# #         "event_id": payload.id,
# #         "mongo_id": str(result.inserted_id)
# #     }

# # @app.middleware("http")
# # async def log_requests(request: Request, call_next):
# #     body = await request.body()
# #     print(f"Incoming request: {body.decode()}")
# #     response = await call_next(request)
# #     return response


