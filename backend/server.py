import uvicorn


def start():
    uvicorn.run("app.app:app", host="localhost", port=80, reload=True)


if __name__ == "__main__":
    start()
