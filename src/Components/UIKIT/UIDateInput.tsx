

import style from '../../Style/Components/UIKIT/UIDateInput.module.scss';
import { useRef} from "react";
// import { useStore } from '../../Story/Story';
// import { useStepsStore } from '../../Story/story';

// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';


const formatDateForInput = (date: string | number | Date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;


}

const getMinDate = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return formatDateForInput(today);
};


export const calculateEndDate = (startDate: string | number | Date, period: any) => {
  const date = new Date(startDate);

  switch (period) {
    case '1day':
      break;
    case '7days':
      date.setDate(date.getDate() + 6);
      break;
    case '10days':
      date.setDate(date.getDate() + 9);
      break;
    case '1month':
      date.setMonth(date.getMonth() + 1);
      date.setDate(date.getDate() - 1);
      break;
    case '2months':
      date.setMonth(date.getMonth() + 2);
      date.setDate(date.getDate() - 1);
      break;
    case '3months':
      date.setMonth(date.getMonth() + 3);
      date.setDate(date.getDate() - 1);
      break;
    case '6months':
      date.setMonth(date.getMonth() + 6);
      date.setDate(date.getDate() - 1);
      break;
    case '1year':
      date.setFullYear(date.getFullYear() + 1);
      date.setDate(date.getDate() - 1);
      break;
    default:
      return null;
  }

  console.log('test')
  console.log(date)

  return date;
};


interface Props {
  onChange: (e: any) => void
  date: string
}

