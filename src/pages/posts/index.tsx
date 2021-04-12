import Head from 'next/head';
import styles from './styles.module.scss';

export default function Posts() {
    return (
        <>
        <Head>
            <title> Posts | Ignews </title>
        </Head>
        <main className={styles.container}>
            <div className={styles.posts}>
                <a href="#">
                    <time>12 março de 2021</time>
                    <strong> Creating a Monorepo with lorna & yarn workspaces</strong>
                    <p>Linguagens de baixo nível, como C, tem primitivas de gerenciamento de memória de baixo nível como malloc() e free()</p>
                </a>
                <a href="#">
                    <time>12 março de 2021</time>
                    <strong> Creating a Monorepo with lorna & yarn workspaces</strong>
                    <p>Linguagens de baixo nível, como C, tem primitivas de gerenciamento de memória de baixo nível como malloc() e free()</p>
                </a>
                <a href="#">
                    <time>12 março de 2021</time>
                    <strong> Creating a Monorepo with lorna & yarn workspaces</strong>
                    <p>Linguagens de baixo nível, como C, tem primitivas de gerenciamento de memória de baixo nível como malloc() e free()</p>
                </a>
            </div>
        </main>

        </>
    );
}