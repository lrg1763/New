import { FC, memo } from 'react' // Импортируем FC и memo из библиотеки React
import { IoCart, IoHeart } from 'react-icons/io5' // Импортируем иконки IoCart и IoHeart из библиотеки react-icons/io5
import { useSelector } from 'react-redux' // Импортируем useSelector из библиотеки react-redux
import { useNavigate } from 'react-router-dom' // Импортируем useNavigate из библиотеки react-router-dom
import { IAlbum, ILike, IShowModal } from '../../../types/types' // Импортируем типы IAlbum, ILike и IShowModal из типов
import cn from 'classnames' // Импортируем библиотеку classnames для условного объединения классов
import styles from './Item.module.scss' // Импортируем стили из файла Item.module.scss
import { useActions } from 'src/hooks/useAction' // Импортируем useActions из хуков

// Интерфейс для пропсов компонента Item
interface ItemProps {
	item: IAlbum // Объект альбома
	like: boolean // Флаг, показывающий, лайкнут ли элемент
	order: boolean // Флаг, показывающий, добавлен ли элемент в корзину
	onLike: ILike // Функция для обработки лайков
	onShowModal: IShowModal // Функция для показа модального окна
}

// Определение компонента Item с использованием функционального компонента и memo для оптимизации
const Item: FC<ItemProps> = memo(
	({ item, like, order, onLike, onShowModal }) => {
		const isAuthenticated = useSelector(
			(state: any) => state.auth.isAuthenticated, // Получаем состояние аутентификации из Redux
		)

		const { addToOrder } = useActions() // Получаем действие addToOrder из хуков

		const navigate = useNavigate() // Используем хук useNavigate для навигации

		return (
			<div className={styles.item}> {/* Контейнер элемента */}
				<img
					className={styles.img} // Применяем стили для изображения
					src={process.env.PUBLIC_URL + `/img/${item.img}`} // Путь к изображению
					alt='img' // Альтернативный текст для изображения
					onClick={() => onShowModal(item)} // Обработчик клика для показа модального окна
					draggable={false} // Отключение перетаскивания изображения
				/>
				<h2
					className={styles.title} // Применяем стили для заголовка
					onClick={() => onShowModal(item)} // Обработчик клика для показа модального окна
					title={item.title} // Заголовок элемента
				>
					{item.title}
				</h2>
				<p className={styles.author}>{item.author}</p> {/* Автор альбома */}
				<div className={styles.price}> {/* Контейнер для цены и кнопок */}
					<p>
						{Intl.NumberFormat('de-DE', {
							style: 'currency',
							currency: 'EUR',
						}).format(item.price)} {/* Форматируем цену в валюте EUR */}
					</p>
					<div className={styles.btn_list}> {/* Контейнер для кнопок */}
						<IoHeart
							className={cn(styles.btn_like, { [styles.active]: like })} // Условно добавляем класс active, если элемент лайкнут
							onClick={() => {
								if (isAuthenticated) {
									onLike(item) // Обработка лайка, если пользователь аутентифицирован
								} else {
									navigate('/MusicStore-React/profile') // Переход на страницу профиля, если пользователь не аутентифицирован
								}
							}}
						/>
						<IoCart
							className={cn(styles.btn_cart, { [styles.active]: order })} // Условно добавляем класс active, если элемент в корзине
							onClick={() => addToOrder(item)} // Обработка добавления в корзину
						/>
					</div>
				</div>
			</div>
		)
	},
)

export default Item // Экспортируем компонент Item по умолчанию
