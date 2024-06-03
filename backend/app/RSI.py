import datetime
import json

import pandas as pd
import requests


def calculate_rsi(tiker, fromdate, tilldate, interval, period=14):
    """рассчитывает индекс относительной силы"""
    prices = []
    price_date = []

    # date1 = datetime.datetime(int(fromdate[:4]), int(fromdate[5:7]), int(fromdate[8:]))
    # date2 = datetime.datetime(int(tilldate[:4]), int(tilldate[5:7]), int(tilldate[8:]))

    # получение цен с периодом в днях
    if interval == "day":
        url = f"https://iss.moex.com/iss/history/engines/stock/markets/shares/securities/{tiker}.json?from={fromdate}&till={tilldate}&lang=ru&iss.meta=off&history.columns=TRADEDATE,CLOSE"
        response = requests.get(url)
        data = json.loads(response.text)
        count_data = data['history.cursor']['data'][0][1]
        while count_data > 0:
            columns = pd.DataFrame(data['history']['data'], columns=data['history']['columns'])
            for i in columns["CLOSE"]:
                prices.append(i)
            for j in columns["TRADEDATE"]:
                price_date.append(j)
            count_data -= 100
            if count_data > 0:
                last_date = columns.iloc[-1, 0]
                last_month = last_date[5:7].lstrip('0')
                last_day = last_date[8:].lstrip('0')
                last_year = last_date[:4]
                new_data = datetime.datetime(int(last_year), int(last_month), int(last_day))
                new_data += datetime.timedelta(days=1)
                new_data = str(new_data)
                url = f"https://iss.moex.com/iss/history/engines/stock/markets/shares/securities/{tiker}.json?from={new_data[:10]}&till={tilldate}&lang=ru&iss.meta=off&history.columns=TRADEDATE,CLOSE"
                response = requests.get(url)
                data = json.loads(response.text)

    # получение цен с периодом в часах
    elif interval == "hour":
        url = f"https://iss.moex.com/iss/engines/stock/markets/shares/securities/{tiker}/candles.json?iss.reverse=false&candles.columns=end,close&iss.meta=off&till={tilldate}&from={fromdate}&interval=60"
        response = requests.get(url)
        data = json.loads(response.text)
        new_data = datetime.datetime(int(fromdate[:4]), int(fromdate[5:7].lstrip('0')), int(fromdate[8:10].lstrip('0')),
                                     0)
        new_data -= datetime.timedelta(days=1)
        check = True
        while check:
            count_data = len(data['candles']['data'])
            if count_data < 500:
                check = False
            columns = pd.DataFrame(data['candles']['data'], columns=data['candles']['columns'])
            for i in range(0, len(columns)):
                if new_data < datetime.datetime(int(columns["end"][i][:4]), int(columns["end"][i][5:7].lstrip('0')),
                                                int(columns["end"][i][8:10].lstrip('0')), 0):
                    prices.append(columns["close"][i])
                    price_date.append(columns["end"][i])

            if count_data == 500:
                last_date = columns.iloc[-1, 0]
                last_month = last_date[5:7].lstrip('0')
                last_day = last_date[8:10].lstrip('0')
                last_year = last_date[:4]
                last_hour = last_date[11:13].lstrip('0')
                new_data = datetime.datetime(int(last_year), int(last_month), int(last_day), int(last_hour))
                new_data += datetime.timedelta(hours=1)
                url = f"https://iss.moex.com/iss/engines/stock/markets/shares/securities/{tiker}/candles.json?iss.reverse=false&candles.columns=end,close&iss.meta=off&till={tilldate}&from={str(new_data)[:10]}&interval=60"
                response = requests.get(url)
                data = json.loads(response.text)
    elif interval == "minute":
        url = f"https://iss.moex.com/iss/engines/stock/markets/shares/securities/{tiker}/candles.json?iss.reverse=true&candles.columns=end,close&iss.meta=off&till={tilldate}&from={fromdate}&interval=1"
        response = requests.get(url)
        data = json.loads(response.text)
        new_data = datetime.datetime(int(fromdate[:4]), int(fromdate[5:7].lstrip('0')), int(fromdate[8:10].lstrip('0')),
                                     0, 0)
        new_data -= datetime.timedelta(days=1)
        check = True
        while check:
            count_data = len(data['candles']['data'])
            if count_data <= 500:
                check = False
            columns = pd.DataFrame(data['candles']['data'], columns=data['candles']['columns'])
            for i in range(0, len(columns)):
                minu = columns["end"][i][14:16].lstrip('0')
                if minu == "":
                    minu = 0
                if new_data < datetime.datetime(int(columns["end"][i][:4]), int(columns["end"][i][5:7].lstrip('0')),
                                                int(columns["end"][i][8:10].lstrip('0')),
                                                int(columns["end"][i][11:13].lstrip('0')), int(minu)):
                    prices.append(columns["close"][i])
                    price_date.append(columns["end"][i])

            if count_data == 500:
                last_date = columns.iloc[-1, 0]
                last_month = last_date[5:7].lstrip('0')
                last_day = last_date[8:10].lstrip('0')
                last_year = last_date[:4]
                last_hour = last_date[11:13].lstrip('0')
                last_minute = last_date[14:16].lstrip('0')
                new_data = datetime.datetime(int(last_year), int(last_month), int(last_day), int(last_hour),
                                             int(last_minute))
                new_data += datetime.timedelta(minutes=1)
                url = f"https://iss.moex.com/iss/engines/stock/markets/shares/securities/{tiker}/candles.json?iss.reverse=false&candles.columns=end,close&iss.meta=off&till={tilldate}&from={str(new_data)[:10]}&interval=1"
                response = requests.get(url)
                data = json.loads(response.text)

    # print(prices)
    # print(len(prices))
    # print(price_date)

    if len(prices) <= period:
        raise ValueError("Not enough data points to calculate RSI.")

    # Рассчитает разницу между последовательными ценами
    deltas = [prices[i] - prices[i - 1] for i in range(1, len(prices))]
    # Инициализирует первую среднюю прибыль и убыток
    avg_gain = sum(delta for delta in deltas if delta > 0) / period
    avg_loss = -sum(delta for delta in deltas if delta < 0) / period

    # Инициализирует список RSI первым значением (которое равно NaN).
    rsi_values = [None] * period

    # Рассчитывает RSI для остальных точек данных
    for i in range(period, len(prices)):
        if deltas[i - 1] > 0:
            avg_gain = (avg_gain * (period - 1) + deltas[i - 1]) / period
            avg_loss *= (period - 1) / period
        else:
            avg_loss = (avg_loss * (period - 1) - deltas[i - 1]) / period
            avg_gain *= (period - 1) / period

        if avg_loss != 0:
            rs = avg_gain / avg_loss
            rsi = 100 - (100 / (1 + rs))
        else:
            rsi = 100  # Если avg_loss равен нулю, RSI определяется как 100

        rsi_values.append(rsi)

    answer = [{"name": i, "uv": j} for i, j in zip(price_date, rsi_values)]
    return {"rsi": answer}


# rsi_values = calculate_rsi("YNDX", fromdate="2024-05-29", tilldate="2024-05-30", interval="minute", period=14)
# print(rsi_values)


def main():
    return


if __name__ == "__main__":
    main()
