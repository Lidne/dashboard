# StockView
Группа: М80-101Б-23
Состав команды:
- **Ермеков Георгий** - тимлид, frontend
- **Руснак Александр** - backend
- **Маврин Иван** - backend
- **Ярусов Ярослав** - frontend

## Инструкция по запуску:
> Все команды указаны относительно корневой папки проекта
1. Установка poetry:
   ```
   pip install poetry
   ```
2. Node.js можно установить с [официального сайта]("https://nodejs.org/en/download/prebuilt-installer")
3. Установка зависимостей для backend части:
   ```
   poetry lock
   poetry install
   ```
4. Обновление БД:
   ```
   poetry run alembic upgrade head
   ```
5. Запуск backend:
   ```
   poetry run python -m backend.server
   ```
6. Установка зависимостей frontend части:
   ```
   cd frontend
   npm install
   ```
7. Запуск frontend:
   ```
   cd frontend
   npm run dev
   ```