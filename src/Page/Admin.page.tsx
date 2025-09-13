import React, { useEffect } from "react";
import style from '../Style/Components/Admin.module.scss';
import { Box } from "@mui/material";
import Header from "../Components/Header.components";
import { useCookies } from 'react-cookie';
import { Fetch } from "../Utils/Fetch";
import Cards from "../Components/Cards_v2";
import Loading from "../Components/Loading";

// const ip = ''
const ip = "http://localhost:5010";

const Admin = () => {

    const [cookies, setCookie] = useCookies();
    const [loading, setLoading] = React.useState(false);

    const token_verify = async () => {
        try {
            const fetch: { status: boolean } = await Fetch.request(`${ip}/token_verify`, { token: cookies.token });

            if (fetch) {

                if (fetch.status == false) {
                    setCookie('token', '')
                    window.location.replace('/admin');
                }
                if (fetch.status) {
                    setLoading(false);
                }
            }

        }
        catch (e: any) {
            console.log('Error')
            console.log(e)
        }
    }

    useEffect(() => {
        if (cookies) {
            if (cookies.token) {
                token_verify();
            }
            else {
                window.location.replace('/');
            }
        } else {
            window.location.replace('/');
        }
    }, []);

    return (
        <>

            {loading ? <Loading /> : <Box className={style['Admin']}>

                <Header />

                <Box className={style['Admin_wrap']}>

                    <Cards />

                </Box>
            </Box>}

        </>
    );
}

export default Admin;