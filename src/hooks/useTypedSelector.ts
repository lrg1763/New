import { TypedUseSelectorHook, useSelector } from 'react-redux' // Импортируем хуки TypedUseSelectorHook и useSelector из библиотеки react-redux
import { RootState } from 'src/store/store' // Импортируем тип RootState из файла store

// Создаем типизированный хук useSelector с типом RootState
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
