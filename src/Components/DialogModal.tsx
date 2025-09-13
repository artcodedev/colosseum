import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery, useTheme } from "@mui/material";


interface Props {
    // onCLick: () => void
    onClose: () => void
    onActive: () => void
    open: boolean
}

const DialogModal = ({ ...pr }: Props) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <>

            <Dialog
                fullScreen={fullScreen}
                open={pr.open}
                onClose={pr.onClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Удаление лида"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Вы действительно хотите удалить лид?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={pr.onClose} >
                        Отмена
                    </Button>
                    <Button onClick={pr.onActive} autoFocus>
                        Удалить
                    </Button>
                </DialogActions>
            </Dialog>

        </>
    );
}

export default DialogModal;