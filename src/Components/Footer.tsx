

import style from '../Style/Components/Footer.module.scss';

import visa from '../Static/svg/visa.svg'
import mastercard from '../Static/svg/mastercard.svg'
import amex from '../Static/svg/amex.svg'
import apple_pay from '../Static/svg/apple_pay.svg';

const Footer = () => {

    return (
        <>
            <div className={style['Footer']}>
                <div className={style['Footer_wrap']}>

                    <div className={style['Footer_wrap_icons']}>

                        {[visa, mastercard, amex, apple_pay].map((e) => <div>
                            <img src={e} />
                        </div>)}
                    </div>

                    <div className={style['Footer_wrap_CompanyEmail']}>
                        <div className={style['Footer_wrap_CompanyEmail_txt']}>
                            Kupaline OU, Tallinn, Estonia, Company Registration Number: 14283378
                        </div>
                        <div className={style['Footer_wrap_CompanyEmail_txt']}>
                            Email: colotickets@gmail.com
                        </div>
                    </div>

                    <div className={style['Footer_wrap_PrivacyTerms']}>
                        <div className={style['Footer_wrap_PrivacyTerms_link']}>
                            <a href="https://tollroad.online/politics/privacy-policy.html" target="_blank">
                                Privacy policy
                            </a>
                        </div>
                        <div className={style['Footer_wrap_PrivacyTerms_link']}>
                            <a href="https://tollroad.online/politics/terms-conditions.html" target="_blank">
                                Terms and conditions
                            </a>
                        </div>
                    </div>

                </div>
            </div >
        </>
    );
}


export default Footer;