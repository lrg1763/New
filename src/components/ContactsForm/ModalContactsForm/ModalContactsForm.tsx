import { FC, useEffect } from 'react' // Импортируем FC и useEffect из библиотеки React
import { CSSTransition } from 'react-transition-group' // Импортируем CSSTransition для анимаций переходов
import { FaRegSmileWink } from 'react-icons/fa' // Импортируем иконку FaRegSmileWink из библиотеки react-icons
import styles from './ModalContactsForm.module.scss' // Импортируем стили из файла ModalContactsForm.module.scss

// Интерфейс для пропсов компонента ModalContactsForm
interface ModalContactsFormProps {
	showModal: boolean // Состояние видимости модального окна
	onShowModal: (showModal: boolean) => void // Функция для изменения состояния видимости модального окна
	name: string // Имя пользователя, которое будет отображаться в модальном окне
}

// Определение компонента ModalContactsForm с использованием функционального компонента
const ModalContactsForm: FC<ModalContactsFormProps> = ({ showModal, onShowModal, name }) => {
	// Используем useEffect для изменения overflow у body в зависимости от состояния модального окна
	useEffect(() => {
		if (!showModal) document.body.style.overflow = 'visible' // Разрешаем прокрутку, если модальное окно закрыто
		else document.body.style.overflow = 'hidden' // Запрещаем прокрутку, если модальное окно открыто
	}, [showModal]) // Зависимость - состояние showModal

	return (
		<CSSTransition
			timeout={300} // Устанавливаем время анимации в 300ms
			in={showModal} // Управляем состоянием видимости CSSTransition
			unmountOnExit // Удаляем элемент из DOM, когда он скрыт
			classNames={{
				enter: styles.modal_enter, // Класс для начального состояния анимации входа
				enterActive: styles.modal_enter_active, // Класс для активного состояния анимации входа
				exit: styles.modal_exit, // Класс для начального состояния анимации выхода
				exitActive: styles.modal_exit_active, // Класс для активного состояния анимации выхода
			}}
		>
			<div className={styles.modal} onClick={() => onShowModal(false)}> {/* Фон модального окна, закрывающий окно при клике */}
				{showModal && ( // Рендерим содержимое модального окна, только если showModal равно true
					<div className={styles.content} onClick={e => e.stopPropagation()}> {/* Останавливаем всплытие события клика */}
						<div className={styles.header}> {/* Заголовок модального окна */}
							<FaRegSmileWink className={styles.smile} /> {/* Иконка в заголовке */}
						</div>
						<div className={styles.body}> {/* Основная часть модального окна */}
							<p className={styles.text}>Спасибо!</p> {/* Текст благодарности */}
							<p className={styles.text}>{name}, Ваша заявка успешно принята.</p> {/* Сообщение с именем пользователя */}
							<p className={styles.text}>Наш специалист скоро с Вами свяжется!</p> {/* Сообщение о дальнейших действиях */}
						</div>
						<div className={styles.footer}> {/* Подвал модального окна */}
							<button className={styles.button} onClick={() => onShowModal(false)}> {/* Кнопка для закрытия модального окна */}
								Хорошо
							</button>
						</div>
					</div>
				)}
			</div>
		</CSSTransition>
	)
}

export default ModalContactsForm // Экспортируем компонент ModalContactsForm по умолчанию
