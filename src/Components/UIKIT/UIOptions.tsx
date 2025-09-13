


import { useEffect, useState } from 'react';
import style from '../../Style/Components/UIKIT/UIOptions.module.scss';


interface DataOptions {
    value: string
    title: string
}

interface Props {
    title: string
    data: DataOptions[]
    value?: string
    selected?: string | null
    handleChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void | undefined
}

const UIOptions = ({ ...pr }: Props) => {

    // const vehicle = useStepsStore.getState().vehicle
    const [open, setOpen] = useState<boolean>(false);
    useEffect(() => {
        document.body.addEventListener('click', (e: MouseEvent) => {
            
            const target = e.target as HTMLInputElement;

            if (target.nodeName !== 'OPTION' && target.nodeName !== "SELECT") setOpen(false);

        });
      }, []);

    return (
        <>

            <div className={style['UIOptions']}>

                <div className={style['UIOptions_title']}>
                    {pr.title}<span>*</span>
                </div>

                <div className='' style={{ position: 'relative' }}>

                    <div className={style['UIOptions_select_arrow']}>
                        <img src="https://buy-vignette.com/static/svg/arrow_down.svg" className={style[open ? 'UIOptions_select_arrow_open' : 'UIOptions_select_arrow_close']}/>
                    </div>

                    <select
                        className={`${style['UIOptions_select']} ${style['UIOptions_select_open']}`}
                        // value={pr.value}
                        onChange={pr.handleChange}
                        onClick={() => {setOpen(open ? false : true);}}
                    >

                        {pr.data.map((e) => <option value={e.value} onClick={() => {setOpen(false)}} selected={pr.selected === e.value ? true : false} >{e.title}</option>)}

                    </select>
                </div>
            </div>
        </>
    );
}


export default UIOptions;