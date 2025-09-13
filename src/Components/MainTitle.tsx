
import style from '../Style/Components/MainTitle.module.scss';

const MainTitle = () => {
    return (
        <>

            <div className={style['MainTitle']}>
                <h1 className={style['MainTitle_h1']}>
                    <span>Colosseum</span> Tickets
                </h1>
                <h2 className={style['MainTitle_h2']}>buy online and skip the line</h2>
            </div>
        </>
    );
}

export default MainTitle;