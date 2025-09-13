

import style from '../Style/Components/Wrapper.module.scss';
import Cicle from './Cicle';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <>

            <div className={style['Wrapper']}>
                <div className={style['Wrapper_cont']}>

                    <Cicle />


                    {children}
                </div>
            </div>

        </>
    );
}

export default Wrapper;