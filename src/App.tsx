// Импортируем необходимые модули и компоненты
import { FC, useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Modal from './components/Modal/Modal'
import ModalOrder from './components/ModalOrder/ModalOrder'
import { OrdersContext } from './context/context'
import { IAlbum, IOrdersContext } from './types/types'

// Определение функционального компонента App
const App: FC = () => {
	// Состояние для управления видимостью модального окна заказа
	const [showModalOrder, setShowModalOrder] = useState(false)
	
	// Состояние для управления видимостью общего модального окна
	const [showModal, setShowModal] = useState(false)
	
	// Состояние для хранения информации о выбранном альбоме
	const [fullItem, setFullItem] = useState<IAlbum>({
		id: 0,
		title: '',
		author: '',
		tracklist: [],
		img: '',
		desc: '',
		genre: '',
		date: '',
		price: 0,
	})
	
	// Состояние для хранения списка понравившихся альбомов
	const [likes, setLikes] = useState<IAlbum[]>([])

	// Функция для показа/скрытия модального окна с информацией об альбоме
	const onShowModal = (item: IAlbum) => {
		setFullItem(item)
		setShowModal(!showModal)
	}

	// Функция для показа/скрытия модального окна заказа
	const onShowModalOrder = () => {
		setShowModalOrder(!showModalOrder)
	}

	// Функция для добавления/удаления альбома в список понравившихся
	const likeItem = (item: IAlbum) => {
		let isInArray = false
		likes.forEach(like => {
			if (like.id === item.id) isInArray = true
			setLikes(likes.filter(like => like.id !== item.id))
		})
		if (!isInArray) setLikes([...likes, item])
	}

	// Создаем объект контекста для управления заказами и понравившимися элементами
	const OrdersContextContent: IOrdersContext = {
		likes,
		likeItem,
		onShowModal,
		setLikes,
	}

	return (
		// Предоставляем контекст для всего приложения
		<OrdersContext.Provider value={OrdersContextContent}>
			<Router>
				<div className='wrapper'>
					{/* Компонент Header с функцией для показа модального окна заказа */}
					<Header onShowModalOrder={onShowModalOrder} />
					
					{/* Основной роутер приложения */}
					<AppRouter />
					
					{/* Модальное окно заказа */}
					<ModalOrder
						showModalOrder={showModalOrder}
						onShowModalOrder={onShowModalOrder}
						onShowModal={onShowModal}
					/>
					
					{/* Общее модальное окно с информацией об альбоме */}
					<Modal
						item={fullItem}
						likes={likes}
						showModal={showModal}
						onLike={likeItem}
						onShowModal={setShowModal}
					/>
					
					{/* Компонент Footer */}
					<Footer />
				</div>
			</Router>
		</OrdersContext.Provider>
	)
}

export default App
