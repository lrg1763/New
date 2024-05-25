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
					<h1 className={styles.contact__title}>Контактная информация</h1>
					<div className={styles.contact__grid}>
						{/* Раздел с адресной информацией */}
						<div className={styles.contact__item}>
							<div className={styles.contact__item__title}>Адрес</div>
							<div className={styles.contact__item__text}>
								<span>Наш офис расположен по адресу</span>
								<p>
									Улица Музыкантов, дом 10. Почтовый адрес магазина: 123456, город Музыка, улица
									Музыкантов, дом 10.
								</p>
								<span>Адрес нашего офиса во Франции</span>
								<p>
									10 Rue des Musiciens, 75001 Paris Адрес для почты: 123456, ville de Musique, 10
									Rue des Musiciens, 75001 Paris.
								</p>
								<span>Обратите внимание</span>
								<p>
									Французский офис открыт только для сотрудников и официальных партнеров компании.
									Мы не принимаем посетителей и не проводим экскурсий. Присутствие посторонних на
									территории офиса (вне холла) запрещено.
								</p>
							</div>
						</div>
						{/* Раздел с информацией о контактах через интернет */}
						<div className={styles.contact__item}>
							<div className={styles.contact__item__title}>Через интернет</div>
							<div className={styles.contact__item__text}>
								<span>Служба поддержки</span>
								<p>
									Контактную информацию службы поддержки вы найдете{' '}
									<b className={styles.contact__item__link}>здесь</b>.
								</p>
								<span>Пресса</span>
								<p>
									Контактную информацию для журналистов вы найдете{' '}
									<b className={styles.contact__item__link}>здесь</b>.
								</p>
								<span>Почтовый адрес</span>
								<div className={styles.contact__item__address}>
									<p>MusicStore SAS</p>
									<p>BP 12345</p>
									<p>Ville de Musique</p>
									<p>10 Rue des Musiciens</p>
									<p>75001 Paris</p>
								</div>
							</div>
						</div>
						{/* Раздел с информацией о социальных сетях */}
						<div className={styles.contact__item}>
							<div className={styles.contact__item__title}>Мы в соцсетях:</div>
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
								<div className={styles.contact__item__link_media}>
									<FaTwitter />
									<p>Twitter</p>
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
									defaultState={{ center: [48.85, 2.35], zoom: 9 }} // Координаты центра карты и уровень масштаба
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
