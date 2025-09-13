import { AppBar, Box, Toolbar, Typography } from "@mui/material";
// import MenuIcon from '@mui/icons-material/Menu';



// interface Props {
//     onClick: () => void
// }

const Header = () => {

    return (
        <>
            <Box>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <Typography variant="h6" style={{textAlign:'center'}} color="inherit" component="div">
                            Admin panel
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
}

export default Header;