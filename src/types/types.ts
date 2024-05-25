// Интерфейс для представления альбома
export interface IAlbum {
	id: number // Идентификатор альбома
	title: string // Название альбома
	author: string // Автор/исполнитель альбома
	tracklist: ITrack[] // Список треков в альбоме
	img: string // Ссылка на изображение альбома
	desc: string // Описание альбома
	genre: string // Жанр альбома
	date: string // Дата выпуска альбома
	price: number // Цена альбома
}

// Интерфейс для представления трека в альбоме
export interface ITrack {
	id: number // Идентификатор трека
	name: string // Название трека
	duration: string // Продолжительность трека
}

// Интерфейс для представления заказа, наследуется от IAlbum и добавляет поле count
export interface IOrder extends IAlbum {
	count: number // Количество альбомов в заказе
}

// Интерфейс для истории заказов
export interface IOrderHistory {
	id: number // Идентификатор истории заказа
	order: IOrder[] // Список заказанных альбомов
	price: number // Общая стоимость заказа
	date: string // Дата заказа
}

// Интерфейс для показа модального окна с информацией об альбоме
export interface IShowModal {
	(item: IAlbum): void // Метод для показа модального окна, принимает альбом
}

// Интерфейс для показа модального окна с заказом
export interface IShowModalOrder {
	(): void // Метод для показа модального окна с заказом
}

// Интерфейс для добавления/удаления альбома из избранного
export interface ILike {
	(item: IAlbum): void // Метод для добавления/удаления альбома, принимает альбом
}

// Интерфейс для добавления альбома в заказ
export interface IAdd {
	(item: IAlbum): void // Метод для добавления альбома в заказ, принимает альбом
}

// Интерфейс для удаления альбома из заказа
export interface IRemove {
	(item: IOrder): void // Метод для удаления альбома из заказа, принимает заказ
}

// Интерфейс для удаления заказа по его идентификатору
export interface IDelete {
	(id: number): void // Метод для удаления заказа, принимает идентификатор заказа
}

// Интерфейс для оформления заказа
export interface IMakeOrder {
	(order: IOrder[], price: number): void // Метод для оформления заказа, принимает список заказов и их общую стоимость
}

// Интерфейс для очистки заказа
export interface IClearOrder {
	(): void // Метод для очистки заказа
}

// Интерфейс для установки списка избранного
export interface ISetLikes {
	(likes: IAlbum[]): void // Метод для установки списка избранного, принимает массив альбомов
}

// Интерфейс для установки перетаскиваемого элемента
export interface ISetDraggableItem {
	(draggableItem: number): void // Метод для установки перетаскиваемого элемента, принимает его индекс
}

// Интерфейс для контекста заказов
export interface IOrdersContext {
	likes: IAlbum[] // Список избранных альбомов
	likeItem: ILike // Метод для добавления/удаления альбома из избранного
	onShowModal: IShowModal // Метод для показа модального окна с информацией об альбоме
	setLikes: ISetLikes // Метод для установки списка избранного
}

// Интерфейс для представления пользователя
export interface IUser {
	name: string // Имя пользователя
	email: string // Электронная почта пользователя
	password: string // Пароль пользователя
	phone?: string // Номер телефона пользователя (необязательное поле)
	address?: string // Адрес пользователя (необязательное поле)
	index?: string // Почтовый индекс пользователя (необязательное поле)
	img?: string // Ссылка на изображение профиля пользователя (необязательное поле)
}
