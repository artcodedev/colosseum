
import style from '../Style/Components/MainMedia.module.scss';
// import main_img from '../Static/main_img.png';

const MainMedia = () => {
    return (
        <>
            <div className={style['MainMedia']}>
                {/* <img src={main_img} /> */}

                <video controls={false} autoPlay muted loop playsInline>
                    <source
                        type="video/mp4"
                        src="https://cdn-imgix.headout.com/media/videos/c9d29d6fdc80bc97ecf26e0162e155a9-Colosseum%20Rome%201080P.mp4"
                    />
                </video>
            </div>
        </>
    );
}


export default MainMedia;