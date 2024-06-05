import { FC, MouseEvent, useState } from 'react' // Импортируем FC, MouseEvent и useState из библиотеки React
import classNames from 'classnames' // Импортируем библиотеку classnames для условного объединения классов
import styles from './Categories.module.scss' // Импортируем стили из файла Categories.module.scss

// Интерфейс для пропсов компонента Categories
interface CategoriesProps {
	categories: Category[] // Массив категорий
	setCategory: (genre: string) => void // Функция для установки выбранной категории
}

// Интерфейс для отдельной категории
interface Category {
	key: string // Уникальный ключ категории
	name: string // Название категории
}

// Определение компонента Categories с использованием функционального компонента
const Categories: FC<CategoriesProps> = ({ categories, setCategory }) => {
	const [activeCategory, setActiveCategory] = useState<string>(categories[0].key) // Создаем состояние для отслеживания активной категории

	return (
		<div className={styles.categories}> {/* Основной контейнер категорий */}
			{categories.map(category => (
				<div
					className={classNames(styles.category, { // Применяем стили для категории
						[styles.active]: category.key === activeCategory, // Условно добавляем класс active, если категория активна
					})}
					key={category.key} // Устанавливаем уникальный ключ для элемента списка
					onClick={(e: MouseEvent<HTMLElement>) => { // Обработчик клика для элемента категории
						setCategory(category.key) // Устанавливаем выбранную категорию
						setActiveCategory(category.key) // Обновляем состояние активной категории
					}}
				>
					{category.name} {/* Отображение названия категории */}
				</div>
			))}
		</div>
	)
}

export default Categories // Экспортируем компонент Categories по умолчанию
