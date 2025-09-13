

import type { ChangeEvent } from 'react';
import style from '../../Style/Components/UIKIT/UIEmail.module.scss';


interface Props {
    title: string
    error: boolean
    value: string
    placeholder: string
    onChange: (event: ChangeEvent<HTMLInputElement>) => void 
    onClick: () => void
}

const UIEmail = ({...pr}: Props) => {

    return (
        <>
            <div className={style['UIEmail']}>

                <div className={style['UIEmail_title']}>
                    {pr.title}<span>*</span>
                </div>

                <input type='text' onChange={pr.onChange} value={pr.value} onClick={pr.onClick} placeholder={pr.placeholder} style={pr.error ? {border: '1px solid red'} : {}}/>

            </div>
        </>
    )
}

export default UIEmail;