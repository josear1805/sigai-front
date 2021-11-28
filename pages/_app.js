import '../styles/globals.scss'
import { Provider } from 'react-redux'
import { store } from 'src/redux/store'

const MyApp = ({ Component, pageProps }) => {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    )
}

export default MyApp
