
import Footer from '../Components/Footer';
import Wrapper from '../Components/Wrapper';
import Header from '../Components/Header';
import MainTitle from '../Components/MainTitle';
import MainMedia from '../Components/MainMedia';
import UIOptions from '../Components/UIKIT/UIOptions';
import UIButton from '../Components/UIKIT/UIButton';

import style from '../Style/Page/Index.module.scss';
import { useEffect, useState } from 'react';
import UIDateInput from '../Components/UIKIT/UIDateInput';
import { useNavigate } from 'react-router-dom';

import CN from '../Static/svg/CN-China.svg';
import DE from '../Static/svg/DE-Germany.svg';
import ES from '../Static/svg/ES-Spain.svg';
import FR from '../Static/svg/FR-France.svg';
import IT from '../Static/svg/IT-Italy.svg';
import PT from '../Static/svg/PT-Portugal.svg';
import EN from '../Static/svg/EN-En.svg';
import Counter from '../Components/Counter';
import loading_svg from '../Static/svg/tube-spinner.svg';
import { useStore } from '../Story/Story';
import { Fetch } from '../Utils/Fetch';

declare global { interface Window { ym: any } }

interface DataTimeFetch {
    ADULT: number
    CHILD: number
    INFANT: number
    dateTime: string
    guestFields?: any[]
    language: string
    productId: string
    total: string
    vacancies: number
}

const ip = 'http://localhost:5010'
// const ip = ''

