import { useState, type ChangeEvent } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import MainTitle from "../Components/MainTitle";
import UIInput from "../Components/UIKIT/UIInput";
import Wrapper from "../Components/Wrapper";
import style from '../Style/Page/Contacts.module.scss'
import UIButton from "../Components/UIKIT/UIButton";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useStore } from "../Story/Story";
import { parsePhoneNumber } from "libphonenumber-js";
import { Fetch } from "../Utils/Fetch";


const ip = 'http://localhost:5010'
// const ip = '';

const Contacts = () => {

    const [errorName, setErrorName] = useState<boolean>(false);
    const [errorEmail, setErrorEmail] = useState<boolean>(false);
    const [errorConfirmEmail, setErrorConfirmEmail] = useState<boolean>(false);
    const [errorPhone, setErrorPhone] = useState<boolean>(false);

    if (typeof window.ym === 'function') {
        window.ym(101975349, 'reachGoal', '2page');
    }

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [confirmEmail, setConfirmEmail] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('')

    const store = useStore;
    const validateEmail = (email: string): boolean => {
        const regex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };

    const nextStep = async () => {

        console.log(phoneNumber.length);

        if (name.length == 0) setErrorName(true);
        if (email.length == 0) setErrorEmail(true);
        if (confirmEmail.length == 0) setErrorConfirmEmail(true);

        if (phoneNumber.length == 0) setErrorPhone(true)

        if (!validateEmail(email)) setErrorEmail(true)
        if (!validateEmail(confirmEmail)) setErrorConfirmEmail(true);

        if (email !== confirmEmail) setErrorConfirmEmail(true);

        if (phoneNumber.length < 10) {
            setErrorPhone(true);
            return;
        }

        if (name.length && email.length && confirmEmail.length) {

            if ((validateEmail(email) && validateEmail(confirmEmail)) && (email === confirmEmail)) {
                console.log('next step')

                const st = store.getState();
                st.setEmail(email);
                st.setName(name);

                const sp = parsePhoneNumber("+" + phoneNumber)

                const phone = sp.formatInternational();

                st.setPhone(phone);

                const data = {
                    date: st.date,
                    time: st.time,
                    package: st.package,
                    name: name,
                    email: email,
                    phone: phone,
                    quantity: st.quantity,
                    price: st.price,
                    coloAdult: st.coloAdult,
                    coloChild: st.coloChild,
                    coloArenaAdult: st.coloArenaAdult,
                    coloArenaChild: st.coloArenaChild
                }

                const fetch: Response = await Fetch.request(`${ip}/set_lead`, data);

                if (fetch) {

                    console.log(fetch)
                    if (fetch.status) {


                        if (typeof window.ym === 'function') {
                            window.ym(101975349, 'reachGoal', 'go2pay');
                        }

                        window.location.href = fetch.url;
                    }
                }

            }

        }

    }

    return (
        <>
            <Wrapper>
                <Header />
                <MainTitle />

                <div className={style['Contacts_section']}>

                    <div>
                        <h3 className={style['Contacts_section_title']}>Contact Details</h3>
                    </div>
                </div>

                <div className={style['Contacts_section']}>
                    <UIInput
                        title='First and last name'
                        error={errorName}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.currentTarget.value)}
                        onClick={() => setErrorName(false)}
                        value={name ? name : ''}
                        placeholder="Your name and last name"
                    />
                </div>

                <div className={style['Contacts_section']}>
                    <UIInput
                        title='Email'
                        error={errorEmail}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)}
                        onClick={() => setErrorEmail(false)} value={email ? email : ''}
                        placeholder="Your email adress"
                    />
                </div>

                <div className={style['Contacts_section']}>
                    <UIInput
                        title='Confirm Email'
                        error={errorConfirmEmail}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmEmail(e.currentTarget.value)}
                        onClick={() => setErrorConfirmEmail(false)} value={confirmEmail ? confirmEmail : ''}
                        placeholder="Your email adress"
                    />
                </div>

                <div className={style['Contacts_section']}>

                    <div className={style['Contacts_section_title_number']}>
                        Telephone number<span>*</span>
                    </div>

                    <div className={style['Contacts_section_phone']} style={errorPhone ? { border: '1px solid red' } : {}}>
                        <PhoneInput
                            country={'us'}
                            value={''}
                            autoFormat={true}
                            onClick={() => setErrorPhone(false)}
                            onChange={(phone) => { setPhoneNumber(phone); }}
                        />

                    </div>

                </div>

                <div className={style['Contacts_section']}>
                    <p>
                        The our service will process personal data for the purpose of managing your purchase. More information about this processing and your rights in our <span>Privacy policy.</span>

                    </p>
                </div>

                <div className={style['Contacts_section']}>
                    <div className="">
                        <UIButton title='Book your tickets now' onClick={nextStep} />
                    </div>
                </div>

                <Footer />
            </Wrapper>
        </>
    );
}

export default Contacts;