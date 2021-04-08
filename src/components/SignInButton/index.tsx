import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

import { signIn, signOut, useSession } from 'next-auth/client' //função que faz o login

import  styles from './styles.module.scss'
export function SignInButton() {

    const [ session ] =  useSession() // se o usuario não estiver logado retorna null

    console.log(session, 'haha');
    return session ?(
        <button 
        type="button"
            className={styles.signInButton}
            onClick={() => signOut()}>
            <FaGithub color="#04d361" />
            {session.user.name}
            <FiX color="#737380" className={styles.closeIcon} />
        </button>
    ) : (
        <button 
        type="button"
            className={styles.signInButton}
            onClick={() => signIn('github')}>
            <FaGithub color="#eba417" />
            Sign in with Github
        </button>
    )
}







/**
 * 
 * 1 ) o return já é algo condicionar.
 * 
 * 
 * 
 * 
 * 
 * 
 */