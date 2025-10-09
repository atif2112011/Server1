# Stage 1: Build frontend
FROM node:18 AS build
WORKDIR /app
COPY frontend ./frontend
WORKDIR /app/frontend
RUN npm install && npm run build

# Stage 2: Setup backend
FROM node:18
WORKDIR /app
COPY backend ./backend
COPY --from=build /app/frontend/dist ./frontend/dist
WORKDIR /app/backend
RUN npm install

ENV NODE_ENV=production
EXPOSE 5000

CMD ["npm", "start"]
