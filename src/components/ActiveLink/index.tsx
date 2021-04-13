import Link, {LinkProps } from 'next/link'
import { ReactElement , cloneElement} from 'react'
import { useRouter } from 'next/router';

interface ActiveLinkProps extends LinkProps{
    children: ReactElement // pega o elemento que etiver dentro do componente Activelink  <a>
    activeClassName: string
}

export function ActiveLink( {children, activeClassName, ...rest} : ActiveLinkProps){
    const  { asPath } = useRouter()
    
    console.log(activeClassName)
    const className = asPath == rest.href ? activeClassName : '';

    return(
        <Link {...rest}>
            {cloneElement(children, {
                className,
            })}
        </Link>
    );
}



/**
 *  cloneElement  deixar fazer o clone do elemento, alterar e devolver 
 */