import { useEffect } from 'react' // Импортируем хук useEffect из React
import { Helmet } from 'react-helmet' // Импортируем компонент Helmet для управления мета-данными
import classNames from 'classnames' // Импортируем библиотеку classNames для условного применения классов
import styles from './About.module.scss' // Импортируем стили из модуля About.module.scss
import CountUp from 'react-countup' // Импортируем компонент CountUp для анимации числовых значений

// Компонент About
const About = () => {
  // Используем хук useEffect для прокрутки страницы вверх при монтировании компонента
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      {/* Управляем мета-данными страницы с помощью Helmet */}
      <Helmet>
        <meta charSet='utf-8' />
        <meta name='description' content='music store react page about us' />
        <title>MelodyMart - О нас</title>
      </Helmet>
      
      {/* Основной контейнер страницы */}
      <div className={styles.container}>
        
        {/* Блок приветствия */}
        <div className={styles.greeting}>
          <h1 className={styles.greeting__text}>
            Рады приветствовать вас на сайте
            <span className={classNames(styles.greeting__text, styles.red)}> MelodyMart</span>
          </h1>
        </div>
        
        {/* Блок описания */}
        <div className={styles.description}>
          <p className={styles.description__text}>
            Добро пожаловать в наш интернет-магазин музыки! Мы - команда энтузиастов, которые любят
            и ценят качественную музыку. Наша история началась много лет назад, когда мы решили
            создать место, где любители музыки могут находить и покупать самые разные жанры и
            исполнителей.
          </p>
          
          {/* Информационный блок с анимацией чисел */}
          <div className={styles.information}>
            <div className={styles.information__item}>
              <div className={styles.information__title}>
                <CountUp start={0} end={6666666} duration={3} />
              </div>
              <div className={styles.information__text}>оформленных заказов за все время!</div>
            </div>
            <div className={styles.information__item}>
              <div className={styles.information__title}>
                <CountUp start={0} end={666666} duration={3} />
              </div>
              <div className={styles.information__text}>довольных клиентов по всему миру!</div>
            </div>
            <div className={styles.information__item}>
              <div className={styles.information__title}>
                <CountUp start={0} end={666666} duration={3} />
              </div>
              <div className={styles.information__text}>исполнителей сотрудничают с нами!</div>
            </div>
          </div>
          
          {/* Продолжение блока описания */}
          <p className={styles.description__text}>
            За все эти годы мы добились многих достижений и стали одним из самых популярных
            интернет-магазинов музыки. Наша коллекция включает в себя тысячи альбомов, сотни жанров
            и исполнителей со всего мира. Мы предлагаем только качественную музыку, которую мы сами
            слушаем и любим.
          </p>
          <p className={styles.description__text}>
            Мы гордимся тем, что можем предложить нашим клиентам не только широкий выбор музыки, но
            и отличный сервис. Мы всегда готовы помочь нашим клиентам с выбором альбома, ответить на
            вопросы и предоставить подробную информацию о продукте.
          </p>
          
          {/* Блок команды */}
          <div className={styles.team}>
            <div className={styles.team__item}>
              {/* Здесь можно добавить информацию о членах команды */}
            </div>
          </div>
          
          <p className={styles.description__text}>
            Наша команда состоит из профессионалов своего дела, которые постоянно совершенствуются и
            следят за новинками в музыкальной индустрии. Мы уверены, что наш интернет-магазин музыки
            - это место, где каждый найдет что-то для себя. Мы ценим каждого нашего клиента и
            стремимся предоставить только лучший сервис и продукт.
          </p>
          <p className={styles.description__text}>
            Благодарим вас за выбор нашего интернет-магазина музыки и надеемся, что вы останетесь
            довольны нашими услугами.
          </p>
        </div>
      </div>
    </>
  )
}

export default About // Экспортируем компонент About по умолчанию
