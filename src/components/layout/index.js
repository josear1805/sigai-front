import { useState } from 'react';
import { Layout } from 'antd';
import Head from 'next/head';
import SidebarApp from "./sidebar";
import HeaderApp from "./header";
import FooterApp from "./footer";
import ContentApp from "./content";

const LayoutApp = (props) => {

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Head>
            {/* <meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> */}
                {/* <meta name="viewport" content="initial-scale=1.0, width=device-width" /> */}
                    <title>SIGAI</title>
            </Head>
            <SidebarApp />
            <Layout className="site-layout">
                <HeaderApp />
                <ContentApp {...props}/>
                <FooterApp />
            </Layout>
        </Layout>
    );
}

export default LayoutApp