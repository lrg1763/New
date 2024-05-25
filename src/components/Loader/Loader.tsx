import styles from './Loader.module.scss' // Импортируем стили из файла Loader.module.scss

const Loader = () => {
	return (
		<div className={styles.container}> {/* Контейнер для загрузчика */}
			<div className={styles.loader}></div> {/* Загрузчик */}
			<p className={styles.loader__text}>Загрузка</p> {/* Текст загрузки */}
		</div>
	)
}

export default Loader // Экспортируем компонент Loader по умолчанию
