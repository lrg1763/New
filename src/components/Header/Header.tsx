import { FC, useState } from 'react' // Импортируем FC и useState из библиотеки React
import { NavLink } from 'react-router-dom' // Импортируем NavLink из react-router-dom для навигации
import { FaShoppingCart } from 'react-icons/fa' // Импортируем иконку FaShoppingCart из библиотеки react-icons
import { IShowModalOrder } from '../../types/types' // Импортируем тип IShowModalOrder из типов
import classNames from 'classnames' // Импортируем библиотеку classnames для условного объединения классов
import styles from './Header.module.scss' // Импортируем стили из файла Header.module.scss
import { useSelector } from 'react-redux' // Импортируем useSelector из библиотеки react-redux
import { RootState } from 'src/store/store' // Импортируем тип RootState из store

// Интерфейс для пропсов компонента Header
interface HeaderProps {
	onShowModalOrder: IShowModalOrder // Функция для показа модального окна заказа
}

// Определение компонента Header с использованием функционального компонента
const Header: FC<HeaderProps> = ({ onShowModalOrder }) => {
	const [cartOpen, setCartOpen] = useState(false) // Создаем состояние для отслеживания открытия корзины

	const orders = useSelector((state: RootState) => state.order.orders) // Получаем заказы из состояния Redux

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' }) // Функция для плавного прокручивания страницы вверх
	}

	return (
		<header className={styles.header}> {/* Основной контейнер заголовка */}
			<div className={styles.item}> {/* Элемент заголовка */}
				<div className={styles.container}> {/* Контейнер для логотипа и навигации */}
					<h1 className={styles.logo} onClick={() => scrollToTop()}> {/* Логотип с функцией прокрутки вверх */}
						MelodyMart
					</h1>
					<ul className={styles.nav}> {/* Список навигации */}
						<FaShoppingCart
							onClick={() => {
								setCartOpen(!cartOpen) // Переключение состояния открытия корзины
								onShowModalOrder() // Вызов функции показа модального окна заказа
							}}
							className={classNames(styles.btn_cart, {
								[styles.active]: orders.length, // Условно добавляем класс active, если есть заказы
							})}
						/>
						<li>
							<NavLink
								to='/MusicStore-React/'
								className={({ isActive }) =>
									isActive
										? classNames(styles.link, styles.active)
										: styles.link
								}
							>
								Главная
							</NavLink>
						</li>
						<li>
							<NavLink
								to='/MusicStore-React/about'
								className={({ isActive }) =>
									isActive
										? classNames(styles.link, styles.active)
										: styles.link
								}
							>
								О нас
							</NavLink>
						</li>
						<li>
							<NavLink
								to='/MusicStore-React/contacts'
								className={({ isActive }) =>
									isActive
										? classNames(styles.link, styles.active)
										: styles.link
								}
							>
								Контакты
							</NavLink>
						</li>
						<li>
							<NavLink
								to='/MusicStore-React/profile'
								className={({ isActive }) =>
									isActive
										? classNames(styles.link, styles.active)
										: styles.link
								}
							>
								Аккаунт
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</header>
	)
}

export default Header // Экспортируем компонент Header по умолчанию
