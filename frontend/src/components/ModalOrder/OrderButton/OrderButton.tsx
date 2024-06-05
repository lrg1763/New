import { FC } from 'react' // Импортируем FC из библиотеки React
import { FaPlus, FaMinus } from 'react-icons/fa' // Импортируем иконки FaPlus и FaMinus из библиотеки react-icons/fa
import { IOrder } from '../../../types/types' // Импортируем тип IOrder из типов
import styles from './OrderButton.module.scss' // Импортируем стили из файла OrderButton.module.scss
import { useActions } from 'src/hooks/useAction' // Импортируем useActions из хуков

// Интерфейс для пропсов компонента OrderButton
interface OrderButtonProps {
	item: IOrder // Объект заказа
}

// Определение компонента OrderButton с использованием функционального компонента
const OrderButton: FC<OrderButtonProps> = ({ item }) => {
	const { addToOrder, removeFromOrder } = useActions() // Получаем действия addToOrder и removeFromOrder из хуков

	return (
		<div className={styles.count}> {/* Контейнер для кнопок и количества */}
			<FaMinus
				className={styles.btn_count} // Применяем стили для кнопки уменьшения
				onClick={() => removeFromOrder(item)} // Обработчик клика для удаления из заказа
			/>
			<p>{item.count}</p> {/* Отображаем количество */}
			<FaPlus
				className={styles.btn_count} // Применяем стили для кнопки увеличения
				onClick={() => addToOrder(item)} // Обработчик клика для добавления в заказ
			/>
		</div>
	)
}

export default OrderButton // Экспортируем компонент OrderButton по умолчанию
