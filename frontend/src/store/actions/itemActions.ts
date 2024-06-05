import axios from 'axios'
import { Dispatch } from 'redux'
import { ItemAction, ItemActionTypes } from '../../types/item'

// Функция для загрузки элементов с использованием axios и redux-thunk
export const fetchItems = (page = 1, limit = 0): any => {
  return async (dispatch: Dispatch<ItemAction>) => {
    try {
      // Отправляем действие для начала загрузки элементов
      dispatch({ type: ItemActionTypes.FETCH_ITEMS })
      
      // Формируем параметры запроса
      const params = limit ? { page, limit } : { page }
      
      // Выполняем запрос к API
      const response = await axios.get('https://64c9ec74b2980cec85c28b5f.mockapi.io/music', {
        params,
      })
      
      // Отправляем действие при успешной загрузке элементов
      dispatch({
        type: ItemActionTypes.FETCH_ITEMS_SUCCESS,
        payload: response.data,
      })
    } catch (e) {
      // Отправляем действие при ошибке загрузки элементов
      dispatch({
        type: ItemActionTypes.FETCH_ITEMS_ERROR,
        payload: 'Произошла ошибка при загрузке альбомов',
      })
    }
  }
}
