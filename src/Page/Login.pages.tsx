import { Box, Button, TextField } from "@mui/material";
import style from '../Style/Page/Login.module.scss';
import React, { useEffect } from "react";
import { Fetch } from "../Utils/Fetch";
import { useCookies } from 'react-cookie';
import Admin from '../Page/Admin.page';



interface Response {
    status: boolean,
    token?: string
    message?: string
}
const ip = "http://localhost:5010"
// const ip = ''

const Login = () => {

    const [errorLogin, setErrorLogin] = React.useState<boolean>(false);
    const [errorPass, setErrorPass] = React.useState<boolean>(false);

    const [login, setLogin] = React.useState<string>('');
    const [pass, setPass] = React.useState<string>('');

    const [admin, setAdmin] = React.useState<boolean>(false);

    const [cookies, setCookie] = useCookies();


    useEffect(() => {
        console.log(cookies)
        if (cookies) {
            if (cookies.token) {

                if (cookies.token.length) setAdmin(true);

            }
        }
    }, [])

    const loginSend = async () => {

        if (!login.length) setErrorLogin(true);

        if (!pass.length) setErrorPass(true);

        if (login.length && pass.length) {

            try {
                const fetch: Response = await Fetch.request(`${ip}/login`, { login: login, pass: pass });

                if (fetch) {

                    if (fetch.status) {

                        if (fetch.token) {
                            setCookie('token', fetch.token);
                            setAdmin(true);
                        }


                    }
                    else {
                        setErrorLogin(true);
                        setErrorPass(true);
                    }
                }

            }
            catch (e: any) {
                console.log('Error')
                console.log(e)
            }
        }
    }

    return (
        <>

            {admin ? <Admin /> : <Box className={style['Login']}>
                <Box className={style['Login_wrapper']}>
                    <Box className={style['Login_wrapper_cont']}>


                        <Box className={style['Login_wrapper_cont_wrap']}>
                            <TextField
                                id="outlined-basic"
                                label="Login"
                                variant="outlined"
                                error={errorLogin}
                                className={style['Login_wrapper_cont_wrap_input']}
                                onClick={() => setErrorLogin(false)}
                                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { setLogin(e.currentTarget.value) }}
                            />
                        </Box>

                        <Box className={style['Login_wrapper_cont_wrap']}>
                            <TextField
                                id="outlined-basic"
                                label="Password"
                                variant="outlined"
                                error={errorPass}
                                type="password"
                                className={style['Login_wrapper_cont_wrap_input']}
                                onClick={() => setErrorPass(false)}
                                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { setPass(e.currentTarget.value) }}
                            />
                        </Box>
                        <Box>
                            <Button variant="contained" className={style['Login_wrapper_cont_wrap_but']} onClick={loginSend} style={{ margin: 0 }}>log in</Button>
                        </Box>

                    </Box>
                </Box>
            </Box>}

        </>
    );
}

export default Login;