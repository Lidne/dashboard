from fastapi import Depends, FastAPI
from sqlalchemy.ext.asyncio import AsyncSession

from backend.app.authentication.auth import (
    register,
    cookies,
    get_user,
    auth,
    logout,
    cookie_check,
)
from backend.app.authentication.token import decodeJWT
from backend.models import schema
from backend.models.database import get_session

app = FastAPI()


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
    return decodeJWT(token)


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
