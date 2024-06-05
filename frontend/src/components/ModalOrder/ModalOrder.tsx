import { FC, useEffect, useState } from 'react' // Импортируем необходимые хуки и FC из библиотеки React
import { CSSTransition } from 'react-transition-group' // Импортируем CSSTransition для анимаций переходов
import { IoClose } from 'react-icons/io5' // Импортируем иконку закрытия из библиотеки react-icons/io5
import Order from './Order/Order' // Импортируем компонент Order
import { IShowModalOrder, IShowModal } from '../../types/types' // Импортируем типы IShowModalOrder и IShowModal из типов
import { useSelector } from 'react-redux' // Импортируем useSelector из библиотеки react-redux
import { Link } from 'react-router-dom' // Импортируем Link из библиотеки react-router-dom
import styles from './ModalOrder.module.scss' // Импортируем стили из файла ModalOrder.module.scss
import { RootState } from 'src/store/store' // Импортируем RootState из store
import { useActions } from 'src/hooks/useAction' // Импортируем useActions из хуков

// Интерфейс для пропсов компонента ModalOrder
interface ModalOrderProps {
	showModalOrder: boolean // Флаг отображения модального окна заказа
	onShowModalOrder: IShowModalOrder // Функция для показа модального окна заказа
	onShowModal: IShowModal // Функция для показа модального окна
}

// Определение компонента ModalOrder с использованием функционального компонента
const ModalOrder: FC<ModalOrderProps> = ({
	showModalOrder,
	onShowModalOrder,
	onShowModal,
}) => {
	const [isOpen, setIsOpen] = useState(false) // Состояние для отображения содержимого

	const orders = useSelector((state: RootState) => state.order.orders) // Получаем заказы из состояния Redux
	const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated) // Получаем состояние аутентификации из Redux

	const { loginUser, makeOrder, clearOrder } = useActions() // Получаем действия loginUser, makeOrder и clearOrder из хуков

	const summa = orders.reduce(
		(summa, order) => summa + order.price * order.count, // Считаем сумму заказа
		0,
	)

	useEffect(() => {
		if (!showModalOrder) {
			setIsOpen(false) // Скрываем содержимое
			document.body.style.overflow = 'visible' // Разрешаем прокрутку
		} else {
			document.body.style.overflow = 'hidden' // Запрещаем прокрутку
		}
	}, [showModalOrder]) // Зависимость - состояние showModalOrder

	useEffect(() => {
		const userString = localStorage.getItem('current_user') // Получаем текущего пользователя из localStorage
		if (userString) {
			const user = JSON.parse(userString) // Парсим строку пользователя
			loginUser(user) // Логиним пользователя
		}
	}, []) // Пустая зависимость для выполнения эффекта один раз при монтировании

	return (
		<CSSTransition
			timeout={300} // Время анимации 300ms
			in={showModalOrder} // Управляем состоянием видимости CSSTransition
			unmountOnExit // Удаляем элемент из DOM, когда он скрыт
			classNames={{
				enter: styles.modal_enter, // Класс для начального состояния анимации входа
				enterActive: styles.modal_enter_active, // Класс для активного состояния анимации входа
				exit: styles.modal_exit, // Класс для начального состояния анимации выхода
				exitActive: styles.modal_exit_active, // Класс для активного состояния анимации выхода
			}}
			onEntered={() => setIsOpen(true)} // Устанавливаем isOpen в true, когда анимация завершена
		>
			<div
				className={styles.modal}
				onClick={() => {
					onShowModalOrder() // Закрываем модальное окно при клике на фон
				}}
			>
				<CSSTransition
					in={isOpen} // Управляем состоянием видимости содержимого
					timeout={200} // Время анимации 200ms
					classNames={{
						enter: styles.content_enter, // Класс для начального состояния анимации входа содержимого
						enterActive: styles.content_enter_active, // Класс для активного состояния анимации входа содержимого
						enterDone: styles.content_enter_done, // Класс для завершенного состояния анимации входа содержимого
						exit: styles.content_exit, // Класс для начального состояния анимации выхода содержимого
						exitActive: styles.content_exit_active, // Класс для активного состояния анимации выхода содержимого
					}}
				>
					<div className={styles.content} onClick={e => e.stopPropagation()}>
						{/* Останавливаем всплытие события клика */}
						<div>
							{orders.length ? (
								<div className={styles.container}>
									<div className={styles.header}>
										<p className={styles.summa}>
											Сумма:{' '}
											{Intl.NumberFormat('de-DE', {
												style: 'currency',
												currency: 'EUR',
											}).format(summa)} {/* Форматируем сумму в валюте EUR */}
										</p>
									</div>
									<div className={styles.body}>
										{orders.map(order => (
											<Order
												key={order.id} // Уникальный ключ для каждого заказа
												item={order} // Объект заказа
												onShowModal={onShowModal} // Функция для показа модального окна
											/>
										))}
									</div>
									<div className={styles.footer}>
										{isAuthenticated ? (
											<button
												className={styles.btn}
												onClick={() => {
													makeOrder(orders, summa) // Оформляем заказ
													clearOrder() // Очищаем заказ
												}}
											>
												К оформлению
											</button>
										) : (
											<Link to='/MusicStore-React/profile'>
												<button
													className={styles.btn}
													onClick={() => onShowModalOrder()}
												>
													Авторизоваться
												</button>
											</Link>
										)}
									</div>
								</div>
							) : (
								<div className={styles.empty}>
									<p className={styles.empty__title}>Ой, пусто!</p>
									<p className={styles.empty__text}>
										Ваша корзина пуста, откройте "Меню" и выберите понравившийся
										товар.
									</p>
								</div>
							)}
							<IoClose
								className={styles.btn_close} // Применяем стили для кнопки закрытия
								onClick={() => onShowModalOrder()} // Закрываем модальное окно при клике на кнопку
							/>
						</div>
					</div>
				</CSSTransition>
			</div>
		</CSSTransition>
	)
}

export default ModalOrder // Экспортируем компонент ModalOrder по умолчанию
