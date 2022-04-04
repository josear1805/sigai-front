// import '../styles/globals.scss'
// import { Provider } from 'react-redux'
// import { store } from 'src/redux/store'

// const MyApp = ({ Component, pageProps }) => {
//     return (
//         <Provider store={store}>
//             <Component {...pageProps} />
//         </Provider>
//     )
// }

// export default MyApp

import React from "react";
import { Provider } from "react-redux";
import { store } from "src/redux/store";
import { ConfigProvider } from "antd";
import es_ES from "antd/lib/locale/es_ES";

import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
    return (
        <ConfigProvider locale={es_ES}>
            <Provider store={store} locale={"es"}>
                <Component {...pageProps} />
            </Provider>
        </ConfigProvider>
    );
}

export default MyApp;