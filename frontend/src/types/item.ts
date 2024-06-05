// Импорт интерфейса IAlbum из типов
import { IAlbum } from 'src/types/types'

// Интерфейс для состояния товаров
export interface ItemState {
	items: IAlbum[] // Массив товаров
	isLoading: boolean // Флаг загрузки данных
	error: null | string // Сообщение об ошибке, если есть
}

// Перечисление типов действий для товаров
export enum ItemActionTypes {
	FETCH_ITEMS = 'FETCH_ITEMS', // Начало загрузки товаров
	FETCH_ITEMS_SUCCESS = 'FETCH_ITEMS_SUCCESS', // Успешная загрузка товаров
	FETCH_ITEMS_ERROR = 'FETCH_ITEMS_ERROR', // Ошибка при загрузке товаров
}

// Интерфейс для действия начала загрузки товаров
interface FetchItemsAction {
	type: ItemActionTypes.FETCH_ITEMS
}

// Интерфейс для действия успешной загрузки товаров
interface FetchItemsSuccessAction {
	type: ItemActionTypes.FETCH_ITEMS_SUCCESS
	payload: IAlbum[] // Загруженные товары
}

// Интерфейс для действия ошибки при загрузке товаров
interface FetchItemsErrorAction {
	type: ItemActionTypes.FETCH_ITEMS_ERROR
	payload: string // Сообщение об ошибке
}

// Объединение всех типов действий для товаров в один тип
export type ItemAction =
	| FetchItemsAction
	| FetchItemsSuccessAction
	| FetchItemsErrorAction
