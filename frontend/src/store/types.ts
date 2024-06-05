// Определение типов данных для пользователей, заказов и альбомов
import { IAlbum, IOrder, IOrderHistory, IUser } from 'src/types/types'

// Интерфейс для действия по сохранению пользователя (вход в систему)
export interface ISaveUser {
	type: 'LOGIN'
	payload: IUser
}

// Интерфейс для действия по удалению пользователя (выход из системы)
export interface IRemoveUser {
	type: 'LOGOUT'
}

// Интерфейс для действия по регистрации пользователя
export interface IRegisterUser {
	type: 'REGISTER'
	payload: IUser
}

// Интерфейс для действия по удалению пользователя
export interface IDeleteUser {
	type: 'DELETE'
	payload: IUser
}

// Интерфейс для действия по установке текущего пользователя
export interface ICurrentUser {
	type: 'CURRENT_USER'
	payload: IUser
}

// Объединение всех действий пользователя в один тип
export type UserAction =
	| ISaveUser
	| IRemoveUser
	| IRegisterUser
	| IDeleteUser
	| ICurrentUser

// Интерфейс для состояния пользователя
export interface UserState {
	user: IUser | null
	isAuthenticated: boolean
}

// Интерфейс для действия по установке заказа
export interface ISetOrder {
	type: 'SET_ORDER'
	payload: IOrder
}

// Интерфейс для действия по оформлению заказа
export interface IMakeOrder {
	type: 'MAKE_ORDER'
	payload: { orders: IOrder[]; price: number }
}

// Интерфейс для действия по добавлению товара в заказ
export interface IAddToOrder {
	type: 'ADD_TO_ORDER'
	payload: IAlbum
}

// Интерфейс для действия по удалению товара из заказа
export interface IRemoveOrder {
	type: 'REMOVE_FROM_ORDER'
	payload: IOrder
}

// Интерфейс для действия по удалению заказа
export interface IDeleteOrder {
	type: 'DELETE_ORDER'
	payload: number
}

// Интерфейс для действия по очистке заказа
export interface IClearOrder {
	type: 'CLEAR_ORDER'
}

// Объединение всех действий по заказам в один тип
export type OrderAction =
	| ISetOrder
	| IMakeOrder
	| IAddToOrder
	| IRemoveOrder
	| IDeleteOrder
	| IClearOrder

// Интерфейс для состояния заказа
export interface OrderState {
	orders: IOrder[]
	ordersHistory: IOrderHistory[]
}

// Интерфейс для фильтра
export interface IFilter {
	genre: string
	sort: string
	query: string
}

// Интерфейс для действия по установке фильтра
export interface ISetFilter {
	type: 'SET_FILTER'
	payload: IFilter
}

// Объединение всех действий по фильтрам в один тип
export type FilterAction = ISetFilter

// Интерфейс для состояния фильтра
export interface FilterState {
	filter: IFilter
}

// Экспорт типа RootState для объединенного состояния
// export type RootState = {
// 	auth: UserState
// 	order: OrderState
// 	filter: IFilter
// 	items: ItemState
// }
