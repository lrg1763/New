import { UserState, UserAction } from '../types'

// Начальное состояние аутентификации пользователя
const initialState: UserState = {
	user: null,
	isAuthenticated: false,
}

// Редуктор для управления состоянием аутентификации пользователя
export const authReducer = (
	state: UserState = initialState,
	action: UserAction,
): UserState => {
	switch (action.type) {
		// Действие для входа пользователя
		case 'LOGIN':
			// Сохранение текущего пользователя в localStorage
			localStorage.setItem('current_user', JSON.stringify(action.payload))
			return {
				...state,
				user: action.payload,
				isAuthenticated: true,
			}
		// Действие для выхода пользователя
		case 'LOGOUT':
			// Удаление текущего пользователя из localStorage
			localStorage.removeItem('current_user')
			return {
				...state,
				user: null,
				isAuthenticated: false,
			}
		// Действие для регистрации пользователя
		case 'REGISTER':
			// Сохранение нового пользователя и установка текущего пользователя в localStorage
			localStorage.setItem(action.payload.email, JSON.stringify(action.payload))
			localStorage.setItem('current_user', JSON.stringify(action.payload))
			return {
				...state,
				user: action.payload,
				isAuthenticated: true,
			}
		// Действие для удаления пользователя
		case 'DELETE':
			// Удаление пользователя из localStorage
			localStorage.removeItem(action.payload.email)
			localStorage.removeItem('current_user')
			return {
				...state,
				user: null,
				isAuthenticated: false,
			}
		// Возвращает текущее состояние по умолчанию
		default:
			return state
	}
}
