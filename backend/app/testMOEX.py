import requests
import json

link = "https://iss.moex.com/iss/history/engines/stock/markets/shares/securities.json?date=2024-04-12&start=0&numtrades=1"
responce = requests.get(link).text
x = json.loads(responce)["history"]
start = 0
amplitude = []
changes = []
while len(x["data"]) != 0:
    link = f"https://iss.moex.com/iss/history/engines/stock/markets/shares/securities.json?date=2024-04-12&start={start}&numtrades=1"
    responce = requests.get(link).text
    x = json.loads(responce)["history"]
    print(x["data"])
    print(len(x["data"]))
    for i in x["data"]:
        amplitude.append(i[3])
        changes.append((i[22]))

    start += 100
actions = dict(zip(changes, amplitude))
print(amplitude)
print(actions)
print(changes)
