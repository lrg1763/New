import { FC, useEffect } from 'react' // Импортируем FC и useEffect из библиотеки React
import { CSSTransition } from 'react-transition-group' // Импортируем CSSTransition для анимаций переходов
import { IoCart, IoClose, IoHeart } from 'react-icons/io5' // Импортируем иконки из библиотеки react-icons/io5
import { IAlbum, ILike } from '../../types/types' // Импортируем типы IAlbum и ILike из типов
import classNames from 'classnames' // Импортируем библиотеку classnames для условного объединения классов
import styles from './Modal.module.scss' // Импортируем стили из файла Modal.module.scss
import { useActions } from 'src/hooks/useAction' // Импортируем useActions из хуков

// Интерфейс для пропсов компонента Modal
interface ModalProps {
	showModal: boolean // Флаг отображения модального окна
	item: IAlbum // Объект альбома
	likes: IAlbum[] // Массив лайкнутых альбомов
	onLike: ILike // Функция для обработки лайков
	onShowModal: (showModal: boolean) => void // Функция для показа модального окна
}

// Определение компонента Modal с использованием функционального компонента
const Modal: FC<ModalProps> = ({
	showModal,
	item,
	likes,
	onLike,
	onShowModal,
}) => {
	const { addToOrder } = useActions() // Получаем действие addToOrder из хуков

	// Используем useEffect для изменения overflow у body в зависимости от состояния модального окна
	useEffect(() => {
		if (!showModal) document.body.style.overflow = 'visible' // Разрешаем прокрутку, если модальное окно закрыто
		else document.body.style.overflow = 'hidden' // Запрещаем прокрутку, если модальное окно открыто
	}, [showModal]) // Зависимость - состояние showModal

	return (
		<CSSTransition
			timeout={500} // Устанавливаем время анимации в 500ms
			in={showModal} // Управляем состоянием видимости CSSTransition
			unmountOnExit // Удаляем элемент из DOM, когда он скрыт
			classNames={{
				enter: styles.item_enter, // Класс для начального состояния анимации входа
				enterActive: styles.item_enter_active, // Класс для активного состояния анимации входа
				exit: styles.item_exit, // Класс для начального состояния анимации выхода
				exitActive: styles.item_exit_active, // Класс для активного состояния анимации выхода
			}}
		>
			<div className={styles.item} onClick={() => onShowModal(false)}> {/* Фон модального окна, закрывающий окно при клике */}
				<div className={styles.content} onClick={e => e.stopPropagation()}> {/* Останавливаем всплытие события клика */}
					<div className={styles.header}> {/* Заголовок модального окна */}
						<img
							src={process.env.PUBLIC_URL + `/img/${item.img}`} // Путь к изображению альбома
							alt='img' // Альтернативный текст для изображения
							className={styles.img} // Применение стилей для изображения
							draggable={false} // Отключение перетаскивания изображения
						/>
						<div className={styles.information}> {/* Контейнер для информации об альбоме */}
							<h2 className={styles.title}>{item.title}</h2> {/* Название альбома */}
							<p className={styles.author}>{item.author}</p> {/* Автор альбома */}
							<p className={styles.genre}>{item.genre}</p> {/* Жанр альбома */}
							<p className={styles.date}>{item.date}</p> {/* Дата выпуска альбома */}
							<div className={styles.price}> {/* Контейнер для цены и кнопок */}
								<p className={styles.cost}>
									{Intl.NumberFormat('de-DE', {
										style: 'currency',
										currency: 'EUR',
									}).format(item.price)} {/* Форматируем цену в валюте EUR */}
								</p>
								<div className={styles.btn_list}> {/* Контейнер для кнопок */}
									<IoHeart
										className={classNames(styles.btn_like, {
											[styles.active]: likes.some(like => like.id === item.id), // Условно добавляем класс active, если альбом лайкнут
										})}
										onClick={() => onLike(item)} // Обработчик клика для лайка
									/>
									<IoCart
										className={styles.btn_cart} // Применение стилей для кнопки корзины
										onClick={() => {
											addToOrder(item) // Добавляем альбом в заказ
											onShowModal(false) // Закрываем модальное окно
										}}
									/>
								</div>
							</div>
						</div>
					</div>
					<p className={styles.desc}>{item.desc}</p> {/* Описание альбома */}
					<div className={styles.tracklist}> {/* Контейнер для списка треков */}
						{item.tracklist.map(track => (
							<div className={styles.track} key={track.id}> {/* Элемент списка треков */}
								<p className={styles.track_id}>{track.id}</p> {/* ID трека */}
								<p className={styles.track_name}>{track.name}</p> {/* Название трека */}
								<div className={styles.track_duration}> {/* Контейнер для длительности трека */}
									<p>{track.duration}</p> {/* Длительность трека */}
								</div>
							</div>
						))}
					</div>
					<IoClose
						className={styles.btn_close} // Применение стилей для кнопки закрытия
						onClick={() => onShowModal(false)} // Обработчик клика для закрытия модального окна
					/>
				</div>
			</div>
		</CSSTransition>
	)
}

export default Modal // Экспортируем компонент Modal по умолчанию
