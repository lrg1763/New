import { ItemAction, ItemActionTypes, ItemState } from 'src/types/item'

// Начальное состояние для управления элементами (альбомами)
const initialState: ItemState = {
	items: [],
	isLoading: false,
	error: null,
}

// Редуктор для управления состоянием элементов (альбомов)
export const itemReducer = (
	state = initialState,
	actions: ItemAction,
): ItemState => {
	switch (actions.type) {
		// Начало запроса на получение элементов (альбомов)
		case ItemActionTypes.FETCH_ITEMS:
			return { isLoading: true, error: null, items: [] }
		// Успешное получение элементов (альбомов)
		case ItemActionTypes.FETCH_ITEMS_SUCCESS:
			return { isLoading: false, error: null, items: actions.payload }
		// Ошибка при получении элементов (альбомов)
		case ItemActionTypes.FETCH_ITEMS_ERROR:
			return { isLoading: false, error: actions.payload, items: [] }
		// Возвращает текущее состояние по умолчанию
		default:
			return state
	}
}
