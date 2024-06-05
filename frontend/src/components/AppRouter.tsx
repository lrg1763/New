import Index from '../pages/Index/Index' // Импортируем компонент Index из папки pages/Index
import { Route, Routes } from 'react-router-dom' // Импортируем компоненты Route и Routes из библиотеки react-router-dom
import { routes } from '../router' // Импортируем массив routes из файла router

// Определение компонента AppRouter
const AppRouter = () => {
	return (
		<Routes>
			{/* Перебираем массив routes и создаем для каждого маршрута компонент Route */}
			{routes.map((route, index) => (
				<Route key={index} path={route.path} element={route.element}></Route>
			))}
			{/* Обрабатываем все неопределенные маршруты и направляем их на компонент Index */}
			<Route path='*' element={<Index />}></Route>
		</Routes>
	)
}

export default AppRouter // Экспортируем компонент AppRouter по умолчанию
