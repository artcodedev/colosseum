

import style from '../../Style/Components/UIKIT/UIButton.module.scss';


interface Props {
    title?: string
    background?: string
    color?: string
    onClick: () => void
    children?: React.ReactNode
}

const UIButton = ({...pr}: Props) => {
    return (
        <>
            <button className={style['UIButton']} style={{background: pr.background || '', color: pr.color || ''}} onClick={pr.onClick}>{pr.title || pr.children}</button>
        </>
    );
}

export default UIButton;