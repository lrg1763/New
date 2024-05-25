import { useState, useRef, FC } from 'react' // Импортируем необходимые хуки и FC из библиотеки React
import { CSSTransition } from 'react-transition-group' // Импортируем CSSTransition для анимаций переходов
import { FaTrash } from 'react-icons/fa' // Импортируем иконку корзины из библиотеки react-icons/fa
import OrderButton from '../OrderButton/OrderButton' // Импортируем компонент OrderButton
import { IOrder, IShowModal } from './../../../types/types' // Импортируем типы IOrder и IShowModal из типов
import styles from './Order.module.scss' // Импортируем стили из файла Order.module.scss
import { useActions } from 'src/hooks/useAction' // Импортируем useActions из хуков

// Интерфейс для пропсов компонента Order
interface OrderProps {
	item: IOrder // Объект заказа
	onShowModal: IShowModal // Функция для показа модального окна
}

// Определение компонента Order с использованием функционального компонента
const Order: FC<OrderProps> = ({ item, onShowModal }) => {
	const [show, setShow] = useState(true) // Создаем состояние для отображения элемента

	const myRef = useRef(null) // Создаем реф для доступа к DOM-элементу

	const { deleteOrder } = useActions() // Получаем действие deleteOrder из хуков

	return (
		<CSSTransition
			in={show} // Состояние отображения элемента
			timeout={300} // Время анимации 300ms
			classNames={{
				enter: styles.item_enter, // Класс для начального состояния анимации входа
				enterActive: styles.item_enter_active, // Класс для активного состояния анимации входа
				enterDone: styles.item_enter_done, // Класс для завершенного состояния анимации входа
				exit: styles.item_exit, // Класс для начального состояния анимации выхода
				exitActive: styles.item_exit_active, // Класс для активного состояния анимации выхода
			}}
			nodeRef={myRef} // Реф для анимации переходов
		>
			<div className={styles.item} ref={myRef}>
				<img
					className={styles.img} // Применяем стили для изображения
					src={process.env.PUBLIC_URL + `/img/${item.img}`} // Путь к изображению
					alt='img' // Альтернативный текст для изображения
					onClick={() => onShowModal(item)} // Обработчик клика для показа модального окна
					draggable={false} // Отключение перетаскивания изображения
				/>
				<div className={styles.body}>
					<p
						className={styles.title} // Применяем стили для заголовка
						title={item.title} // Заголовок элемента
						onClick={() => onShowModal(item)} // Обработчик клика для показа модального окна
					>
						{item.title}
					</p>
					<p className={styles.author}>{item.author}</p> {/* Автор заказа */}
					<p className={styles.price}>
						{Intl.NumberFormat('de-DE', {
							style: 'currency',
							currency: 'EUR',
						}).format(item.price)} {/* Форматируем цену в валюте EUR */}
					</p>
					<FaTrash
						className={styles.btn_delete} // Применяем стили для кнопки удаления
						onClick={() => {
							setShow(false) // Скрываем элемент
							setTimeout(() => {
								deleteOrder(item.id) // Удаляем заказ после анимации
							}, 300) // Таймаут для завершения анимации
						}}
					/>
					<OrderButton item={item} /> {/* Компонент для заказа */}
				</div>
			</div>
		</CSSTransition>
	)
}

export default Order // Экспортируем компонент Order по умолчанию
