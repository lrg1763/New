import { FilterAction, IFilter } from '../types'

// Начальное состояние фильтра
const initialState: IFilter = {
	genre: '',
	sort: 'new',
	query: '',
}

// Редуктор для управления состоянием фильтра
export const filterReducer = (state = initialState, action: FilterAction) => {
	switch (action.type) {
		// Действие для установки нового фильтра
		case 'SET_FILTER':
			return action.payload
		// Возвращает текущее состояние по умолчанию
		default:
			return state
	}
}
