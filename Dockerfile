FROM node:18-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install
COPY . .

RUN npx prisma generate

RUN npm run build

FROM gcr.io/distroless/nodejs:18
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/prisma ./prisma
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000
CMD ["dist/main.js"]