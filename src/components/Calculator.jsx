import { useState} from 'react'
import Button from './Button'
import style from './Calculator.module.css'
import Counter from './Counter';

export default function Calculator() {
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [dayError, setDayError] = useState(false);
    const [monthError, setMonthError] = useState(false);
    const [yearError, setYearError] = useState(false);
    const [resultYear, setResultYear] = useState('');
    const [resultMonth, setResultMonth] = useState('');
    const [resultDays, setResultDays] = useState('');

    const currentYear = new Date().getFullYear();
    const currentDay = new Date().getDate();

    const getDaysInMonth = (month, year) => {
        const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
      
        switch (month) {
          case 2:
            return isLeapYear ? 29 : 28;
          case 4: 
          case 6: 
          case 9: 
          case 11: 
            return 30;
          default:
            return 31;
        }
      };


    const handleConfirm = (e) => {
        e.preventDefault();
      
        const isValidDay = /^\d{1,2}$/.test(day) && Number(day) >= 1 && Number(day) <= getDaysInMonth(Number(month), Number(year));
        const isValidMonth = /^\d{1,2}$/.test(month) && Number(month) >= 1 && Number(month) <= 12;
        const isValidYear = /^\d{4}$/.test(year) && Number(year) >= 1000 && Number(year) <= currentYear;

        setDayError(!isValidDay);
        setMonthError(!isValidMonth);
        setYearError(!isValidYear);
      
      
        if (!isValidDay) {
            setDayError(true);
        }   
        if (!isValidMonth) {
            setMonthError(true);
        }
        if (!isValidYear) {
            setYearError(true);
        }
      
        if (isValidDay && isValidMonth && isValidYear) {

          if(isValidYear){
            const calcYear = currentYear - Number(year);
            setResultYear(calcYear.toString())
            }
            if(isValidMonth){
            const calcMonth = 12 - Number(month);
            setResultMonth(calcMonth.toString())
            }
            if(isValidDay){
            const calcDays = currentDay - Number(day);
            setResultDays(calcDays.toString())
            }
        } 

      };
      


  return (
    <section className={style.container}>
        <form className={style.form}>
            <div>
                <p className={style.title}>Day</p>
                <input className={style.input} type="number" placeholder='DD' min="1" max="31" required value={day} onChange={(e) => setDay(e.target.value)}/>
                {dayError && <p className={style.alert}>This field is required</p>}
            </div>
            <div>
                <p className={style.title}>Month</p>
                <input className={style.input} type="number" placeholder='MM' min="1" max="12" required value={month} onChange={(e) => setMonth(e.target.value)}/>
                {monthError && <p className={style.alert}>This field is required</p>}
            </div>
            <div>
                <p className={style.title}>Year</p>
                <input className={style.input} type="number" placeholder='YYYY'required value={year} onChange={(e) => setYear(e.target.value)}/>
                {yearError && <p className={style.alert}>This field is required</p>}
            </div>
        </form>
        <Button onClick={handleConfirm} />
        <article className={style.information}>
            <h2 className={style.informationAll}> 
              <span className={style.year}>
                <Counter value={(resultYear) || "--"} />
              </span>
              years
            </h2>
            <h2 className={style.informationAll}>
              <span className={style.month}>
                <Counter value={(resultMonth) || "--"} />
              </span>
              months
            </h2>
            <h2 className={style.informationAll}>
              <span className={style.day}>
                <Counter value={(resultDays) || "--"} />
              </span>
              days
              </h2>
        </article>
    </section>
  )
}
