import json

import requests
from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.status import HTTP_400_BAD_REQUEST

from backend.app.authentication.token import decodeJWT
from backend.models.models import User
from backend.models.schema import SharesOperations


def get_stock_info(ticker):
    """Функция для получения данных по акции(цену и размер лота)"""
    url = f"https://iss.moex.com/iss/engines/stock/markets/shares/boards/TQBR/securities/{ticker}.json"
    response = requests.get(url)
    price = response.json()["marketdata"]["data"][0][12]
    lotsize = response.json()["securities"]["data"][0][4]
    return price, lotsize


async def buy(token, db: AsyncSession, ticker: str, input_schema: SharesOperations):
    """Функция для покупки акций и записи купленных акций и изменений баланса в бд"""
    amount = input_schema.amount
    user_info = decodeJWT(token)
    share_info = get_stock_info(ticker)
    price = share_info[0] * share_info[1] * amount
    user = await db.scalar(select(User).where(User.email == user_info["email"]))
    balance = user.balance
    # проверка на то, хватает ли пользователю денег для покупки
    if int(balance * 100) < int(price * 100):
        raise HTTPException(status_code=HTTP_400_BAD_REQUEST, detail="Not enough balance")
    else:
        balance = (int(balance * 100) - int(price * 100)) / 100
        user.balance = balance
        shares_dict = user.purchased_shares
        if shares_dict is None:
            shares_dict = {ticker: amount}
        else:
            shares_dict = json.loads(user.purchased_shares)
            if ticker in shares_dict:
                shares_dict[ticker] += amount
            else:
                shares_dict[ticker] = amount
        user.purchased_shares = json.dumps(shares_dict)
        await db.commit()

    return f"You successfully bought {amount} {ticker}"


async def sell(token, db: AsyncSession, ticker: str, input_schema: SharesOperations):
    """Функция для покупки акций и записи купленных акций и изменений баланса в бд"""
    amount = input_schema.amount
    user_info = decodeJWT(token)
    share_info = get_stock_info(ticker)
    price = share_info[0] * share_info[1] * amount
    user = await db.scalar(select(User).where(User.email == user_info["email"]))
    balance = user.balance
    shares_dict = user.purchased_shares
    # проверка есть ли у пользователя акции
    if shares_dict is None:
        raise HTTPException(status_code=HTTP_400_BAD_REQUEST, detail="Not enough shares")
    else:
        shares_dict = json.loads(shares_dict)
    # проверка есть ли у пользователя данные акции и достаточно ли у него их для продажи
    if ticker not in shares_dict or amount > shares_dict[ticker]:
        raise HTTPException(status_code=HTTP_400_BAD_REQUEST, detail="Not enough shares")
    else:
        balance = (int(balance * 100) + int(price * 100)) / 100
        user.balance = balance
        if shares_dict[ticker] == amount:
            del shares_dict[ticker]
        else:
            shares_dict[ticker] -= amount
        if shares_dict == {}:
            user.purchased_shares = None
        else:
            user.purchased_shares = json.dumps(shares_dict)
        await db.commit()

    return f"You successfully sold {amount} {ticker}"


async def get_user_shares(token, db: AsyncSession):
    """Получить акции, которыми владеет пользователь"""
    user_info = decodeJWT(token)
    user = await db.scalar(select(User).where(User.email == user_info["email"]))
    shares_dict = user.purchased_shares
    if shares_dict is None:
        return "User has no shares"
    else:
        return json.loads(shares_dict)


async def get_user_balance(token, db: AsyncSession):
    """Получить баланс пользователя"""
    user_info = decodeJWT(token)
    user = await db.scalar(select(User).where(User.email == user_info["email"]))
    return {"balance": user.balance}
