import React, { FC, useState, useRef } from 'react' // Импортируем необходимые хуки и FC из библиотеки React
import { CSSTransition } from 'react-transition-group' // Импортируем CSSTransition для анимаций переходов
import { IoCart, IoHeart } from 'react-icons/io5' // Импортируем иконки из библиотеки react-icons/io5
import {
	IAlbum,
	ILike,
	IShowModal,
	ISetLikes,
	ISetDraggableItem,
} from '../../../../types/types' // Импортируем типы
import cn from 'classnames' // Импортируем библиотеку classnames для условного объединения классов
import styles from './LikeItem.module.scss' // Импортируем стили из файла LikeItem.module.scss
import { useActions } from 'src/hooks/useAction' // Импортируем useActions из хуков

// Интерфейс для пропсов компонента LikeItem
interface LikeItemProps {
	index: number
	like: IAlbum
	likes: IAlbum[]
	draggableItem: number
	onLike: ILike
	onShowModal: IShowModal
	setLikes: ISetLikes
	setDraggableItem: ISetDraggableItem
	order: boolean
}

// Определение компонента LikeItem с использованием функционального компонента
const LikeItem: FC<LikeItemProps> = ({
	index,
	like,
	likes,
	draggableItem,
	onLike,
	onShowModal,
	setLikes,
	setDraggableItem,
	order,
}) => {
	const [show, setShow] = useState(true) // Состояние для отображения элемента
	const myRef = useRef<HTMLDivElement>(null) // Создаем реф для доступа к DOM-элементу

	const { addToOrder } = useActions() // Получаем действие addToOrder из хуков

	// Обработчик события drag over
	const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		if (myRef.current) myRef.current.style.boxShadow = '0 4px 3px gray'
	}

	// Обработчик события drag leave
	const dragLeaveHandler = () => {
		if (myRef.current) myRef.current.style.boxShadow = 'none'
	}

	// Обработчик события drag start
	const dragStartHandler = (index: number) => {
		setDraggableItem(index)
	}

	// Обработчик события drag end
	const dragEndHandler = () => {
		if (myRef.current) myRef.current.style.boxShadow = 'none'
	}

	// Обработчик события drop
	const dropHandler = (e: React.DragEvent<HTMLDivElement>, index: number) => {
		e.preventDefault()

		if (myRef.current) {
			myRef.current.style.boxShadow = 'none'
			const draggedItem = likes[draggableItem]
			const remainingItems = likes.filter((_item, i) => i !== draggableItem)
			const updatedItems = [
				...remainingItems.slice(0, index),
				draggedItem,
				...remainingItems.slice(index),
			]
			setLikes(updatedItems)
		}
	}

	return (
		<CSSTransition
			in={show}
			timeout={300}
			classNames={{
				enter: styles.item_enter, // Класс для начального состояния анимации входа
				enterActive: styles.item_enter_active, // Класс для активного состояния анимации входа
				enterDone: styles.item_enter_done, // Класс для завершенного состояния анимации входа
				exit: styles.item_exit, // Класс для начального состояния анимации выхода
				exitActive: styles.item_exit_active, // Класс для активного состояния анимации выхода
			}}
			nodeRef={myRef}
		>
			<div
				className={styles.item}
				ref={myRef}
				draggable={true}
				onDragOver={e => dragOverHandler(e)}
				onDragStart={() => dragStartHandler(index)}
				onDragLeave={dragLeaveHandler}
				onDragEnd={dragEndHandler}
				onDrop={e => dropHandler(e, index)}
			>
				<div>
					<img
						className={styles.img} // Применяем стили для изображения
						src={process.env.PUBLIC_URL + `/img/${like.img}`} // Путь к изображению
						alt='img' // Альтернативный текст для изображения
						onClick={() => onShowModal(like)} // Обработчик клика для показа модального окна
						draggable={false} // Отключение перетаскивания изображения
					/>
				</div>
				<div className={styles.content}>
					<h2 className={styles.title} onClick={() => onShowModal(like)}>
						{like.title}
					</h2>
					<p className={styles.author}>{like.author}</p>
					<div className={styles.price}>
						<p>
							{Intl.NumberFormat('de-DE', {
								style: 'currency',
								currency: 'EUR',
							}).format(like.price)} {/* Форматируем цену в валюте EUR */}
						</p>
						<div className={styles.btn_list}>
							<IoHeart
								className={cn(styles.btn_like, { [styles.active]: like })} // Условное применение класса активности для кнопки лайка
								onClick={() => {
									setShow(false) // Скрываем элемент
									setTimeout(() => {
										onLike(like) // Лайкаем элемент после анимации
									}, 310) // Таймаут для завершения анимации
								}}
							/>
							<IoCart
								className={cn(styles.btn_cart, { [styles.active]: order })} // Условное применение класса активности для кнопки добавления в корзину
								onClick={() => addToOrder(like)} // Добавляем элемент в заказ
							/>
						</div>
					</div>
				</div>
			</div>
		</CSSTransition>
	)
}

export default LikeItem // Экспортируем компонент LikeItem по умолчанию
