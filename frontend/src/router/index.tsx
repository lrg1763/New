import About from '../pages/About/About'
import Index from '../pages/Index/Index'
import Contacts from '../pages/Contacts/Contacts'
import Profile from '../pages/Profile/Profile'

// Определение маршрутов для приложения
export const routes = [
  {
    path: '/MusicStore-React/about', // Путь для страницы "О нас"
    element: <About />, // Компонент, который будет отображен для этого пути
    exact: true, // Точное совпадение пути
  },
  {
    path: '/MusicStore-React/', // Путь для главной страницы
    element: <Index />, // Компонент, который будет отображен для этого пути
    exact: true, // Точное совпадение пути
  },
  {
    path: '/MusicStore-React/contacts', // Путь для страницы "Контакты"
    element: <Contacts />, // Компонент, который будет отображен для этого пути
    exact: true, // Точное совпадение пути
  },
  {
    path: '/MusicStore-React/profile', // Путь для страницы "Личный кабинет"
    element: <Profile />, // Компонент, который будет отображен для этого пути
    exact: true, // Точное совпадение пути
  },
]
