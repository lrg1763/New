import { FC } from 'react' // Импортируем FC из библиотеки React
import { ToastContainer, toast } from 'react-toastify' // Импортируем ToastContainer и toast из библиотеки react-toastify
import { Formik, Form, Field } from 'formik' // Импортируем Formik, Form и Field из библиотеки formik
import classNames from 'classnames' // Импортируем библиотеку classnames для условного объединения классов
import styles from './Auth.module.scss' // Импортируем стили из файла Auth.module.scss
import { authValidationSchema } from '../../../utils/validation' // Импортируем схему валидации
import { useActions } from 'src/hooks/useAction' // Импортируем useActions из хуков

// Определение компонента Auth с использованием функционального компонента
const Auth: FC = () => {
	const { loginUser, registerUser } = useActions() // Получаем действия loginUser и registerUser из хуков

	// Функция для обработки отправки формы
	const onSubmit = (values: any) => {
		const value = localStorage.getItem(values.email) // Получаем значение из localStorage по email
		if (values.isLogin) { // Проверяем, является ли это входом
			if (value !== null) {
				const userLS = JSON.parse(value) // Парсим строку пользователя
				if (userLS.password !== values.password) {
					toast.error('Пароли не совпадают!') // Показываем ошибку, если пароли не совпадают
				} else {
					loginUser(userLS) // Логиним пользователя
				}
			} else {
				toast.error('Пользователь не найден!') // Показываем ошибку, если пользователь не найден
			}
		} else { // Если это регистрация
			if (value === null) {
				const newUser = {
					name: '',
					email: values.email,
					password: values.password,
					phone: '',
					address: '',
					index: '',
					photo: '',
				}
				registerUser(newUser) // Регистрируем нового пользователя
			} else {
				toast.error('Пользователь уже зарегистрирован!') // Показываем ошибку, если пользователь уже зарегистрирован
			}
		}
	}

	return (
		<div className={styles.profile}>
			<div className={styles.title}>Авторизация</div>
			<div className={styles.content}>
				<Formik
					initialValues={{
						isLogin: false,
						email: '',
						password: '',
					}}
					onSubmit={onSubmit} // Обработчик отправки формы
					validationSchema={authValidationSchema} // Схема валидации для формы
				>
					{({ errors, touched, setFieldValue }) => (
						<Form>
							<div className={styles.error}>
								{errors.email && touched.email && errors.email} {/* Отображаем ошибку для email */}
							</div>
							<Field
								className={classNames(styles.field, {
									[styles.errorInput]: errors.email && touched.email, // Условное применение класса ошибки
								})}
								name='email'
								placeholder='Ваша электронная почта'
								type='email'
							/>

							<div className={styles.error}>
								{errors.password && touched.password && errors.password} {/* Отображаем ошибку для пароля */}
							</div>
							<Field
								className={classNames(styles.field, {
									[styles.errorInput]: errors.password && touched.password, // Условное применение класса ошибки
								})}
								name='password'
								placeholder='Ваш пароль'
								type='password'
							/>
							<div className={styles.btn_list}>
								<button
									className={styles.btn}
									type='submit'
									onClick={() => {
										setFieldValue('isLogin', true, true) // Устанавливаем значение isLogin в true при нажатии на кнопку "Войти"
									}}
								>
									Войти
								</button>
								<button
									className={styles.btn}
									type='submit'
									onClick={() => {
										setFieldValue('isLogin', false, true) // Устанавливаем значение isLogin в false при нажатии на кнопку "Регистрация"
									}}
								>
									Регистрация
								</button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
			<ToastContainer /> {/* Контейнер для отображения уведомлений */}
		</div>
	)
}

export default Auth // Экспортируем компонент Auth по умолчанию
