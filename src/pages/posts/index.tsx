import { GetStaticProps } from 'next';
import Head from 'next/head';
import { getPrismicClient } from '../../services/prismic';
import Prismic from '@prismicio/client'
import styles from './styles.module.scss';
import { RichText } from 'prismic-dom';


type Post ={ 
    slug: string;
    title: string;
    excerpt: string;
    updatedAt: string
}

interface PostsProps {
    posts: Post[]
}


export default function Posts( { posts }: PostsProps) {
    return (
        <>
        <Head>
            <title> Posts | Ignews </title>
        </Head>
        <main className={styles.container}>
            <div className={styles.posts}>
                {posts.map( post =>(

                    <a key={post.slug} href="#">
                    <time>{post.updatedAt}</time>
                    <strong>{post.title}</strong>
                    <p>{post.excerpt}</p>
                    </a>

                ))}
            </div>
        </main>
        

        </>
    );
}


export const getStaticProps: GetStaticProps = async() =>{
    const prismic = getPrismicClient()

    const response = await prismic.query([
        Prismic.predicates.at('document.type','publication')
    ],{
        fetch: ['publication.title', 'publication.content'],
        pageSize: 100,
    })


    const posts = response.results.map(post => {
        return {
            slug: post.id,
            title: RichText.asText(post.data.title),
            excerpt:post.data.content.find( content => content.type == 'paragraph')?.text ?? '', //1
            updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR',{
                day: '2-digit',
                month: 'long',
                year: 'numeric'

            })
        }
    })


    //console.log(JSON.stringify(response,null,2))
    return{
        props:{posts}
    }
}



/**
 * 1 ) caso não localize o primeiro paragrafo, eu não quero o text, quero que o retorno seja vazio
 */