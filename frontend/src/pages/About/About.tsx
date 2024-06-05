import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import classNames from 'classnames';
import styles from './About.module.scss';
import CountUp from 'react-countup';
import FeedbackForm from '../../components/FeedbackForm'; // Импортируем компонент FeedbackForm

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <meta name='description' content='music store react page about us' />
        <title>MelodyStore - Отзывы</title>
      </Helmet>
      
      <div className={styles.container}>
        
        <div className={styles.greeting}>
          <h1 className={styles.greeting__text}>
            Мы рады приветствовать вас на нашем сайте!
            <span className={classNames(styles.greeting__text, styles.red)}> MelodyMart</span>
          </h1>
        </div>
        
        {/* Добавляем форму для отзывов */}
        <div className={styles.feedbackForm}>
          <FeedbackForm />
        </div>

      </div>
    </>
  );
};

export default About;
