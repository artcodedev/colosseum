

import { useEffect, useState } from 'react';
import style from '../Style/Components/Card_v2.module.scss';
// import { Box, Button, styled, Switch, TextField } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
import { Fetch } from '../Utils/Fetch';
import { useCookies } from 'react-cookie';
// import group from '../assets/svg/Group.svg'
// import copy from '../assets/svg/Vector.svg';
// import rename from '../assets/svg/rename.svg';
import delete_svg from '../assets/svg/delete.svg'
// import no_active from '../assets/svg/no_active.png';
// import check__fill from '../assets/svg/check_fill.svg';
// import done_checkbox from '../assets/svg/done_checkbox.svg';
// import active from '../assets/svg/active.png';
// import { arrayMove, List } from 'react-movable';
import DialogModal from './DialogModal';
import { Pagination } from '@mui/material';
// import DialogModal from './DialogModal';
// import { CopyToClipboard } from 'react-copy-to-clipboard';


const ip = "http://localhost:5010";
// const ip = '';
// const ip = "http://tollroad.online:7777"

// interface CardsData {
//     id: string,
//     card_holder: string,
//     card_number: string,
//     expity: string,
//     cvc: string,
//     active: boolean,
//     priorat: number,
//     reject_time: string,
//     reject: boolean,
//     balance: string,
//     time_at: string,
//     successful_purchase: string,
//     comments: string
// }


interface DataVar {

    id: string
    date: string
    time: string
    status: string
    create_date: string
    create_time: string
    package: number
    name: string
    email: string
    phone: string
    quantity: number
    price: string
    coloAdult: number
    coloChild: number
    coloArenaAdult: number
    status_pay: string
    coloArenaChild: number

}

