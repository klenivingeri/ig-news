import { useSession, signIn } from 'next-auth/client'
import styles from './styles.module.scss'

interface SubscribeButtonProps {
    priceId: string
}

export function SubscribeButton({priceId}:SubscribeButtonProps) {
    const [ session ]  = useSession()
    function hundleSubscribe(){

        if(!session) {
            signIn('github');
            return;
        }
        //Criação da chekout session

    }
    
    return(
        <button
            type="button"
            className={styles.subscribeButton}
            onClick={hundleSubscribe}
        >
        
        Subscribe now

        </button>
    )
}