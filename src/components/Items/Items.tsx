import { FC, memo } from 'react' // Импортируем FC и memo из библиотеки React
import Item from './Item/Item' // Импортируем компонент Item
import { IAlbum, ILike, IShowModal } from '../../types/types' // Импортируем типы IAlbum, ILike и IShowModal из типов
import styles from './Items.module.scss' // Импортируем стили из файла Items.module.scss
import { useSelector } from 'react-redux' // Импортируем useSelector из библиотеки react-redux
import { RootState } from 'src/store/store' // Импортируем тип RootState из store

// Интерфейс для пропсов компонента Items
interface ItemsProps {
	items: IAlbum[] // Массив альбомов
	likes: IAlbum[] // Массив лайкнутых альбомов
	onLike: ILike // Функция для обработки лайков
	onShowModal: IShowModal // Функция для показа модального окна
}

// Определение компонента Items с использованием функционального компонента и memo для оптимизации
const Items: FC<ItemsProps> = memo(({ items, likes, onLike, onShowModal }) => {
	const orders = useSelector((state: RootState) => state.order.orders) // Получаем заказы из состояния Redux

	return (
		<main>
			{items.length ? ( // Проверяем, есть ли элементы в массиве items
				<div className={styles.list}> {/* Контейнер для списка элементов */}
					{items.map(item => (
						<Item
							key={item.id} // Уникальный ключ для каждого элемента
							item={item} // Объект альбома
							like={likes.some(like => like.id === item.id)} // Проверяем, лайкнут ли элемент
							order={orders.some(order => order.id === item.id)} // Проверяем, добавлен ли элемент в корзину
							onLike={onLike} // Функция для обработки лайков
							onShowModal={onShowModal} // Функция для показа модального окна
						/>
					))}
				</div>
			) : (
				<div className={styles.empty}> {/* Контейнер для пустого состояния */}
					<p className={styles.empty__title}>
						К сожалению, таких товаров не найдено :(
					</p>
					<p className={styles.empty__subtitle}>
						Попробуйте поиск по другому параметру
					</p>
				</div>
			)}
		</main>
	)
})

export default Items // Экспортируем компонент Items по умолчанию
