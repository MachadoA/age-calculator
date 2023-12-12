import arrow from '../images/icon-arrow.svg';
import style from './Button.module.css';
function Button({onClick}) {
  return (
    <section>
        <div className={style.linea} >
            <button className={style.btn} onClick={onClick}>
              <img className={style.img} src={arrow} alt="arrow" />
            </button>
        </div>
    </section>
  )
}

export default Button