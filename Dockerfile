# Используем базовый образ Node.js
FROM node:18-alpine

# Устанавливаем рабочий каталог внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json для backend
COPY backend/package*.json ./backend/

# Устанавливаем зависимости для backend
RUN cd backend && npm install && npm cache clean --force

# Копируем package.json и package-lock.json для frontend
COPY frontend/package*.json ./frontend/

# Устанавливаем зависимости для frontend
RUN cd frontend && npm install && npm cache clean --force

# Копируем файлы backend
COPY backend ./backend

# Копируем файлы frontend
COPY frontend ./frontend

# Собираем проект frontend
RUN cd frontend && npm run build

# Указываем порт, который будет использовать контейнер
EXPOSE 3000

# Команда для запуска приложения
CMD ["node", "backend/server.js"]
