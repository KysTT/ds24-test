# Тестовое задание 2 «Бронирование номера в отеле»

Реализация API веб сервиса “Бронирование номера в отеле” на NestJS + Prisma ORM и PostgreSQL.

## Prerequisites

- Node.js v18+
- npm 8+
- Docker & Docker Compose (рекомендованный способ запуска)

---

## 1. Локальный запуск (npm)

1. Установите зависимости:

   ```bash
   npm install
   ```

2. Создайте файл `.env` в корне проекта и добавьте:

   ```env
   POSTGRES_URL="postgresql://адрес-локального-postgres:5432"
   ```

   например

   ```env
   POSTGRES_URL="postgresql://root:root@localhost:5432/ds_24_test"
   ```

3. Запустите локальный Postgres (если не установлен, используйте Docker):

   ```bash
   docker run --rm -d \
     --name local-postgres \
     -e POSTGRES_USER=root \
     -e POSTGRES_PASSWORD=root \
     -e POSTGRES_DB=ds_24_test \
     -p 5432:5432 \
     postgres:15-alpine
   ```

4. Выполните миграцию и настройку Prisma:

   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

5. Запустите сервер разработчика:

   ```bash
   npm run start:dev
   ```

6. Откройте в браузере: `http://localhost:3000`

---

## 2. Запуск в Docker

1. Соберите и запустите контейнеры:

   ```bash
   docker-compose up --build
   ```

2. По умолчанию:

   - Приложение доступно на `http://localhost:3000`
   - Postgres на `localhost:5432`
