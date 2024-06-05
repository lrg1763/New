import { FC } from 'react' // Импортируем FC из библиотеки React
import LikeItem from './LikeItem/LikeItem' // Импортируем компонент LikeItem
import {
	IAlbum,
	ISetLikes,
	IShowModal,
	ISetDraggableItem,
	ILike,
} from '../../../types/types' // Импортируем необходимые типы
import styles from './MyLikes.module.scss' // Импортируем стили из файла MyLikes.module.scss
import { useSelector } from 'react-redux' // Импортируем useSelector из библиотеки react-redux
import { RootState } from 'src/store/store' // Импортируем RootState из store

// Интерфейс для пропсов компонента MyLikes
interface MyLikesProps {
	likes: IAlbum[]
	setLikes: ISetLikes
	draggableItem: number
	setDraggableItem: ISetDraggableItem
	likeItem: ILike
	onShowModal: IShowModal
}

// Определение компонента MyLikes с использованием функционального компонента
const MyLikes: FC<MyLikesProps> = ({
	likes,
	setLikes,
	draggableItem,
	setDraggableItem,
	likeItem,
	onShowModal,
}) => {
	const orders = useSelector((state: RootState) => state.order.orders) // Получаем заказы из состояния Redux

	return (
		<div className={styles.items}>
			{likes.length > 0 ? ( // Проверяем, есть ли понравившиеся элементы
				<div className={styles.list}>
					{likes.map((like, index) => (
						<LikeItem
							key={like.id} // Уникальный ключ для каждого элемента
							like={like} // Объект с информацией о понравившемся элементе
							index={index} // Индекс элемента в списке
							likes={likes} // Список всех понравившихся элементов
							setLikes={setLikes} // Функция для обновления списка понравившихся элементов
							draggableItem={draggableItem} // Индекс перетаскиваемого элемента
							setDraggableItem={setDraggableItem} // Функция для установки перетаскиваемого элемента
							onLike={likeItem} // Функция для обработки лайка
							onShowModal={onShowModal} // Функция для показа модального окна
							order={orders.some(order => order.id === like.id)} // Проверяем, находится ли элемент в заказе
						/>
					))}
				</div>
			) : (
				<div className={styles.empty}>Пусто :(</div> // Сообщение о пустом списке
			)}
		</div>
	)
}

export default MyLikes // Экспортируем компонент MyLikes по умолчанию
