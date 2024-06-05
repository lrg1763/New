import { useMemo, useEffect, useState } from 'react' // Импортируем хуки useMemo, useEffect и useState из библиотеки React
import { IAlbum } from './../types/types' // Импортируем интерфейс IAlbum
import useDebounce from './useDebounce' // Импортируем кастомный хук useDebounce
import { IFilter } from 'src/store/types' // Импортируем интерфейс IFilter

// Функция для фильтрации элементов по запросу и жанру
const filterItems = (items: IAlbum[], query: string, genre: string) => {
	let result = items

	if (query) {
		result = result.filter(
			item =>
				item.title.toLowerCase().includes(query.toLowerCase()) || // Фильтруем по названию
				item.author.toLowerCase().includes(query.toLowerCase()), // Фильтруем по автору
		)
	}

	if (genre) {
		result = result.filter(item => item.genre === genre) // Фильтруем по жанру
	}

	return result
}

// Функция для сортировки элементов по дате
const sortItems = (items: IAlbum[], sort: string) => {
	if (sort) {
		return [...items].sort((a, b) => {
			const [aDay, aMonth, aYear] = a.date.split('.')
			const [bDay, bMonth, bYear] = b.date.split('.')
			if (sort === 'new') {
				return (
					new Date(`${bMonth}/${bDay}/${bYear}`).getTime() - // Сортируем по новизне
					new Date(`${aMonth}/${aDay}/${aYear}`).getTime()
				)
			} else {
				return (
					new Date(`${aMonth}/${aDay}/${aYear}`).getTime() - // Сортируем по старости
					new Date(`${bMonth}/${bDay}/${bYear}`).getTime()
				)
			}
		})
	}

	return items
}

// Кастомный хук useItems для фильтрации и сортировки элементов
export const useItems = (items: IAlbum[], filter: IFilter) => {
	const { sort, query, genre } = filter // Деструктурируем фильтры

	const debouncedQuery = useDebounce(query, 500) // Делаем дебаунс запроса

	const [filteredItems, setFilteredItems] = useState(items) // Создаем состояние для фильтрованных элементов

	useEffect(() => {
		let result = items

		if (debouncedQuery || genre) {
			result = filterItems(items, debouncedQuery, genre) // Фильтруем элементы по запросу и жанру
		}

		setFilteredItems(result) // Обновляем состояние фильтрованных элементов
	}, [debouncedQuery, items, genre]) // Эффект срабатывает при изменении запроса, элементов или жанра

	const sortedItems = useMemo(
		() => sortItems(filteredItems, sort), // Сортируем фильтрованные элементы
		[filteredItems, sort], // Мемоизация при изменении фильтрованных элементов или сортировки
	)

	return sortedItems // Возвращаем отсортированные элементы
}