const Index = () => {

    const store = useStore;
    const [selectDate, setSelectDate] = useState<boolean>(false);

    const [packageOne, setPackageOne] = useState<boolean>(true);
    const [packageTwo, setPackageTwo] = useState<boolean>(false);
    const [selectTime, setSelectTime] = useState<string>('');
    const [date, setDate] = useState<string>('');

    const [timeDate, setTimeDate] = useState<boolean>(false);

    const [coloAdult, setColoAdult] = useState<number>(0);
    const [coloAdultChild, setColoAdultChild] = useState<number>(0);

    const [coloArenaAdult, setColoArenaAdult] = useState<number>(0);
    const [coloArenaAdultChild, setColoArenaAdultChild] = useState<number>(0);

    const [loading, setLoading] = useState<boolean>(true);

    const [dataTimeActial, setDataTimeActive] = useState<DataTimeFetch[]>([]);

    const navigate = useNavigate();

    const date_now = new Date();

    const dateT = date_now.getDate().toString();
    const monthT = (date_now.getMonth() + 1).toString();

    const dateS = new Date(+new Date() + 86400000).getDate().toString();

    const startOfValidityValue = [
        {
            title: `Today (${dateT.length == 1 ? '0' + dateT : dateT}.${monthT.length == 1 ? '0' + monthT : monthT}.${date_now.getFullYear()})`,
            value: '1'
        },
        {
            title: `Tomorrow (${dateS.length == 1 ? '0' + dateS : dateS}.${monthT.length == 1 ? '0' + monthT : monthT}.${date_now.getFullYear()})`,
            value: '2'
        },
        {
            title: 'Later (select date)',
            value: `3`
        }
    ]

    const formatDateForInput = (date: string | number | Date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const handleChangeDate = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.currentTarget.value;
        setSelectTime('');
        useStore.getState().setTime(null);

        if (typeof window.ym === 'function') {
            window.ym(101975349, 'reachGoal', 'select_time');
        }

        if (value === '1') {
            store.getState().setDate(`${dateT.length == 1 ? '0' + dateT : dateT}.${monthT.length == 1 ? '0' + monthT : monthT}.${date_now.getFullYear()}`)
            setLoading(true);
            setTimeDate(false);
            setPackageOne(true);
            setPackageTwo(false);
            fetchActualDate('TIC_COL_1170_CU', `${date_now.getFullYear()}-${monthT.length == 1 ? '0' + monthT : monthT}-${dateT.length == 1 ? '0' + dateT : dateT}`, '1170')
            setColoAdultChild(0)
            setColoArenaAdultChild(0)
            setColoAdult(0)
            setColoArenaAdult(0)
        }

        if (value === '2') {
            store.getState().setDate(`${dateS.length == 1 ? '0' + dateS : dateS}.${monthT.length == 1 ? '0' + monthT : monthT}.${date_now.getFullYear()}`);
            setLoading(true);
            setTimeDate(false);
            setPackageOne(true);
            setPackageTwo(false);
            fetchActualDate('TIC_COL_1170_CU', `${date_now.getFullYear()}-${monthT.length == 1 ? '0' + monthT : monthT}-${dateS.length == 1 ? '0' + dateS : dateS}`, '1170')
            setColoAdultChild(0)
            setColoArenaAdultChild(0)
            setColoAdult(0)
            setColoArenaAdult(0)
        }

        if (value === '3') {

            const today = new Date();

            today.setHours(0, 0, 0, 0);
            const startDateStr = formatDateForInput(today);

            const endDate_format_t = startDateStr.split('-');
            const endDate_format_spl = `${endDate_format_t[2]}.${endDate_format_t[1]}.${endDate_format_t[0]}`;
            useStore.getState().setDate(endDate_format_spl);

            setDate(endDate_format_spl);
            setSelectDate(true);
        }

        if (value !== '3') { setSelectDate(false) }
    }

    const fetchActualDate = async (productId: string, date: string, tour: string) => {

        try {

            const data = {
                productId: productId,
                date: date,
                tour: tour
            }

            const res = await Fetch.request(`${ip}/get_time`, data);

            if (res) {

                if (res.status) {

                    console.log(res)
                    setDataTimeActive(res.data.data.availabilities);
                    setLoading(false);
                    setTimeDate(true)
                }
                console.log(res);
            }

        }
        catch (e: any) {
            console.log(e)
        }
    }

    const ButNextStep = () => {

        const time = store.getState().time;
        const adult = store.getState().coloAdult
        const adultArena = store.getState().coloArenaAdult;

        if (time && (adult || adultArena)) {
            navigate('/contacts');
        }
    }

    const selectPriceOne = () => {

        if (packageOne) return

        setPackageOne(true);
        setPackageTwo(false);
        setLoading(true);
        setTimeDate(false);
        setColoAdultChild(0)
        setColoArenaAdultChild(0)
        setColoAdult(0)
        setColoArenaAdult(0)
        useStore.getState().setTime(null);
        useStore.getState().setPackage(1);
        useStore.getState().setColoAdult(0)
        useStore.getState().setColoArenaAdult(0)
        useStore.getState().setColoChild(0)
        useStore.getState().setColoArenaChild(0)
        useStore.getState().setPrice('0')

        const date = useStore.getState().date?.split('.')[0];

        const n_date = date ? date : dateT.length == 1 ? '0' + dateT : dateT;

        fetchActualDate('TIC_COL_1170_CU', `${date_now.getFullYear()}-${monthT.length == 1 ? '0' + monthT : monthT}-${n_date}`, '1170')
    }

    const selectPriceTwo = () => {

        if (packageTwo) return

        setPackageOne(false);
        setPackageTwo(true);
        setLoading(true);
        setTimeDate(false);
        setColoAdultChild(0)
        setColoArenaAdultChild(0)
        setColoAdult(0)
        setColoArenaAdult(0)
        useStore.getState().setTime(null);
        useStore.getState().setPackage(2);
        useStore.getState().setColoAdult(0);
        useStore.getState().setColoArenaAdult(0);
        useStore.getState().setColoChild(0);
        useStore.getState().setColoArenaChild(0);
        useStore.getState().setPrice('0')

        const date = useStore.getState().date?.split('.')[0];

        const n_date = date ? date : dateT.length == 1 ? '0' + dateT : dateT;
        fetchActualDate('TIC_COL_ARE_1172_CU', `${date_now.getFullYear()}-${monthT.length == 1 ? '0' + monthT : monthT}-${n_date}`, '1172')
    }

    const selectTimeHeadler = (time: string) => () => {
        setSelectTime(time);
        useStore.getState().setTime(time);
        useStore.getState().setPackage(1);
    }

    const dateChange = (e: any) => {

        setLoading(true);
        setTimeDate(false)
        setSelectTime('');
        useStore.getState().setTime(null);

        setColoAdultChild(0)
        setColoArenaAdultChild(0)
        setColoAdult(0)
        setColoArenaAdult(0);
        setPackageOne(true);
        setPackageTwo(false);


        const isIOSSafari = /iPhone|iPad|iPod/.test(navigator.userAgent)
            && !navigator.userAgent.includes('Chrome')
            && !navigator.userAgent.includes('CriOS')

        let selectedDate;

        if (isIOSSafari) {
            const [year, month, day] = e.target.value.split('-').map(Number);
            selectedDate = new Date(year, month - 1, day + 1);
        } else {
            const [year, month, day] = e.target.value.split('-').map(Number);
            selectedDate = new Date(year, month - 1, day);
        }

        const today = new Date();

        today.setHours(0, 0, 0, 0);

        selectedDate = selectedDate ? selectedDate : today;

        const finalDate = selectedDate < today || selectedDate == today ? today : selectedDate;

        const startDateStr = formatDateForInput(finalDate);

        const startDateStr_t = startDateStr.split('-');

        const new_date = `${startDateStr_t[2]}.${startDateStr_t[1]}.${startDateStr_t[0]}`;

        useStore.getState().setDate(new_date);


        fetchActualDate('TIC_COL_1170_CU', `${date_now.getFullYear()}-${monthT.length == 1 ? '0' + monthT : monthT}-${startDateStr_t[2].length == 0 ? '0' + startDateStr_t[2] : startDateStr_t[2]}`, '1170')

        setDate(new_date);

    }

    const chectDateTime = (data: string) => {
        for (let i = 0; i < dataTimeActial.length; i++) {
            if (dataTimeActial[i].dateTime.includes(data)) return true
        }

        return false;
    }

    useEffect(() => {
        console.log('1');

        store.getState().setColoAdult(0);
        store.getState().setColoArenaAdult(0);
        useStore.getState().setTime(null);

        store.getState().setDate(`${dateT.length == 1 ? '0' + dateT : dateT}.${monthT.length == 1 ? '0' + monthT : monthT}.${date_now.getFullYear()}`);

        fetchActualDate('TIC_COL_1170_CU', `${date_now.getFullYear()}-${monthT.length == 1 ? '0' + monthT : monthT}-${dateT.length == 1 ? '0' + dateT : dateT}`, '1170');

    }, []);

    return (
        <>

            <Wrapper>
                <Header />
                <MainTitle />

                <div>
                    <MainMedia />
                </div>

                <div className={style['Index_section']}>

                    <div >
                        <h3 className={style['Index_section_title']}>Date</h3>
                    </div>

                    <UIOptions title='Select a date' data={startOfValidityValue} handleChange={handleChangeDate} selected={''} />

                    <div className={style['Index_section_date']}>
                        {selectDate ? <UIDateInput onChange={dateChange} date={date} /> : <></>}
                    </div>
                </div>

                {true ? <div className={style['Index_section']}>

                    <div >
                        <h3 className={style['Index_section_title']}>Package</h3>
                    </div>

                    <div className={style['Index_section_showPackage']} onClick={selectPriceOne} style={packageOne ? {} : { opacity: '.5' }}>

                        <div className={style['Index_section_showPackage_title']} >

                            <div className={style['Index_section_showPackage_title_main']}>Colosseum</div>
                            <div className={style['Index_section_showPackage_title_main_upper']}>Colosseum + Forum + Palantine hill</div>

                        </div>

                        <div className={style['Index_section_showPackage_wrapper']}>
                            <div className={style['Index_section_showPackage_data']}>

                                <div className={style['Index_section_showPackage_data_title']} >Adult</div>

                                <div className={style['Index_section_showPackage_data_price']} >37€</div>

                                <div className={style['Index_section_showPackage_data_counter']}>
                                    <Counter
                                        result={coloAdult}
                                        onClickDecrement={() => {

                                            const price = coloAdult == 0 ? 0 : coloAdult - 1;
                                            setColoAdult(price);
                                            store.getState().setColoAdult(price)

                                            store.getState().setPrice(((price * 37) + (coloArenaAdult * 53)).toString())
                                        }}
                                        onClickIncrement={() => {
                                            const price = coloAdult >= 5 ? 5 : coloAdult + 1;
                                            setColoAdult(price);
                                            store.getState().setColoAdult(price)
                                            store.getState().setPrice(((price * 37) + (coloArenaAdult * 53)).toString())
                                        }}

                                    />
                                </div>

                            </div>

                            <div className={style['Index_section_showPackage_line']}>

                            </div>

                            <div className={style['Index_section_showPackage_data']}>

                                <div className={style['Index_section_showPackage_data_title']}>	&lt; 18 yrs</div>

                                <div className={style['Index_section_showPackage_data_price']}>Free</div>

                                <div className={style['Index_section_showPackage_data_counter']}>
                                    <Counter
                                        result={coloAdultChild}
                                        onClickDecrement={() => {
                                            const price = coloAdultChild == 0 ? 0 : coloAdultChild - 1
                                            setColoAdultChild(price);
                                            store.getState().setColoChild(price)

                                        }}
                                        onClickIncrement={() => {
                                            const price = coloAdultChild >= 5 ? 5 : coloAdultChild + 1
                                            setColoAdultChild(price);
                                            store.getState().setColoChild(price)

                                        }}

                                    />
                                </div>

                            </div>
                        </div>

                    </div>

                    <div className={style['Index_section_showPackage']} onClick={selectPriceTwo} style={packageTwo ? {} : { opacity: '.5' }}>

                        <div className={style['Index_section_showPackage_title']}>

                            <div className={style['Index_section_showPackage_title_main']}>Colosseum + Arena</div>
                            <div className={style['Index_section_showPackage_title_main_upper']}>Colosseum + Forum + Palantine hill <span>+ Colosseum Arena</span></div>

                        </div>

                        <div className={style['Index_section_showPackage_wrapper']}>
                            <div className={style['Index_section_showPackage_data']}>

                                <div className={style['Index_section_showPackage_data_title']}>Adult</div>

                                <div className={style['Index_section_showPackage_data_price']}>53€</div>

                                <div className={style['Index_section_showPackage_data_counter']}>
                                    <Counter
                                        result={coloArenaAdult}
                                        onClickDecrement={() => {
                                            const price = coloArenaAdult == 0 ? 0 : coloArenaAdult - 1
                                            setColoArenaAdult(price);
                                            store.getState().setColoArenaAdult(price)
                                            store.getState().setPrice(((coloAdult * 37) + (price * 53)).toString())

                                        }}
                                        onClickIncrement={() => {
                                            const price = coloArenaAdult >= 5 ? 5 : coloArenaAdult + 1;
                                            setColoArenaAdult(price);
                                            store.getState().setColoArenaAdult(price);
                                            store.getState().setPrice(((coloAdult * 37) + (price * 53)).toString())
                                        }}

                                    />
                                </div>

                            </div>

                            <div className={style['Index_section_showPackage_line']}>

                            </div>

                            <div className={style['Index_section_showPackage_data']}>

                                <div className={style['Index_section_showPackage_data_title']}>	&lt; 18 yrs</div>

                                <div className={style['Index_section_showPackage_data_price']}>Free</div>

                                <div className={style['Index_section_showPackage_data_counter']}>
                                    <Counter
                                        result={coloArenaAdultChild}
                                        onClickDecrement={() => {
                                            const price = coloArenaAdultChild == 0 ? 0 : coloArenaAdultChild - 1;
                                            setColoArenaAdultChild(price);
                                            store.getState().setColoArenaChild(price);

                                        }}
                                        onClickIncrement={() => {
                                            const price = coloArenaAdultChild >= 5 ? 5 : coloArenaAdultChild + 1;
                                            setColoArenaAdultChild(price);
                                            store.getState().setColoArenaChild(price);

                                        }}

                                    />
                                </div>

                            </div>
                        </div>

                    </div>

                </div> : <></>}

                {loading ? <div className={style['Index_section']}>
                    <img src={loading_svg} style={{ width: '50px' }} />
                </div> : <></>}

                {timeDate ? <div className={style['Index_section']}>

                    <div>
                        <h3 className={style['Index_section_title']}>Time</h3>
                    </div>

                    <div>

                        <div className={style['Index_section_time']}>
                            <div className={style['Index_section_time_title']}>Morning</div>



                            <div className={style['Index_section_time_res']}>

                                {['08:30', '08:45', '09:00', '09:15', '09:30', '09:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45', '12:00', '12:15', '12:30'].map((e) => {

                                    return chectDateTime(e) ?
                                        <div className={style['Index_section_time_res_wrap']}
                                            onClick={selectTimeHeadler(e)}
                                            style={selectTime === e ? { background: '#2D5DFA', color: '#fff' } : {}}
                                        >
                                            {e}
                                        </div> : <div className={style['Index_section_time_res_wrap']} style={{ opacity: '.5' }}>
                                            {e}
                                        </div>

                                })}

                            </div>

                        </div>

                        <div className={style['Index_section_time']} style={{ marginTop: '16px' }}>
                            <div className={style['Index_section_time_title']}>Afternoon</div>

                            <div className={style['Index_section_time_res']}>

                                {['12:45', '13:00', '13:15', '13:30', '13:45', '14:00', '14:15', '14:30', '14:45', '15:00', '15:15', '15:30', '15:45', '16:00', '16:15', '16:30', '16:45',
                                    '17:00', '17:15', '17:30', '17:45', '18.00'].map((e) => {

                                        return chectDateTime(e) ?
                                            <div className={style['Index_section_time_res_wrap']}
                                                onClick={selectTimeHeadler(e)}
                                                style={selectTime === e ? { background: '#2D5DFA', color: '#fff' } : {}}
                                            >
                                                {e}
                                            </div> : <div className={style['Index_section_time_res_wrap']} style={{ opacity: '.5' }}>
                                                {e}
                                            </div>
                                    })}

                            </div>

                        </div>

                    </div>

                </div> : <></>}

                <div className={style['Index_section']}>

                    <div >
                        <h3 className={style['Index_section_title']}>Every package include audio guide</h3>
                    </div>

                    <div>
                        <div className={style['Index_section_flags']}>
                            {[ES, EN, FR, IT, DE, CN, PT].map((e) => <img src={e} />)}
                        </div>

                    </div>

                </div>

                <div className={style['Index_section']}>

                    {true ? <div className={style['Index_section_total']}>
                        <span>Total:</span>
                        <span>{(coloAdult * 37) + (coloArenaAdult * 53)} €</span>
                    </div> : <></>}

                </div>

                <div className={style['Index_section']}>
                    <div className={style['Index_section_bun']}>
                        <UIButton title='NEXT' onClick={ButNextStep} />
                    </div>
                </div>

                <Footer />
            </Wrapper>

        </>
    );
}

export default Index;