# Используем базовый образ Node.js
FROM node:14-alpine

# Устанавливаем рабочий каталог внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json в контейнер
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта в контейнер
COPY . .

# Собираем проект
RUN npm run build

# Указываем порт, который будет использовать контейнер
EXPOSE 3000

# Команда для запуска приложения
CMD ["npm", "start"]
