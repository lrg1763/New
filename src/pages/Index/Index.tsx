import React, { FC, useEffect, useContext } from 'react'
import { OrdersContext } from '../../context/context'
import Categories from '../../components/Categories/Categories'
import Items from '../../components/Items/Items'
import Search from './../../components/Search/Search'
import CarouselBox from '../../components/CarouselBox/CarouselBox'
import { useItems } from '../../hooks/useItems'
import Loader from '../../components/Loader/Loader'
import { IOrdersContext } from '../../types/types'
import { Helmet } from 'react-helmet'
import styles from './Index.module.scss'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store/store'
import { useTypedSelector } from 'src/hooks/useTypedSelector'
import { useActions } from 'src/hooks/useAction'

const Index: FC = () => {
	// Получаем данные из контекста заказов
	const { likes, likeItem, onShowModal } = useContext(OrdersContext) as IOrdersContext

	// Получаем состояние элементов из Redux store
	const { items, error, isLoading } = useTypedSelector(state => state.items)

	// Получаем действия для управления состоянием
	const { fetchItems, setFilter } = useActions()

	// Загружаем элементы при монтировании компонента
	useEffect(() => {
		fetchItems()
	}, [])

	// Получаем состояние фильтра из Redux store
	const filter = useSelector((state: RootState) => state.filter)

	// Применяем фильтрацию и сортировку к элементам
	const sortedAndSearchedItems = useItems(items, filter)

	// Определяем категории жанров
	const genres = [
		{ key: '', name: 'All' },
		{ key: 'alternative rock', name: 'Rock' },
		{ key: 'industrial metal', name: 'Industrial metal' },
		{ key: 'alternative rap', name: 'Rap' },
		{ key: 'hip hop', name: 'Indie' },
	]

	// Определяем параметры сортировки
	const sorts = [
		{ key: 'new', name: 'New' },
		{ key: 'old', name: 'Old' },
	]

	// Обработчик изменения запроса поиска
	const handleQueryChange = (
		e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<SVGElement, MouseEvent> | undefined,
	) => {
		const input = e?.target as HTMLInputElement
		if (!input.value) input.value = ''
		const newFilter = { ...filter, query: input.value }
		setFilter(newFilter)
	}

	// Обработчик изменения жанра
	const handleGenreChange = (genre: string) => {
		const newFilter = { ...filter, genre: genre }
		setFilter(newFilter)
	}

	// Обработчик изменения сортировки
	const handleSortChange = (sort: string) => {
		const newFilter = { ...filter, sort: sort }
		setFilter(newFilter)
	}

	return (
		<>
			<Helmet>
				<meta charSet='utf-8' />
				<meta name='description' content='music store react main page' />
				<title>MelodyMart - Главная страница</title>
			</Helmet>
			<CarouselBox />
			<div className={styles.container}>
				<Categories categories={sorts} setCategory={handleSortChange} />
				<Categories categories={genres} setCategory={handleGenreChange} />
				<Search setFilter={handleQueryChange} />
				{isLoading ? (
					<div className={styles.empty}>
						<Loader />
					</div>
				) : error ? (
					<div className={styles.empty}>
						<p className={styles.empty__title}>Произошла ошибка:</p>
						<p className={styles.empty__error}>{error}</p>
					</div>
				) : (
					<Items
						items={sortedAndSearchedItems}
						likes={likes}
						onLike={likeItem}
						onShowModal={onShowModal}
					/>
				)}
			</div>
		</>
	)
}

export default Index
