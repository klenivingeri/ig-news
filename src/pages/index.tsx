import { GetStaticProps } from 'next' //SSG
import { stripe } from '../services/stripe'

import styles from './home.module.scss'
import Head from 'next/head'
import { SubscribeButton } from '../components/SubscribeButton'




interface HomeProps{
  product:{
    priceId: string,
    amount: number
  }
}


export default function Home({ product }:HomeProps) {
 // console.log(product) //4
  return (
      <>  
        <Head>
          <title>Hme | ig.news</title>
        </Head>
       <main className={styles.contentContainer}>
         <section className={styles.hero}>
         <span>👏 Hey, Welcome</span>
         <h1>News about the <span>React</span> world</h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
         </section>
         <img src="/images/avatar.svg" alt="girl coding"/>
       </main>
      </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1IdEk1IA6LvOAWiPFVCarI09',{ //1
    expand: ['product']//2
  })

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100), //3
  };
  return {
    props:{
      product
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}




// Client-side
// Server-side Rendering
// Static Site Generation

// Post o blog 

// login perfil (SSR)
// Conteudo (SSG) *retorna static pra todo mundo
// Comentátios (Client-side) *retorna durante o processo



/** Stripe( API de pagamentos)
 *  
 * 1 ) .prices.retrieve('price_1IdEk1IA6LvOAWiPFVCarI09') 
 *      .retrieve retorna um unico preço
 * 
 * 2 ) expand: ['product'] retorna todas as informações daquele produto
 *     neste caso ele não é nessesario, mas vai ficar ai só pra não esquecer dele
 *  
 * 3 ) unit_amount pega o preço unitario(inteiro) do obj / 100 para ter o preço em centavos
 *     para facilitar a manipulaçao
 * 
 * 4 ) retorno do getStaticProps
 * 
 * 
 */


/** SSR(Server-side Rendering)
 *  Fazendo chamadas http usando SSR(Server-side Rendering)
 *  Ele não pode ser chamado em componente, tem que ser chamado na pagina
 *  e depois passado para o component.
 *  
 *  ** atenção:  usamos o SSR para paginas dinamica.
 *  Exemplo: Retornar informações do usuario logado.
 */


/** SSR(Static Site Generation)
 *  Quando uma pessoa acessa pela primeira vez a pagina, o next gera um html
 *  estatico da pagina, e retorna a pagina para o client, sem precisa fazer o processo novamente
 *  precisamos alterar de getServerSideProps para GetStaticProps e acresentar no return o,
 *  revalidate: 60 * 60 * 24, //hours atualiza a pagina estatica a cada 24hr.
 * 
 * ** atenção: usamos o SSG para paginas Static, onde não precisamo trocar informações com frequencia.
 * Exemplo: SSG for aplicado em uma Perfil de usuario, mesmo que outros façam o login, vai sempre aparece o perfil do primeiro usuario que logou.
 * 
 */


/* 
CSR(Client-side Rendering) 
const [product] = useState()

useEffect(() => {
  chamadaapi()
})
// useEffect só faz a chamada da Api pelo browser
isso faz com que a pagina seja carregada e depois a Api carrega, 
isso não deixa o deixa as ferramentas de pesquisa acha o conteudo.
porem usando SSR a pagina só aparece depois que o servidor carrega todo conteúdo

*/