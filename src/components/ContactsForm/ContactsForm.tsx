import { FC, useState } from 'react' // Импортируем FC и useState из библиотеки React
import { Formik, Form, Field } from 'formik' // Импортируем компоненты Formik, Form и Field из библиотеки formik
import styles from './ContactsForm.module.scss' // Импортируем стили из файла ContactsForm.module.scss
import classNames from 'classnames' // Импортируем библиотеку classnames для условного объединения классов
import ModalContactsForm from './ModalContactsForm/ModalContactsForm' // Импортируем компонент ModalContactsForm
import { contactFormValidationSchema } from 'src/utils/validation' // Импортируем схему валидации из utils/validation

const ContactsForm: FC = () => {
	const [showModal, setShowModal] = useState(false) // Создаем состояние для отображения модального окна

	return (
		<div className={styles.form}> {/* Основной контейнер формы */}
			<div className={styles.title}>Оставьте свой вопрос, и мы свяжемся с вами!</div> {/* Заголовок формы */}
			<Formik
				initialValues={{
					name: '', // Начальное значение для имени
					email: '', // Начальное значение для email
					request: '', // Начальное значение для вопроса
				}}
				onSubmit={() => {
					setShowModal(true) // Показываем модальное окно при отправке формы
				}}
				validationSchema={contactFormValidationSchema} // Подключаем схему валидации
			>
				{({ errors, touched, values }) => (
					<Form className={styles.wrapper}> {/* Форма с оберткой */}
						<div className={styles.content}> {/* Контейнер для полей формы */}
							<div>
								<div className={styles.error}>{errors.email && touched.email && errors.email}</div> {/* Ошибка для email */}
								<Field
									className={classNames(styles.field, {
										[styles.errorInput]: errors.email && touched.email, // Условно добавляем класс ошибки
									})}
									name='email' // Имя поля email
									placeholder='Ваша электронная почта' // Плейсхолдер для email
									type='email' // Тип поля email
								/>

								<div className={styles.error}>{errors.name && touched.name && errors.name}</div> {/* Ошибка для имени */}
								<Field
									className={classNames(styles.field, {
										[styles.errorInput]: errors.name && touched.name, // Условно добавляем класс ошибки
									})}
									name='name' // Имя поля name
									placeholder='Ваше имя' // Плейсхолдер для имени
								/>
							</div>

							<div>
								<div className={styles.error}>{errors.request && touched.request && errors.request}</div> {/* Ошибка для вопроса */}
								<Field
									className={classNames(styles.textarea, {
										[styles.errorInput]: errors.request && touched.request, // Условно добавляем класс ошибки
									})}
									name='request' // Имя поля request
									placeholder='Ваш вопрос' // Плейсхолдер для вопроса
									as='textarea' // Указываем, что это textarea
								/>
							</div>
						</div>

						<button className={styles.button} type='submit'> {/* Кнопка отправки */}
							Отправить
						</button>
						<ModalContactsForm
							showModal={showModal} // Передаем состояние модального окна
							onShowModal={setShowModal} // Передаем функцию для изменения состояния модального окна
							name={values.name} // Передаем имя пользователя
						/>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default ContactsForm // Экспортируем компонент ContactsForm по умолчанию
