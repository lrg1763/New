import { createStore, combineReducers, applyMiddleware } from 'redux'
import { authReducer } from './reducers/authReducer'
import thunk from 'redux-thunk'
import { orderReducer } from './reducers/orderReducer'
import { filterReducer } from './reducers/filterReducer'
import { itemReducer } from './reducers/itemReducer'

// Комбинирование всех редукторов в один корневой редуктор
const rootReducer = combineReducers({
	// Редуктор для управления состоянием аутентификации
	auth: authReducer,
	// Редуктор для управления состоянием заказов
	order: orderReducer,
	// Редуктор для управления состоянием фильтров
	filter: filterReducer,
	// Редуктор для управления состоянием товаров
	items: itemReducer,
})

// Создание хранилища Redux и применение промежуточного программного обеспечения Redux Thunk для обработки асинхронных действий
export const store = createStore(rootReducer, applyMiddleware(thunk))

// Определение типа корневого состояния, чтобы облегчить работу с типами в вашем приложении
export type RootState = ReturnType<typeof rootReducer>
