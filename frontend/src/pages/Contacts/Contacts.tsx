import { useEffect } from 'react' 
import { FaVk, FaTelegram, FaYoutube, FaTwitter, FaOdnoklassniki } from 'react-icons/fa6' 
import { YMaps, Map } from '@pbe/react-yandex-maps' 
import ContactsForm from '../../components/ContactsForm/ContactsForm' 
import { Helmet } from 'react-helmet' 
import styles from './Contacts.module.scss' 

const Contacts = () => {
	useEffect(() => {
		window.scrollTo(0, 0) // Прокрутка страницы наверх при загрузке компонента
	}, [])

	return (
		<>
			<Helmet>
				<meta charSet='utf-8' />
				<meta name='description' content='music store react page contacts' />
				<title>Music Store - Контакты</title> {/* Метаданные для страницы */}
			</Helmet>
			<div className={styles.container}>
				<div className={styles.contact}>
					<h1 className={styles.contact__title}>Информация</h1>
					<div className={styles.contact__grid}>
						{/* Раздел с адресной информацией */}
						<div className={styles.contact__item}>
							<div className={styles.contact__item__title}>Lorem ipsum </div>
							<div className={styles.contact__item__text}>
								<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </span>
								<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 

								</p>
								<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
								<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 

								</p>
								<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </span>
								<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
							</div>
						</div>
						{/* Раздел с информацией о контактах через интернет */}
						<div className={styles.contact__item}>
							<div className={styles.contact__item__title}>Lorem ipsum dolor sit amet</div>
							<div className={styles.contact__item__text}>
								<span>Lorem ipsum dolor sit amet</span>
								<p>
								Lorem ipsum dolor sit amet{' '}
									<b className={styles.contact__item__link}>Lorem ipsum dolor sit amet</b>.
								</p>
								<span>Lorem ipsum dolor sit amet</span>
								<p>
								Lorem ipsum dolor sit amet{' '}
									<b className={styles.contact__item__link}>Lorem </b>.
								</p>
								<span>Lorem ipsum dolor sit amet</span>
								<div className={styles.contact__item__address}>
									<p>Lorem ipsum dolor sit amet</p>
									<p>Lorem ipsum dolor sit amet</p>
									<p>Lorem ipsum dolor sit amet</p>
									<p>Lorem ipsum dolor sit amet</p>
									<p>Lorem ipsum dolor sit amet</p>
								</div>
							</div>
						</div>
						{/* Раздел с информацией о социальных сетях */}
						<div className={styles.contact__item}>
							<div className={styles.contact__item__title}>Lorem ipsum dolor sit amet:</div>
							<div className={styles.contact__item__text}>
								<div className={styles.contact__item__link_media}>
									<FaTelegram />
									<p>Telegram</p>
								</div>
								<div className={styles.contact__item__link_media}>
									<FaVk />
									<p>Vkontakte</p>
								</div>
								<div className={styles.contact__item__link_media}>
									<FaYoutube />
									<p>YouTube</p>
								</div>
							</div>
						</div>
					</div>
					{/* Раздел с картой */}
					<div className={styles.contact__map}>
						<YMaps>
							<div>
								<Map
									className={styles.contact__map__item}
									defaultState={{ center: [55.7558, 37.6176], zoom: 9}} // Координаты центра карты и уровень масштаба
								/>
							</div>
						</YMaps>
					</div>
					<ContactsForm /> {/* Форма для контактов */}
				</div>
			</div>
		</>
	)
}

export default Contacts
