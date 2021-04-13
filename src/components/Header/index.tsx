import { SignInButton } from '../SignInButton'
import styles from './styles.module.scss'
import { ActiveLink } from '../ActiveLink';

export function Header(){

    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/logo.svg" alt="ig.news"/>
                <nav>
                    {console.log(styles.active, 'haha')}
                    <ActiveLink activeClassName={styles.active} href="/">
                        <a>Home</a>
                    </ActiveLink>
                    
                    <ActiveLink activeClassName={styles.active} href="/posts">
                        <a>Posts</a>
                    </ActiveLink>

                </nav>
                <SignInButton />
            </div>

        </header>
    );
}


/**
 * 
 *  Utilizando Next não precisa fazer a importação
 *  mas se quiser pode instalar o pacote o nextimages
 * 
 *  Quando utilizamos apenas a ancora <a> toda as vezes que trocamos de paginas
 *  ela carrega todos os arquivos novamente.
 *  Quando utilizamos o <Link> reutilizamos oque já foi carregado, e ganhamos em performace. SPA
 *  Conseguimos acompanhar no Inspecionar => Network
 * 
 *  prefetch : deixa a pagina pre-carregada.
 * 
 * 
 *  ActiveLink entende que o ActiveClassName={} corresponde a classname={}
 */
