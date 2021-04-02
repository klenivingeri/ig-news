import  {AppProps} from  'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp



// importar import  {AppProps} from  'next/app' para evitar possiveis erros