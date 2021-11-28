import React, { useEffect } from 'react';
import { Layout } from 'antd';
import Head from 'next/head';
import SidebarApp from "./sidebar";
import HeaderApp from "./header";
import FooterApp from "./footer";
import ContentApp from "./content";
import { useRouter } from 'next/router';
import { useDispatch, useSelector, connect } from 'react-redux';
import { setUser, setListadosCategorias } from "src/redux/reducers/globalSlice";
import SkeletonApp from "./skeleton";


const LayoutApp = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const token = process.browser && JSON.parse(localStorage.getItem("token_sigai"))
    const { dataUser, loadingGeneral, error } = useSelector((stateData) => stateData.global)

    const validationUser = () => {
        !token && router.push("/login");

        if (token && dataUser.token !== token) {
            dispatch(setUser(token))
            dispatch(setListadosCategorias())
        }
    }

    useEffect(() => {
        validationUser();
    }, []);

    useEffect(() => {
        error.dataUser && validationUser();
    }, [error.dataUser]);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Head>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                {/* <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />  */}
                <meta httpEquiv="Content-Security-Policy: default-src *://66.23.226.204" content="upgrade-insecure-requests" />
                <title>SIGAI</title>
            </Head>
            {loadingGeneral || !token ? (
                <SkeletonApp />
            ) : (
                <>
                    <SidebarApp />
                    <Layout className="site-layout">
                        <HeaderApp {...props}/>
                        <ContentApp {...props}/>
                        <FooterApp />
                    </Layout>
                </>
            )}
        </Layout>
    );
}

const mapStateToProps = (state) => ({
    state,
});

const mapDispatchToProps = {
    // logout,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(React.memo(LayoutApp));
