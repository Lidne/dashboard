from typing import Union

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession

from backend.app.authentication.auth import (auth, cookie_check, cookies,
                                             get_user, logout, register)
from backend.app.authentication.token import decodeJWT
from backend.app.parsing_news import news_list
from backend.app.send_EMAIL import send_email
from backend.models import schema
from backend.models.database import get_session

app = FastAPI()

origins = ["http://localhost:5173", "http://127.0.0.1:5713"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/account/register", status_code=201)
async def register_user(
    user_data: schema.UserCreate,
    db: AsyncSession = Depends(get_session),
    check=Depends(cookie_check),
):
    if check:
        data = await register(db=db, user_data=user_data)
        return cookies(data)


@app.get("/get_user_info_by_token")
async def get_user(token=Depends(get_user)):
    try:
        return decodeJWT(token)
    except Exception:
        raise HTTPException(
            status_code=401,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"}
        )


@app.post("/account/login")
async def login_user(
    user_data: schema.UserLogin,
    db: AsyncSession = Depends(get_session),
    check=Depends(cookie_check),
):
    if check:
        return await auth(db, user_data)


@app.get("/account/logout")
async def logout_user(result=Depends(logout)):
    return result


@app.get("/news")
async def new_list(from_: str, to_: str = "") -> dict[str, list[dict]]:
    dict_news = {"NEWS": news_list(from_, to_)}
    return dict_news


@app.post("/email")
async def email_send(
    address: str, text: Union[str, None] = None, type_html: Union[str, None] = None
) -> str:
    return send_email(address, text, type_html)


@app.get("/items/{item_id}")
async def read_item(item_id: Union[int, None] = None, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