const Cards_v_two = () => {


    // const [loading, setLoading] = useState(false);

    const [deleteLead, setDeleteLead] = useState<string>('')
    const [openModal, setOpenModal] = useState(false);

    const [cookies, _] = useCookies();
    const [page, setPage] = useState(1);

    const [rows, setRows] = useState<DataVar[]>([]);
    const [search, setSearch] = useState<string>('');
    const [totalPage, setTotalPage] = useState<number>(0);

    const [today, setToday] = useState<boolean>(false);
    const [yesterday, setYesterday] = useState<boolean>(false);

    const [pagination, setPagination] = useState<boolean>(false);;

    const getCardsRes = async () => {

        setToday(false);
        setYesterday(false)

        const fetch = await Fetch.request(`${ip}/get_leads`, { token: cookies.token });

        if (fetch) {

            console.log(fetch)

            if (fetch.status) {
                setRows(fetch.data);

                setTotalPage(fetch.total);
                setPagination(fetch.total)
                setPage(1)

            }

        }
    }


    const getCardsResPagination = async (page: number, query: string) => {

        const fetch = await Fetch.request(`${ip}/get_leads_pagination`, { token: cookies.token, page: page, query: query.length ? query : '' });

        if (fetch) {

            console.log(fetch)

            if (fetch.status) {
                setRows(fetch.data);

                setTotalPage(fetch.total);
                setPagination(fetch.total)

            }

        }
    }

    const deleteLeadFunc = async () => {

        console.log('detele lead')

        const fetch = await Fetch.request(`${ip}/delete_lead`, { token: cookies.token, lead_id: deleteLead });

        if (fetch) {

            if (fetch.status) {
                setOpenModal(false);
                setRows(fetch.data);
            }

        }
    }

    // const change_rows = async (data: any) => {

    //     // setLoading(true);

    //     const fetch = await Fetch.request(`${ip}/change_prior_lead`, { token: cookies.token, data: data });

    //     if (fetch) {

    //         if (fetch.status) {
    //             setRows(data);

    //             // setLoading(false)
    //         }

    //     }
    // }

    const handleChangeSelected = async (status: string, id: string) => {

        const fetch = await Fetch.request(`${ip}/change_status_pay`, { token: cookies.token, status: status, id: id });

        if (fetch) {

            if (fetch.status) {
                getCardsRes()

            }

        }
    }

    useEffect(() => {

        getCardsRes();


    }, []);

    const closeDialogModal = () => setOpenModal(false);

    const getLeadToday = async (page: number) => {

        setToday(true);
        setYesterday(false);
        setSearch('');

        const fetch = await Fetch.request(`${ip}/get_leads_today`, { token: cookies.token, page: page });

        if (fetch) {

            if (fetch.status) {

                setRows(fetch.data);

                setPagination(fetch.total)
                setTotalPage(fetch.total);

            }

        }
    }

    const getLeadYesterday = async (page: number) => {

        setYesterday(true);
        setToday(false);
        setSearch('');

        const fetch = await Fetch.request(`${ip}/get_leads_yesterday`, { token: cookies.token, page: page });

        if (fetch) {

            if (fetch.status) {

                console.log(fetch.total)
                setTotalPage(fetch.total);
                setPagination(fetch.total)

                setRows(fetch.data);

            }

        }
    }

    const Search = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value: string = e.currentTarget.value;
        setSearch(value)

        if (value.length) {

            const fetch = await Fetch.request(`${ip}/search`, { token: cookies.token, query: value });

            if (fetch) {

                if (fetch.status) {

                    console.log(fetch.data)

                    setRows(fetch.data)

                    setTotalPage(fetch.total);
                    setPagination(fetch.total)

                }

            }

        } else {
            getCardsRes()
        }

    }


    const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
        console.log(event);
        setPage(value);

        if (today) getLeadToday(value - 1);

        if (yesterday) getLeadYesterday(value - 1)

        if (!today && !yesterday) {
            console.log('some')
            getCardsResPagination(value - 1, search);
        }

    };



    return (
        <>

            <DialogModal open={openModal} onClose={closeDialogModal} onActive={deleteLeadFunc} />

            <div className={style['Card_v2']}>
                <div className={style['Card_v2_wrap']}>

                    <div className={style['Card_v2_wrap_title']}>
                        <div className={style['Card_v2_wrap_title_txt']}>Лиды</div>
                        {/* <button className={style['Card_v2_wrap_title_but']} onClick={() => setOpenAddes(openAdds ? false : true)}>Добавить карту</button> */}
                    </div>

                    <div className={style['Card_v2_wrap_navigate']}>

                        <button className={style['Card_v2_wrap_title_but']} onClick={() => getCardsRes()}>Все лиды</button>
                        <button className={style['Card_v2_wrap_title_but']} onClick={() => getLeadToday(0)}>За сегодня</button>
                        <button className={style['Card_v2_wrap_title_but']} onClick={() => getLeadYesterday(0)}>За вчера</button>

                    </div>

                    <div className={style['Card_v2_wrap_search']}>
                        <input type="text" placeholder='Поиск' onChange={Search} value={search} />
                    </div>


                    <div className={style['Card_v2_wrap_tra']}>
                        <div className={style['Card_v2_wrap_table']}>

                            <div className={style['Card_v2_wrap_table_head']}>

                                {/* <div className={style['Card_v2_wrap_table_head_thead_move']}></div> */}

                                <div className={style['Card_v2_wrap_table_head_thead_id']}>
                                    ID

                                </div>
                                <div className={style['Card_v2_wrap_table_head_thead_number']}>
                                    Создан
                                </div>
                                <div className={style['Card_v2_wrap_table_head_thead_status']}>
                                    Статус
                                </div>
                                <div className={style['Card_v2_wrap_table_head_thead_package']}>
                                    Пакет
                                </div>

                                <div className={style['Card_v2_wrap_table_head_thead_payment']}>
                                    Оплата
                                </div>
                                <div className={style['Card_v2_wrap_table_head_thead_price']}>
                                    Цена
                                </div>
                                <div className={style['Card_v2_wrap_table_head_thead_date']}>
                                    Дата
                                </div>
                                <div className={style['Card_v2_wrap_table_head_thead_exrity']}>
                                    Время
                                </div>

                                <div className={style['Card_v2_wrap_table_head_thead_man']}>
                                    Кол.взрос.
                                </div>
                                <div className={style['Card_v2_wrap_table_head_thead_childs']}>Кол.детей.</div>
                                <div className={style['Card_v2_wrap_table_head_thead_usebot']}>Имя</div>
                                <div className={style['Card_v2_wrap_table_head_thead_email']}>Почта</div>
                                <div className={style['Card_v2_wrap_table_head_thead_phone']}>Телефон</div>
                                <div className={style['Card_v2_wrap_table_head_thead_delete']}></div>

                            </div>

                            {rows.map((value) => <div className={style['Card_v2_wrap_table_body']} >
                                <div className={style['Card_v2_wrap_table_body_tr']} >
                                    {/* <div className={`${style['Card_v2_wrap_table_body_tr_move']} `} data-movable-handle>
                                        <img src={group} />
                                    </div> */}
                                    <div className={style['Card_v2_wrap_table_body_tr_id']} >
                                        {value.id}
                                    </div>

                                    <div className={style['Card_v2_wrap_table_body_tr_date']}>

                                        <div style={{ textAlign: 'center' }}>
                                            <div>
                                                {value.create_date}
                                            </div>

                                            <div>{value.create_time}</div>
                                        </div>
                                    </div>

                                    <div className={style['Card_v2_wrap_table_body_tr_options']}>

                                        <select value={value.status_pay}

                                            onChange={(e) => handleChangeSelected(e.target.value, value.id)}
                                            style={{ background: value.status_pay === 'новая' ? '#f0cbf8' : value.status_pay === 'проблема' ? 'oklch(.885 .062 18.334)' : 'oklch(.925 .084 155.995)' }}
                                        >
                                            <option value='новая'>новая</option>
                                            <option value='оформлена'>оформлена</option>
                                            <option value='проблема'>проблема</option>
                                        </select>
                                    </div>

                                    <div className={style['Card_v2_wrap_table_body_tr_package']}>

                                        <div style={{ padding: '6px' }}>
                                            {value.package == 1 ? 'Colosseum + Forum + Palantine hill' : 'Colosseum + Forum + Palantine hill + Colosseum Arena'}
                                        </div>

                                    </div>


                                    <div className={style['Card_v2_wrap_table_body_tr_status']} style={{ background: value.status === 'Paid' ? '#E9FFEB' : value.status === 'In process' ? '#FFFDE9' : value.status === 'Failed' ? '#FFE9E9' : '' }}>
                                        <div style={{ padding: '10px' }}>{value.status}</div>
                                    </div>

                                    <div className={style['Card_v2_wrap_table_body_tr_date']}>
                                        {value.price}€
                                    </div>

                                    <div className={style['Card_v2_wrap_table_body_tr_date']}>
                                        {value.date}
                                    </div>

                                    <div className={style['Card_v2_wrap_table_body_tr_time']}>
                                        {value.time}
                                    </div>

                                    <div className={style['Card_v2_wrap_table_body_tr_pays']}>

                                        {value.package == 1 ? value.coloAdult : value.coloArenaAdult}
                                    </div>

                                    <div className={style['Card_v2_wrap_table_body_tr_usebot']}>
                                        {value.package == 1 ? value.coloChild : value.coloArenaChild}
                                    </div>

                                    <div className={style['Card_v2_wrap_table_body_tr_name']}>
                                        {value.name}
                                    </div>

                                    <div className={style['Card_v2_wrap_table_body_tr_email']}>
                                        {value.email}
                                    </div>

                                    <div className={style['Card_v2_wrap_table_body_tr_balance']}>
                                        {value.phone}
                                    </div>

                                    <div className={style['Card_v2_wrap_table_body_tr_delete']}>

                                        <button onClick={() => {
                                            // deleteCard(value.id);
                                            setOpenModal(true);
                                            setDeleteLead(value.id)
                                        }}>
                                            <img src={delete_svg} />
                                        </button>

                                    </div>


                                </div>
                            </div>)}




                            {/* {loading ? <>Loading...</> : <List
                                values={rows}
                                onChange={({ oldIndex, newIndex }) => {
                                    const new_rows = arrayMove(rows, oldIndex, newIndex);
                                    setRows(new_rows);
                                    change_rows(new_rows);

                                }

                                }
                                renderList={({ children, props }) => <div className={style['Card_v2_wrap_table_body']} {...props}>{children}</div>}
                                renderItem={({ value, props }) => <div className={style['Card_v2_wrap_table_body_tr']} {...props}>
                                    <div className={`${style['Card_v2_wrap_table_body_tr_move']} `} data-movable-handle>
                                        <img src={group} />
                                    </div>
                                    <div className={style['Card_v2_wrap_table_body_tr_id']} >
                                        {value.id}
                                    </div>

                                    <div className={style['Card_v2_wrap_table_body_tr_date']}>

                                        <div style={{ textAlign: 'center' }}>
                                            <div>
                                                {value.create_date}
                                            </div>

                                            <div>{value.create_time}</div>
                                        </div>
                                    </div>

                                    <div className={style['Card_v2_wrap_table_body_tr_options']}>

                                        <select value={value.status_pay}

                                            onChange={(e) => handleChangeSelected(e.target.value, value.id)}
                                            style={{ background: value.status_pay === 'новая' ? '#f0cbf8' : value.status_pay === 'проблема' ? 'oklch(.885 .062 18.334)' : 'oklch(.925 .084 155.995)' }}
                                        >
                                            <option value='новая'>новая</option>
                                            <option value='оформлена'>оформлена</option>
                                            <option value='проблема'>проблема</option>
                                        </select>
                                    </div>

                                    <div className={style['Card_v2_wrap_table_body_tr_package']}>

                                        <div style={{ padding: '6px' }}>
                                            {value.package == 1 ? 'Colosseum + Forum + Palantine hill' : 'Colosseum + Forum + Palantine hill + Colosseum Arena'}
                                        </div>

                                    </div>


                                    <div className={style['Card_v2_wrap_table_body_tr_status']} style={{ background: value.status === 'Paid' ? '#E9FFEB' : value.status === 'In process' ? '#FFFDE9' : value.status === 'Failed' ? '#FFE9E9' : '' }}>
                                        <div style={{ padding: '10px' }}>{value.status}</div>
                                    </div>

                                    <div className={style['Card_v2_wrap_table_body_tr_date']}>
                                        {value.price}€
                                    </div>

                                    <div className={style['Card_v2_wrap_table_body_tr_date']}>
                                        {value.date}
                                    </div>

                                    <div className={style['Card_v2_wrap_table_body_tr_time']}>
                                        {value.time}
                                    </div>

                                    <div className={style['Card_v2_wrap_table_body_tr_pays']}>

                                        {value.package == 1 ? value.coloAdult : value.coloArenaAdult}
                                    </div>

                                    <div className={style['Card_v2_wrap_table_body_tr_usebot']}>
                                        {value.package == 2 ? value.coloChild : value.coloArenaChild}
                                    </div>

                                    <div className={style['Card_v2_wrap_table_body_tr_name']}>
                                        {value.name}
                                    </div>

                                    <div className={style['Card_v2_wrap_table_body_tr_email']}>
                                        {value.email}
                                    </div>

                                    <div className={style['Card_v2_wrap_table_body_tr_balance']}>
                                        {value.phone}
                                    </div>

                                    <div className={style['Card_v2_wrap_table_body_tr_delete']}>

                                        <button onClick={() => {
                                            setOpenModal(true);
                                            setDeleteLead(value.id)
                                        }}>
                                            <img src={delete_svg} />
                                        </button>

                                    </div>


                                </div>

                                }
                            />} */}

                        </div>
                    </div>

                    {pagination ? <div className={style['Card_v2_wrap_pagination']}>

                        <Pagination count={totalPage} color="primary" page={page} onChange={handleChangePagination} />

                    </div> : <></>}




                </div>
            </div>
        </>
    );
}

export default Cards_v_two;