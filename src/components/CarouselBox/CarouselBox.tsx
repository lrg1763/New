import { FC, memo } from 'react' // Импортируем FC и memo из библиотеки React
import Carousel from 'react-bootstrap/Carousel' // Импортируем компонент Carousel из библиотеки react-bootstrap
import 'bootstrap/dist/css/bootstrap.min.css' // Импортируем стили Bootstrap
import { data } from './data' // Импортируем данные из файла data
import styles from './CarouselBox.module.scss' // Импортируем стили из файла CarouselBox.module.scss

// Определение компонента CarouselBox с использованием функционального компонента и memo для оптимизации
const CarouselBox: FC = memo(() => {
	return (
		<div className={styles.carousel}> {/* Основной контейнер карусели */}
			<Carousel interval={10000} controls={true} indicators={false}> {/* Настройка карусели: интервал 10 секунд, показывать контролы, скрыть индикаторы */}
				{data.map(item => (
					<Carousel.Item key={item.title} className={styles.item}> {/* Элемент карусели с уникальным ключом */}
						<img
							className={styles.img} // Применение стилей для изображения
							src={process.env.PUBLIC_URL + `/img/${item.img}`} // Путь к изображению
							alt={item.title} // Альтернативный текст для изображения
							draggable={false} // Отключение перетаскивания изображения
						/>
						<Carousel.Caption className={styles.caption}> {/* Подпись к изображению */}
							<h3>{item.title}</h3> {/* Заголовок подписи */}
							<p>{item.subtitle}</p> {/* Подзаголовок подписи */}
						</Carousel.Caption>
					</Carousel.Item>
				))}
			</Carousel>
		</div>
	)
})

export default CarouselBox // Экспортируем компонент CarouselBox по умолчанию
