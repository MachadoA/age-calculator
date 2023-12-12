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
  
  const calculateAge = () => {
    const now = new Date();
    const bday = new Date(year, month - 1, day);
    
    if (bday > now) {
      console.error('A data de nascimento não pode estar no futuro');
      return;
    }
    
    let yearCalculated = now.getFullYear() - bday.getFullYear();
    let monthDiff = now.getMonth() - bday.getMonth();
    let days = now.getDate() - bday.getDate();
    
    if (monthDiff < 0 || (monthDiff === 0 && days < 0)) {
      yearCalculated -= 1;
      monthDiff += 12;
    }
    
    if (days < 0) {
      const prevMonthDays = daysInMonth(now.getMonth() - 1, now.getFullYear());
      days += prevMonthDays;
      monthDiff -= 1;
    }
    return { year: yearCalculated, month: monthDiff, day: days };
  };
  
  
  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const handleConfirm = (e) => {
    e.preventDefault();
    
    const isValidDay = /^\d{1,2}$/.test(day) && Number(day) >= 1 && Number(day) <= daysInMonth(month - 1, year);
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
      const age = calculateAge();
      if (age){
        setResultYear(age.year.toString());
        setResultMonth(age.month.toString());
        setResultDays(age.day.toString());
      }
    }
  } 
  
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
  