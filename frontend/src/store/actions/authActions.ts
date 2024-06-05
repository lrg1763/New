import { IUser } from '../../types/types'

// Действие для входа пользователя
export const loginUser = (user: IUser) => ({
  type: 'LOGIN', // Тип действия
  payload: user, // Данные пользователя
})

// Действие для выхода пользователя
export const logoutUser = () => ({
  type: 'LOGOUT', // Тип действия
})

// Действие для регистрации пользователя
export const registerUser = (user: IUser) => {
  return {
    type: 'REGISTER', // Тип действия
    payload: user, // Данные пользователя
  }
}

// Действие для удаления пользователя
export const deleteUser = (user: IUser) => {
  return {
    type: 'DELETE', // Тип действия
    payload: user, // Данные пользователя
  }
}
