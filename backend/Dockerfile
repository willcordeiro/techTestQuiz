# Dockerfile para o backend (NestJS)
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
ENV PRISMA_CLI_QUERY_ENGINE_TYPE=binary
RUN npx prisma generate
RUN npm run build
EXPOSE 3001
CMD npx prisma migrate deploy && node dist/src/main.js
