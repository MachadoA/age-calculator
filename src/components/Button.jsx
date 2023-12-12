import arrow from '../images/icon-arrow.svg';
import style from './Button.module.css';
function Button({onClick}) {
  return (
        <div className={style.linea} >
            <button className={style.btn} onClick={onClick}>
              <img className={style.img} src={arrow} alt="arrow" />
            </button>
        </div>
  )
}

export default Button