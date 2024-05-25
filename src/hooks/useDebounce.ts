import { useState, useEffect } from 'react' // Импортируем хуки useState и useEffect из библиотеки React

// Кастомный хук useDebounce
export default function useDebounce(value: string, delay: number) {
	const [debouncedValue, setDebouncedValue] = useState(value) // Создаем состояние для хранения дебаунс-значения

	useEffect(() => {
		// Устанавливаем таймер, который обновит debouncedValue через заданное время задержки (delay)
		const handler = setTimeout(() => {
			setDebouncedValue(value)
		}, delay)

		// Очищаем таймер при изменении значения или перед размонтированием компонента
		return () => {
			clearTimeout(handler)
		}
	}, [value, delay]) // Зависимости эффекта - значение и задержка

	return debouncedValue // Возвращаем дебаунс-значение
}
