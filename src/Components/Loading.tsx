import { Box } from "@mui/material";
import style from '../Style/Components/Loading.module.scss';




const Loading = () => {
    return (
        <>
            <Box className={style['Loading']}>
                <Box className={style['Loading_wrap']}>

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                        <circle fill="#1565c0" stroke="#1565c0" stroke-width="14" r="15" cx="40" cy="65">
                            <animate attributeName="cy" calcMode="spline" dur="3.3" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4" />
                        </circle>
                        <circle fill="#1565c0" stroke="#1565c0" stroke-width="14" r="15" cx="100" cy="65">
                            <animate attributeName="cy" calcMode="spline" dur="3.3" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2" />
                        </circle>
                        <circle fill="#1565c0" stroke="#1565c0" stroke-width="14" r="15" cx="160" cy="65">
                            <animate attributeName="cy" calcMode="spline" dur="3.3" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0" />
                        </circle>
                    </svg>

                </Box>
            </Box>
        </>
    );
}
export default Loading;

