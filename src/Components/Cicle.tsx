

import style from '../Style/Components/Cicle.module.scss';
import ellipse from '../Static/svg/ellipse.svg';

const Cicle = () => {
    return (
        <>
            <div className={style['Cicle']}>
                <img src={ellipse} />
            </div>
        </>
    );
}

export default Cicle;