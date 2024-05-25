import { IAlbum, IOrder } from '../../types/types'

// Устанавливает текущий заказ
export const setOrder = (order: IOrder) => ({
	type: 'SET_ORDER',
	payload: order,
})

// Добавляет элемент в заказ
export const addToOrder = (item: IAlbum) => ({
	type: 'ADD_TO_ORDER',
	payload: item,
})

// Удаляет заказ по идентификатору
export const deleteOrder = (id: number) => ({
	type: 'DELETE_ORDER',
	payload: id,
})

// Очищает текущий заказ
export const clearOrder = () => ({
	type: 'CLEAR_ORDER',
})

// Создает новый заказ с указанными элементами и общей ценой
export const makeOrder = (orders: IOrder[], price: number) => ({
	type: 'MAKE_ORDER',
	payload: { orders, price },
})

// Удаляет элемент из заказа
export const removeFromOrder = (item: IOrder) => ({
	type: 'REMOVE_FROM_ORDER',
	payload: item,
})
