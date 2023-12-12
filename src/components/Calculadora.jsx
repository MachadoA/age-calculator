import { useState } from 'react';
import Button from './Button';
import style from './Calculator.module.css';
import Counter from './Counter';

export default function Calculadora() {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [error, setError] = useState(null);
  const [resultYear, setResultYear] = useState('--');
  const [resultMonth, setResultMonth] = useState('--');
  const [resultDay, setResultDay] = useState('--');

  const currentYear = new Date().getFullYear();

  const calculateAge = () => {
    const bday = new Date(year, month - 1, day);
    const now = new Date();

    let byear = now.getFullYear() - bday.getFullYear();
    let bmonth = now.getMonth() - bday.getMonth();
    let bdays = now.getDate() - bday.getDate();

    if (bmonth < 0 || (bmonth === 0 && bdays < 0)) {
      byear -= 1;
      bmonth += 12;
    }

    if (bdays < 0) {
      const prevMonthDays = daysInMonth(now.getMonth() - 1, now.getFullYear());
      bdays += prevMonthDays;
      bmonth -= 1;
    }

    return { year: byear, month: bmonth, day: bdays };
  };

  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const handleConfirm = (e) => {
    e.preventDefault();

    if (day === '' || month === '' || year === '') {
      setError({ message: 'This field is required', type: 'all' });
      clearResults();
      return;
    }

    const numDay = Number(day);
    const numMonth = Number(month);
    const numYear = Number(year);

    if (isNaN(numDay) || numDay > 31 || numDay < 1)  {
      setError({ message: 'Invalid day', type: 'day' });
      clearResults();
      return;
    }
    if (isNaN(numMonth) || numMonth > 12 || numMonth < 1) {
      setError({ message: 'Invalid month', type: 'month' });
      clearResults();
      return;
    }
    if (isNaN(numYear) || numYear > currentYear || numYear < 1) {
      setError({ message: 'Invalid year', type: 'year' });
      clearResults();
      return;
    }

    setError(null);

    const age = calculateAge();
    if (age) {
      setResultYear(age.year.toString());
      setResultMonth(age.month.toString());
      setResultDay(age.day.toString());
    }
  };

  const clearResults = () => {
    setResultYear('--');
    setResultMonth('--');
    setResultDay('--');
  };

  return (
    <section className={style.container}>
      <form className={style.form}>
        <div className={`${style.yourBaseClass} ${error && (error.type === 'all' || error.type === 'day') ? style.activeError : ''}`}>
          <p className={style.title}>Day</p>
          <input
            className={style.input}
            type="number"
            placeholder="DD"
            min="1"
            max="31"
            required
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />
          {error && error.type === 'all' && <p className={style.alert}>{error.message}</p>}
          {error && error.type === 'day' && <p className={style.alert}>{error.message}</p>}
        </div>
        <div className={`${style.yourBaseClass} ${error && (error.type === 'all' || error.type === 'month') ? style.activeError : ''}`}>
          <p className={style.title}>Month</p>
          <input
            className={style.input}
            type="number"
            placeholder="MM"
            min="1"
            max="12"
            required
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
          {error && error.type === 'all' && <p className={style.alert}>{error.message}</p>}
          {error && error.type === 'month' && <p className={style.alert}>{error.message}</p>}
        </div>
        <div className={`${style.yourBaseClass} ${error && (error.type === 'all' || error.type === 'year') ? style.activeError : ''}`}>
          <p className={style.title}>Year</p>
          <input
            className={style.input}
            type="number"
            placeholder="YYYY"
            required
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          {error && error.type === 'all' && <p className={style.alert}>{error.message}</p>}
          {error && error.type === 'year' && <p className={style.alert}>{error.message}</p>}
        </div>
      </form>

      <Button onClick={handleConfirm} />

      <article className={style.information}>
        <h2 className={style.informationAll}>
          <span className={style.year}>
            <Counter value={resultYear} />
          </span>
          years
        </h2>

        <h2 className={style.informationAll}>
          <span className={style.month}>
            <Counter value={resultMonth} />
          </span>
          months
        </h2>

        <h2 className={style.informationAll}>
          <span className={style.day}>
            <Counter value={resultDay} />
          </span>
          days
        </h2>
      </article>
    </section>
  );
}
