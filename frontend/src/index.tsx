// Импортируем ReactDOM для работы с DOM в React
import ReactDOM from 'react-dom/client'

// Импортируем глобальные стили
import './index.scss'

// Импортируем главный компонент приложения
import App from './App'

// Импортируем Provider из react-redux для интеграции Redux с React
import { Provider } from 'react-redux'

// Импортируем хранилище Redux
import { store } from './store/store'

// Создаем корневой элемент для рендеринга React-приложения
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

// Рендерим приложение внутри элемента с id 'root'
// Оборачиваем App в Provider, чтобы предоставить доступ к Redux-хранилищу всем компонентам
root.render(
	<Provider store={store}>
		<App />
	</Provider>,
)
