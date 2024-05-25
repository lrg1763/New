import React, { FC, useRef } from 'react' // Импортируем необходимые хуки и FC из библиотеки React
import { IoCloseSharp } from 'react-icons/io5' // Импортируем иконку закрытия из библиотеки react-icons/io5
import styles from './Search.module.scss' // Импортируем стили из файла Search.module.scss

// Интерфейс для пропсов компонента Search
interface SearchProps {
	setFilter: (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.MouseEvent<SVGElement, MouseEvent>
			| undefined,
	) => void // Функция для установки фильтра, принимающая событие изменения или клика
}

// Определение компонента Search с использованием функционального компонента
const Search: FC<SearchProps> = ({ setFilter }) => {
	const ref = useRef<HTMLInputElement>(null) // Создаем реф для доступа к DOM-элементу

	// Обработчик клика по кнопке очистки
	const clickHandler = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
		if (ref.current != null) {
			ref.current.value = '' // Очищаем значение поля ввода
		}
		setFilter(e) // Вызываем функцию установки фильтра
	}

	return (
		<div className={styles.search}>
			<input
				className={styles.input} // Применяем стили для поля ввода
				placeholder='Найти' // Плейсхолдер для поля ввода
				onChange={e => setFilter(e)} // Обработчик изменения поля ввода
				ref={ref} // Привязываем реф к полю ввода
			/>
			<IoCloseSharp className={styles.btn_clear} onClick={clickHandler} /> {/* Иконка кнопки очистки */}
		</div>
	)
}

export default Search // Экспортируем компонент Search по умолчанию
