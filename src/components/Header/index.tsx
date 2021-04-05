import { SignInButton } from '../SignInButton'
import styles from './styles.module.scss'

export function Header(){
    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/logo.svg" alt="ig.news"/>
                <nav>
                    <a className={styles.active}>Home</a>
                    <a>Posts</a>

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
 */