import { FC, useState } from 'react' // Импортируем FC и useState из библиотеки React
import styles from './Accordion.module.scss' // Импортируем стили из файла Accordion.module.scss
import classNames from 'classnames' // Импортируем библиотеку classnames для условного объединения классов

// Описание интерфейса пропсов для компонента Accordion
interface AccordionProps {
	header: JSX.Element // Заголовок аккордеона
	content: JSX.Element // Содержимое аккордеона
}

// Определение компонента Accordion с использованием функционального компонента и указанием типов пропсов
const Accordion: FC<AccordionProps> = ({ header, content }) => {
	const [isOpen, setIsOpen] = useState(false) // Создаем состояние isOpen для отслеживания состояния аккордеона (открыт или закрыт)

	// Функция для переключения состояния аккордеона
	const toggleAccordion = () => {
		setIsOpen(!isOpen) // Переключаем значение isOpen на противоположное
	}

	return (
		<div className={styles.accordion}> {/* Основной контейнер аккордеона */}
			<div
				className={classNames(styles.header, { [styles.active]: isOpen })} // Условно добавляем класс active к заголовку, если аккордеон открыт
				onClick={toggleAccordion} // Обработчик клика для переключения аккордеона
			>
				{header} {/* Отображение заголовка */}
				<div className={styles.arrow}></div> {/* Стрелка в заголовке */}
			</div>
			<div className={classNames(styles.content, { [styles.active]: isOpen })}> {/* Условно добавляем класс active к содержимому, если аккордеон открыт */}
				{content} {/* Отображение содержимого */}
			</div>
		</div>
	)
}

export default Accordion // Экспортируем компонент Accordion по умолчанию
