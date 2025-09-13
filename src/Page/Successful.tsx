import Footer from "../Components/Footer";
import Header from "../Components/Header";
import UIButton from "../Components/UIKIT/UIButton";
import Wrapper from "../Components/Wrapper";
import style from '../Style/Page/Successful.module.scss';

import whatsup from '../Static/svg/logos_whatsapp-icon.svg';

import { useStore } from '../Story/Story';

import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

// const ip = "http://localhost:5010";
const ip = '';

const Successful = () => {

    const store = useStore;

    const navigate = useNavigate();

    useEffect(() => {

        const searchParams = new URLSearchParams(window.location.search);

        if (searchParams.get('id')) {
            fetch(`${ip}/callback_payment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    status: 'successful',
                    id: searchParams.get('id')
                }),
            });
        }
        
    }, []);

    return (
        <>
            <Wrapper>
                <Header />

                <div className={style['Successful_title']}>
                    Payment successful!
                </div>

                <div className={style['Successful_u_title']}>
                    We will send you an electronic ticket via email within 10 to 20 minutes.
                </div>

                <div className={style['Successful_info']}>

                    <div className={style['Successful_info_title']}>Your ticket information</div>

                    <div className={style['Successful_info_details']}>

                        <div className={style['Successful_info_details_item']}>
                            <div className={style['Successful_info_details_item_title']}>Date</div>
                            <div className={style['Successful_info_details_item_data']}>{store.getState().date}</div>
                        </div>

                        <div className={style['Successful_info_details_item_line']}></div>

                        <div className={style['Successful_info_details_item']}>
                            <div className={style['Successful_info_details_item_title']}>Time</div>
                            <div className={style['Successful_info_details_item_data']}>{store.getState().time}</div>
                        </div>

                    </div>

                    <div className={style['Successful_info_line']}></div>

                    {store.getState().coloAdult ? <div className={style['Successful_info_details']}>

                        <div className={style['Successful_info_details_item']}>
                            <div className={style['Successful_info_details_item_title']}>Package</div>

                            <div className={style['Successful_info_details_item_data']}>

                                {store.getState().package == 1 ? <div className={style['Successful_info_details_item_data_tarif']}>
                                    <div>Colosseum</div>
                                    <div>Colosseum + Forum + Palantine hill</div>
                                </div> : <div className={style['Successful_info_details_item_data_tarif']}>
                                    <div>Colosseum + Arena</div>
                                    <div>Colosseum + Forum + Palantine hill + Colosseum Arena</div>
                                </div>}

                            </div>
                        </div>

                        <div className={style['Successful_info_details_item_line']}></div>

                        <div className={style['Successful_info_details_item']}>
                            <div className={style['Successful_info_details_item_title']}>Quantity</div>
                            <div className={style['Successful_info_details_item_data']}>
                                {store.getState().coloAdult} (adult) {store.getState().coloChild ? `+ ${store.getState().coloChild} (< 18)` : ''}
                            </div>
                        </div>

                    </div> : <></>}

                    {store.getState().coloArenaAdult ? <div className={style['Successful_info_details']}>

                        <div className={style['Successful_info_details_item']}>
                            <div className={style['Successful_info_details_item_title']}>Package</div>

                            <div className={style['Successful_info_details_item_data']}>

                                <div className={style['Successful_info_details_item_data_tarif']}>
                                    <div>Colosseum + Arena</div>
                                    <div>Colosseum + Forum + Palantine hill + Colosseum Arena</div>
                                </div>

                            </div>
                        </div>

                        <div className={style['Successful_info_details_item_line']}></div>

                        <div className={style['Successful_info_details_item']}>
                            <div className={style['Successful_info_details_item_title']}>Quantity</div>
                            <div className={style['Successful_info_details_item_data']}>
                                {store.getState().coloArenaAdult} (adult) {store.getState().coloArenaAdult ? `+ ${store.getState().coloArenaAdult} (< 18)` : ''}
                            </div>
                        </div>

                    </div> : <></>}

                </div>

                <div className={style['Successful_info']}>

                    <div className={style['Successful_info_title']}>Contact Details</div>

                    <div className={style['Successful_info_details']}>

                        <div className={style['Successful_info_details_item']}>
                            <div className={style['Successful_info_details_item_title']}>Name and last name</div>
                            <div className={style['Successful_info_details_item_data']}>{store.getState().name}</div>
                        </div>

                        <div className={style['Successful_info_details_item_line']}></div>

                        <div className={style['Successful_info_details_item']}>
                            <div className={style['Successful_info_details_item_title']}>Telephone number</div>
                            <div className={style['Successful_info_details_item_data']}>{store.getState().phone}</div>
                        </div>

                    </div>

                    <div className={style['Successful_info_line']}></div>

                    <div className={style['Successful_info_email']}>
                        <div className={style['Successful_info_email_title']}>Email</div>
                        <div className={style['Successful_info_email_email']}>{store.getState().email}</div>
                    </div>


                    <div className={style['Successful_info_line']}></div>

                </div>

                <div className={style['Successful_u_txt_footer']}>
                    If you have not received your ticket within 20 minutes, please contact us using the support button below.
                </div>

                <div className={style['Successful_but']}>
                    <UIButton background="#60D569" color="#FFF" onClick={() => { }}>
                        <div className={style['Successful_but_whatsup']}>
                            <span>
                                <img src={whatsup} />
                            </span>
                            <span>WhatsApp support</span>
                        </div>
                    </UIButton>
                </div>

                <div className={style['Successful_but']}>
                    <UIButton title='Return to main page' background="#DED9D9" color="#1E1B1B" onClick={() => navigate('/')} />
                </div>

                <Footer />
            </Wrapper>
        </>
    );
}

export default Successful;