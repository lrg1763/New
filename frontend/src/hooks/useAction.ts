import { useDispatch } from 'react-redux' // Импортируем хук useDispatch из библиотеки react-redux
import { bindActionCreators } from 'redux' // Импортируем функцию bindActionCreators из библиотеки redux
import ActionCreators from '../store/actions/' // Импортируем все Action Creators из директории actions

// Кастомный хук useActions
export const useActions = () => {
	const dispatch = useDispatch() // Получаем функцию dispatch с помощью useDispatch

	// Связываем Action Creators с функцией dispatch и возвращаем их
	return bindActionCreators(ActionCreators, dispatch)
}
