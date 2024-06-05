// Импортируем все создатели действий из различных модулей
import * as ItemActionCreators from './itemActions'
import * as filterActionCreators from './filterActions'
import * as authActionCreators from './authActions'
import * as orderActionCreators from './orderActions'

// Объединяем все создатели действий в один объект для экспорта
export default {
  ...ItemActionCreators, // Действия, связанные с элементами
  ...filterActionCreators, // Действия, связанные с фильтрацией
  ...authActionCreators, // Действия, связанные с аутентификацией
  ...orderActionCreators, // Действия, связанные с заказами
}
