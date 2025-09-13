


import style from '../Style/Components/Counter.module.scss';
import dec from '../Static/svg/Decrease_button.svg';
import inc from '../Static/svg/Increase_button.svg';


interface Props {
    onClickIncrement: () => void
    onClickDecrement: () => void
    result: number

}


const Counter = ({ ...pr }: Props) => {

    return (
        <>
            <div className={style['Counetr']}>
                <div className={style['Counter_cont']}>

                    <button className={style['Counter_cont_decre']} onClick={pr.onClickDecrement}>
                        <img src={dec} />
                        {/* <span>-</span> */}
                    </button>
                    <div className={style['Counter_cont_res']}>{pr.result}</div>
                    <button className={style['Counter_cont_incre']} onClick={pr.onClickIncrement}>
                        <img src={inc} />
                        {/* <span>+</span> */}
                    </button>

                </div>
            </div>
        </>
    );
}

export default Counter;