import { IAlbum, IOrder, IOrderHistory } from 'src/types/types'
import { OrderAction, OrderState } from '../types'

// Начальное состояние для управления заказами
const initialState: OrderState = {
	orders: [],
	ordersHistory: [],
}

// Редуктор для управления состоянием заказов
export const orderReducer = (
	state: OrderState = initialState,
	action: OrderAction,
) => {
	switch (action.type) {
		// Устанавливает новый заказ, заменяя текущие заказы
		case 'SET_ORDER': {
			return {
				...state,
				orders: [action.payload],
			}
		}
		// Добавляет товар к заказу или увеличивает количество, если товар уже существует в заказе
		case 'ADD_TO_ORDER': {
			return {
				...state,
				orders: addToOrderReducer(state.orders, action.payload),
			}
		}
		// Уменьшает количество товара в заказе или удаляет товар, если его количество становится нулевым
		case 'REMOVE_FROM_ORDER':
			return {
				...state,
				orders: removeFromOrderReducer(state.orders, action.payload),
			}
		// Удаляет товар из заказа по его идентификатору
		case 'DELETE_ORDER':
			return {
				...state,
				orders: deleteOrderReducer(state.orders, action.payload),
			}
		// Очищает все текущие заказы
		case 'CLEAR_ORDER':
			return {
				...state,
				orders: [],
			}
		// Создает новый заказ и добавляет его в историю заказов
		case 'MAKE_ORDER':
			return {
				...state,
				orders: [],
				ordersHistory: makeOrderReducer(state.ordersHistory, action.payload),
			}
		// Возвращает текущее состояние по умолчанию
		default:
			return state
	}
}

// Добавляет товар к заказу или увеличивает количество, если товар уже существует в заказе
const addToOrderReducer = (orders: IOrder[], item: IAlbum) => {
	const index = orders.findIndex(order => order.id === item.id)
	if (index >= 0) {
		const newOrders = [...orders]
		newOrders[index].count += 1
		return newOrders
	} else {
		return [...orders, { ...item, count: 1 }]
	}
}

// Удаляет товар из заказа по его идентификатору
const deleteOrderReducer = (orders: IOrder[], id: number) => {
	return orders.filter(order => order.id !== id)
}

// Создает новый заказ и добавляет его в историю заказов
const makeOrderReducer = (
	ordersHistory: IOrderHistory[],
	data: {
		orders: IOrder[]
		price: number
	},
) => {
	let today = new Date()
	const newOrder: IOrderHistory = {
		id: ordersHistory.length + 1,
		order: data.orders,
		price: data.price,
		date: today.toLocaleString(),
	}
	return [...ordersHistory, newOrder]
}

// Уменьшает количество товара в заказе или удаляет товар, если его количество становится нулевым
const removeFromOrderReducer = (orders: IOrder[], item: IOrder) => {
	const index = orders.findIndex(order => order.id === item.id)
	if (index >= 0) {
		if (orders[index].count > 1) {
			const newOrders = [...orders]
			newOrders[index].count -= 1
			return newOrders
		} else {
			const newOrders = [...orders]
			newOrders.splice(index, 1)
			return newOrders
		}
	}
	return orders
}