const UIDateInput = ({...pr}: Props) => {

  // const [date, setDate] = useState<string>('');
  // const store = useStore;

  const dateInputRef = useRef<HTMLInputElement | null>(null);

  // const [startDate, setStartDate] = useState<Date | null>();

  // const handleChange = (date: Date | null) => {
  //   setStartDate(date);
  // };


  const handleShowPicker = () => {

    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }

  };

  // const replace_date = () => {
  //   const startDateStr = formatDateForInput(new Date())

  //   const startDateStr_t = startDateStr.split('-');

  //   return `${startDateStr_t[2]}.${startDateStr_t[1]}.${startDateStr_t[0]}`;
  // }

  // const dateChange = (e: any) => {

  //   const vehiclePeriod = useStepsStore.getState().validity;

  //   console.log(vehiclePeriod)

  //   const isIOSSafari = /iPhone|iPad|iPod/.test(navigator.userAgent)
  //     && !navigator.userAgent.includes('Chrome')
  //     && !navigator.userAgent.includes('CriOS')

  //   let selectedDate;

  //   if (isIOSSafari) {
  //     const [year, month, day] = e.target.value.split('-').map(Number);
  //     selectedDate = new Date(year, month - 1, day + 1);
  //   } else {
  //     const [year, month, day] = e.target.value.split('-').map(Number);
  //     selectedDate = new Date(year, month - 1, day);
  //   }

  //   const today = new Date();

  //   today.setHours(0, 0, 0, 0);

  //   selectedDate = selectedDate ? selectedDate : today;

  //   const finalDate = selectedDate < today || selectedDate == today ? today : selectedDate;

  //   const endDate = calculateEndDate(finalDate, vehiclePeriod);

  //   const startDateStr = formatDateForInput(finalDate);

  //   const endDate_format = endDate ? formatDateForInput(endDate) : ''

  //   const startDateStr_t = startDateStr.split('-');

  //   const startDateStr_spl = `${startDateStr_t[2]}-${startDateStr_t[1]}-${startDateStr_t[0]}`;

  //   const endDate_format_t = endDate_format.split('-');
  //   const endDate_format_spl = `${endDate_format_t[2]}-${endDate_format_t[1]}-${endDate_format_t[0]}`;

  //   useStepsStore.getState().setStartDate(startDateStr_spl);
  //   useStepsStore.getState().setEndDate(endDate_format_spl);

  //   setDate(`${startDateStr_t[2]}.${startDateStr_t[1]}.${startDateStr_t[0]}`)

  // }

  // useEffect(() => {

  //   const today = new Date();

  //   today.setHours(0, 0, 0, 0);
  //   const startDateStr = formatDateForInput(today);

  //   const endDate_format_t = startDateStr.split('-');
  //   const endDate_format_spl = `${endDate_format_t[2]}.${endDate_format_t[1]}.${endDate_format_t[0]}`;

  //   setDate(endDate_format_spl)

  // }, []);

  // const dateChange = (e: any) => {

  //   const isIOSSafari = /iPhone|iPad|iPod/.test(navigator.userAgent)
  //     && !navigator.userAgent.includes('Chrome')
  //     && !navigator.userAgent.includes('CriOS')

  //   let selectedDate;

  //   if (isIOSSafari) {
  //     const [year, month, day] = e.target.value.split('-').map(Number);
  //     selectedDate = new Date(year, month - 1, day + 1);
  //   } else {
  //     const [year, month, day] = e.target.value.split('-').map(Number);
  //     selectedDate = new Date(year, month - 1, day);
  //   }

  //   const today = new Date();

  //   today.setHours(0, 0, 0, 0);

  //   selectedDate = selectedDate ? selectedDate : today;

  //   const finalDate = selectedDate < today || selectedDate == today ? today : selectedDate;

  //   const startDateStr = formatDateForInput(finalDate);

  //   const startDateStr_t = startDateStr.split('-');

  //   const new_date = `${startDateStr_t[2]}.${startDateStr_t[1]}.${startDateStr_t[0]}`;

  //   useStore.getState().setDate(new_date)

  //   console.log(`${startDateStr_t[2]}.${startDateStr_t[1]}.${startDateStr_t[0]}`)

  //   setDate(new_date);

  // }

  return (
    <>

      <div className={style['UIDateInput']}>

        <div className={style['UIDateInput_date']}>
          {/* <div>{date}</div> */}

          <div>{pr.date}</div>

          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.16663 7.00016C1.16663 4.80041 1.16663 3.70025 1.85029 3.01716C2.53396 2.33408 3.63354 2.3335 5.83329 2.3335H8.16663C10.3664 2.3335 11.4665 2.3335 12.1496 3.01716C12.8327 3.70083 12.8333 4.80041 12.8333 7.00016V8.16683C12.8333 10.3666 12.8333 11.4667 12.1496 12.1498C11.466 12.8329 10.3664 12.8335 8.16663 12.8335H5.83329C3.63354 12.8335 2.53338 12.8335 1.85029 12.1498C1.16721 11.4662 1.16663 10.3666 1.16663 8.16683V7.00016Z" stroke="#2C2C2C" stroke-width="0.875"></path><path d="M6 3V1.5M16 3V1.5M1.5 8H20.5" stroke="#2C2C2C" stroke-width="0.875" stroke-linecap="round"></path><path d="M10.5 9.91667C10.5 10.0714 10.4385 10.2198 10.3291 10.3291C10.2198 10.4385 10.0714 10.5 9.91667 10.5C9.76196 10.5 9.61358 10.4385 9.50419 10.3291C9.39479 10.2198 9.33333 10.0714 9.33333 9.91667C9.33333 9.76196 9.39479 9.61358 9.50419 9.50419C9.61358 9.39479 9.76196 9.33333 9.91667 9.33333C10.0714 9.33333 10.2198 9.39479 10.3291 9.50419C10.4385 9.61358 10.5 9.76196 10.5 9.91667ZM10.5 7.58333C10.5 7.73804 10.4385 7.88642 10.3291 7.99581C10.2198 8.10521 10.0714 8.16667 9.91667 8.16667C9.76196 8.16667 9.61358 8.10521 10.3291 7.99581C10.4385 7.88642 10.5 7.73804 10.5 7.58333ZM7.58333 9.91667C7.58333 10.0714 7.52188 10.2198 7.41248 10.3291C7.30308 10.4385 7.15471 10.5 7 10.5C6.84529 10.5 6.69692 10.4385 6.58752 10.3291C6.47813 10.2198 6.41667 10.0714 6.41667 9.91667C6.41667 9.76196 6.47813 9.61358 6.58752 9.50419C6.69692 9.39479 6.84529 9.33333 7 9.33333C7.15471 9.33333 7.30308 9.39479 7.41248 9.50419C7.52188 9.61358 7.58333 9.76196 7.58333 9.91667ZM7.58333 7.58333C7.58333 7.73804 7.52188 7.88642 7.41248 7.99581C7.30308 8.10521 7.15471 8.16667 7 8.16667C6.84529 8.16667 6.69692 8.10521 6.58752 7.99581C6.47813 7.88642 6.41667 7.73804 6.41667 7.58333C6.41667 7.42862 6.47813 7.28025 6.58752 7.17085C6.69692 7.06146 6.84529 7 7 7C7.15471 7 7.30308 7.06146 7.41248 7.17085C7.52188 7.28025 7.58333 7.42862 7.58333 7.58333ZM4.66667 9.91667C4.66667 10.0714 4.60521 10.2198 4.49581 10.3291C4.38642 10.4385 4.23804 10.5 4.08333 10.5C3.92862 10.5 3.78025 10.4385 3.67085 10.3291C3.56146 10.2198 3.5 10.0714 3.5 9.91667C3.5 9.76196 3.56146 9.61358 3.67085 9.50419C3.78025 9.39479 3.92862 9.33333 4.08333 9.33333C4.23804 9.33333 4.38642 9.39479 4.49581 9.50419C4.60521 9.61358 4.66667 9.76196 4.66667 9.91667ZM4.66667 7.58333C4.66667 7.73804 4.60521 7.88642 4.49581 7.99581C4.38642 8.10521 4.23804 8.16667 4.08333 8.16667C3.92862 8.16667 3.78025 8.10521 3.67085 7.99581C3.56146 7.88642 3.5 7.73804 3.5 7.58333C3.5 7.42862 3.56146 7.28025 3.67085 7.17085C3.78025 7.06146 3.92862 7 4.08333 7C4.23804 7 4.38642 7.06146 4.49581 7.17085C4.60521 7.28025 4.66667 7.42862 4.66667 7.58333ZM7.58333 9.91667C7.58333 10.0714 7.52188 10.2198 7.41248 10.3291C7.30308 10.4385 7.15471 10.5 7 10.5C6.84529 10.5 6.69692 10.4385 6.58752 10.3291C6.47813 10.2198 6.41667 10.0714 6.41667 9.91667C6.41667 9.76196 6.47813 9.61358 6.58752 9.50419C6.69692 9.39479 6.84529 9.33333 7 9.33333C7.15471 9.33333 7.30308 9.39479 7.41248 9.50419C7.52188 9.61358 7.58333 9.76196 7.58333 9.91667Z" fill="currentColor"></path></svg>

        </div>

        <input type='date' ref={dateInputRef} style={{ userSelect: 'none' }}
          min={getMinDate()}
          onChange={pr.onChange}
          // onChange={dateChange}
          onClick={handleShowPicker}
        />

      </div>
    </>
  );
}


export default UIDateInput;