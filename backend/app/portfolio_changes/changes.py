from datetime import datetime

import pytz
import requests
from sqlalchemy.ext.asyncio import AsyncSession

from backend.app.portfolio.shares_operations import get_user_shares


def get_time():
    """Функция, которая проверяет окончание торговой сессии"""
    moscow_tz = pytz.timezone("Europe/Moscow")
    now_moscow = datetime.now(moscow_tz)
    target_time = now_moscow.replace(hour=19, minute=0, second=0, microsecond=0)
    if now_moscow == target_time:
        return True
    else:
        return False


def get_stock_changes_info(ticker):
    """Функция для получения данных по акции(изменение цены * размер лота)"""
    url = f"https://iss.moex.com/iss/engines/stock/markets/shares/boards/TQBR/securities/{ticker}.json"
    response = requests.get(url)
    open_prise = response.json()["marketdata"]["data"][0][9]
    close_prise = response.json()["marketdata"]["data"][0][12]
    lotsize = response.json()["securities"]["data"][0][4]
    price_change = open_prise - close_prise
    return price_change * lotsize


async def get_changes(token, db: AsyncSession):
    """Запись изменений цен каждой акции в словарь(тикер:изменение)"""
    shares = await get_user_shares(token, db)
    if get_time():
        if shares == "User has no shares":
            return shares
        else:
            changes_dict = {}
            for ticker in shares:
                changes_dict[ticker] = get_stock_changes_info(ticker) * shares[ticker]
        return changes_dict
