import { FC } from 'react' // Импортируем FC из библиотеки React
import { Field } from 'formik' // Импортируем Field из библиотеки Formik
import classNames from 'classnames' // Импортируем библиотеку classnames для условного объединения классов
import styles from './ProfileField.module.scss' // Импортируем стили из файла ProfileField.module.scss

// Интерфейс для пропсов компонента ProfileField
interface ProfileFieldProps {
	label: string // Метка для поля ввода
	name: string // Имя поля ввода
	value: string | number // Значение поля ввода
	type: string // Тип поля ввода (например, "text" или "number")
	isEdit: boolean // Флаг, указывающий, можно ли редактировать поле
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void // Функция для обработки изменений в поле
	error?: string // Ошибка валидации (опционально)
	touched?: boolean // Флаг, указывающий, было ли поле тронуто (опционально)
}

// Определение компонента ProfileField с использованием функционального компонента
const ProfileField: FC<ProfileFieldProps> = ({
	label,
	name,
	value,
	type,
	isEdit,
	onChange,
	error,
	touched,
}) => {
	return (
		<div>
			<div
				className={classNames(styles.profile__label, {
					[styles.error]: error && touched, // Применяем класс ошибки, если есть ошибка и поле было тронуто
				})}
			>
				{error && touched ? error : label} {/* Показываем ошибку, если есть ошибка и поле было тронуто, иначе показываем метку */}
			</div>
			<Field
				className={classNames(styles.profile__input, { [styles.active]: isEdit })} // Применяем класс активности, если поле можно редактировать
				name={name} // Имя поля
				value={value} // Значение поля
				placeholder={`${label}...`} // Плейсхолдер для поля
				type={type} // Тип поля
				onChange={onChange} // Обработчик изменений в поле
				disabled={!isEdit} // Отключаем поле, если его нельзя редактировать
			/>
		</div>
	)
}

export default ProfileField // Экспортируем компонент ProfileField по умолчанию
