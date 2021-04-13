import Link from 'next/link'

import { SignInButton } from '../SignInButton'
import styles from './styles.module.scss'

export function Header(){
    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/logo.svg" alt="ig.news"/>
                <nav>
                    <Link href="/">
                    <a className={styles.active}>Home</a>
                    </Link>
                    
                    <Link  href="/posts" prefetch>
                    <a>Posts</a>
                    </Link>

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
 */