
import {Header} from '../components/Header'
import  {AppProps} from  'next/app'
import '../styles/global.scss'
function MyApp({ Component, pageProps }: AppProps) {
  return (
        <>
          <Header/>
          <Component {...pageProps} />
        </>
  )  
}

export default MyApp



// importar import  {AppProps} from  'next/app' para evitar possiveis erros