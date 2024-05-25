import { useState, useEffect, useRef, FC } from 'react' // Импортируем необходимые хуки и типы из React
import classNames from 'classnames' // Импортируем библиотеку classnames для условного объединения классов
import styles from './Tabs.module.scss' // Импортируем стили из файла Tabs.module.scss

// Интерфейс для пропсов компонента Tabs
interface TabsProps {
	tabs: Tab[] // Массив вкладок
	document?: Document | null // Необязательный объект документа
}

// Интерфейс для описания вкладки
interface Tab {
	title: string // Название вкладки
	content: JSX.Element // Содержимое вкладки
	authTab: boolean // Флаг, указывающий, доступна ли вкладка только авторизованным пользователям
}

// Определение компонента Tabs с использованием функционального компонента
const Tabs: FC<TabsProps> = ({ tabs }) => {
	const [activeTab, setActiveTab] = useState(0) // Состояние для управления активной вкладкой
	const ref = useRef<HTMLDivElement>(null) // Создаем реф для содержимого вкладки

	// Эффект для прокрутки содержимого вкладки в начало при смене активной вкладки
	useEffect(() => {
		if (ref.current) {
			ref.current.scrollTo(0, 0) // Прокручиваем содержимое в начало
		}
	}, [activeTab]) // Эффект зависит от изменения activeTab

	return (
		<div className={styles.tabs}>
			<div className={styles.tabs__content} ref={ref}>
				{tabs[activeTab].content} {/* Отображаем содержимое активной вкладки */}
			</div>
			<div className={styles.tabs__header}>
				{tabs.map((tab, index) => (
					<div
						key={index} // Уникальный ключ для каждого элемента
						onClick={() => {
							tab.authTab && setActiveTab(index) // Устанавливаем активную вкладку, если она доступна для авторизованных пользователей
						}}
						className={classNames(
							styles.tabs__btn,
							{ [styles.active]: activeTab === index }, // Добавляем класс active, если вкладка активна
							{ [styles.non_auth]: !tab.authTab }, // Добавляем класс non_auth, если вкладка не доступна для авторизованных пользователей
						)}
					>
						{tab.title} {/* Отображаем название вкладки */}
					</div>
				))}
			</div>
		</div>
	)
}

export default Tabs // Экспортируем компонент Tabs по умолчанию
