
import style from '../Style/Components/Header.module.scss'
import logo from '../Static/svg/logo.svg';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <>

            <div className={style['Header']}>
                <Link to="/">
                    <div className={style['Header_cont']}>
                        <img src={logo} />
                        <div className={style['Header_cont_logo']}>Colosseum</div>
                    </div>
                </Link>
            </div>

        </>
    );
}

export default Header;