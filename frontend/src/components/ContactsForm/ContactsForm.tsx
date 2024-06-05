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
			<div className={styles.title}></div> {/* Заголовок формы */}
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
				
			</Formik>
		</div>
	)
}

export default ContactsForm // Экспортируем компонент ContactsForm по умолчанию
