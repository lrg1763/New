import { IFilter } from '../types'

// Действие для установки фильтра
export const setFilter = (filter: IFilter) => ({
  type: 'SET_FILTER', // Тип действия
  payload: filter, // Данные фильтра
})
