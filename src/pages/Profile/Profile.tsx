import { FC, useState, useContext, useEffect } from 'react'
import Tabs from '../../components/Tabs/Tabs'
import { OrdersContext } from '../../context/context'
import { IOrdersContext } from '../../types/types'
import MyProfile from '../../components/Tabs/MyProfile/MyProfile'
import MyLikes from '../../components/Tabs/MyLikes/MyLikes'
import MyOrders from '../../components/Tabs/MyOrders/MyOrders'
import { useSelector } from 'react-redux'
import Auth from '../../components/Tabs/Auth/Auth'
import { Helmet } from 'react-helmet'
import 'react-toastify/dist/ReactToastify.css'
import styles from './Profile.module.scss'
import { RootState } from 'src/store/store'
import { useActions } from 'src/hooks/useAction'

const Profile: FC = () => {
  // Доступ к контексту заказов
  const { likes, likeItem, onShowModal, setLikes } = useContext(
    OrdersContext,
  ) as IOrdersContext
  
  // Состояние для перетаскиваемого элемента
  const [draggableItem, setDraggableItem] = useState<number>(0)

  // Скроллим страницу наверх при загрузке компонента
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Проверка аутентификации пользователя из Redux store
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  )

  const { loginUser } = useActions()

  // Попытка автоматического логина пользователя из localStorage
  useEffect(() => {
    const userString = localStorage.getItem('current_user')
    if (userString) {
      const user = JSON.parse(userString)
      loginUser(user)
    }
  }, [])

  // Массив вкладок для отображения в компоненте Tabs
  const tabs = [
    {
      title: 'Мои данные',
      content: isAuthenticated ? <MyProfile /> : <Auth />,
      authTab: isAuthenticated,
    },
    {
      title: 'Мои отложенные',
      content: (
        <MyLikes
          likes={likes}
          likeItem={likeItem}
          setLikes={setLikes}
          draggableItem={draggableItem}
          setDraggableItem={setDraggableItem}
          onShowModal={onShowModal}
        />
      ),
      authTab: isAuthenticated,
    },
    {
      title: 'Мои заказы',
      content: <MyOrders onShowModal={onShowModal} />,
      authTab: isAuthenticated,
    },
  ]

  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <meta name='description' content='music store react cabinet' />
        <title>Music Store - Личный кабинет</title>
      </Helmet>
      <div className={styles.container}>
        <div className={styles.profile}>
          <h1 className={styles.profile__title}>Личный кабинет</h1>
          <Tabs tabs={tabs} />
        </div>
      </div>
    </>
  )
}

export default Profile
