// Декларация модуля для файлов с расширением .jpg
declare module '*.jpg' {
	// Экспорт значения типа any для использования этих файлов в коде
	const value: any
	export default value
}

// Декларация модуля для файлов с расширением .png
declare module '*.png' {
	// Экспорт значения типа any для использования этих файлов в коде
	const value: any
	export default value
}

// Декларация модуля для файлов с расширением .scss
declare module '*.scss' {
	// Экспорт содержимого типа Record<string, string> для использования этих файлов в коде
	const content: Record<string, string>
	export default content
}

// Декларация модуля для файлов с расширением .module.scss
declare module '*.module.scss'

// // Декларация модуля для файлов с расширением .scss (закомментирована)
// declare module '*.scss'
