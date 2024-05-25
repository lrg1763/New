import { FC } from 'react' // Импортируем FC из библиотеки React
import Accordion from '../../Accordion/Accordion' // Импортируем компонент Accordion
import { IShowModal } from '../../../types/types' // Импортируем тип IShowModal
import styles from './MyOrders.module.scss' // Импортируем стили из файла MyOrders.module.scss
import { RootState } from 'src/store/store' // Импортируем RootState из store
import { useSelector } from 'react-redux' // Импортируем useSelector из библиотеки react-redux

// Интерфейс для пропсов компонента MyOrders
interface MyOrdersProps {
	onShowModal: IShowModal
}

// Определение компонента MyOrders с использованием функционального компонента
const MyOrders: FC<MyOrdersProps> = ({ onShowModal }) => {
	const ordersHistory = useSelector(
		(state: RootState) => state.order.ordersHistory, // Получаем историю заказов из состояния Redux
	)

	return (
		<div className={styles.history}>
			{ordersHistory.length > 0 ? ( // Проверяем, есть ли заказы в истории
				ordersHistory.map(order => (
					<div key={order.date}> {/* Используем дату в качестве ключа */}
						<Accordion
							header={
								<div className={styles.history__header}>
									<div className={styles.history__order}>
										Заказ №<b>{order.id}</b> от <b>{order.date}</b>.{' '}
									</div>
									<div className={styles.history__payment}>
										К оплате:
										<b>{` ${Intl.NumberFormat('de-DE', {
											style: 'currency',
											currency: 'EUR',
										}).format(order.price)}`}</b>
									</div>
								</div>
							}
							content={
								<div className={styles.list}>
									{order.order.map(item => (
										<div key={item.id} className={styles.item}>
											<div>
												<img
													className={styles.img} // Применяем стили для изображения
													src={process.env.PUBLIC_URL + `/img/${item.img}`} // Путь к изображению
													alt='img' // Альтернативный текст для изображения
													onClick={() => onShowModal(item)} // Обработчик клика для показа модального окна
													draggable={false} // Отключение перетаскивания изображения
												/>
											</div>
											<div className={styles.content}>
												<h2
													className={styles.title}
													onClick={() => onShowModal(item)}
												>
													{item.title}
												</h2>
												<p className={styles.author}>{item.author}</p>
												<div className={styles.price}>
													<p>
														{`${Intl.NumberFormat('de-DE', {
															style: 'currency',
															currency: 'EUR',
															currencyDisplay: 'symbol',
														}).format(item.price)} x ${item.count}`}
													</p>
												</div>
											</div>
										</div>
									))}
								</div>
							}
						/>
					</div>
				))
			) : (
				<div className={styles.empty}>Пусто :(</div> // Сообщение о пустой истории заказов
			)}
		</div>
	)
}

export default MyOrders // Экспортируем компонент MyOrders по умолчанию
