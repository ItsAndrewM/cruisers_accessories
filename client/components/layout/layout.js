import Head from "next/head";
import Image from "next/image";
import styles from "./layout.module.css";
import utilStyles from "../../styles/utils.module.css";
import Link from "next/link";
import Script from "next/script";
import { builder, BuilderComponent } from '@builder.io/react'

export const siteTitle = "Cruisers Accessories";

export async function getStaticProps(context) {
    const links = await builder.get('navigation-links', {
        url: context.resolvedUrl
        // You can use options for queries, sorting, and targeting here
        // https://github.com/BuilderIO/builder/blob/main/packages/core/docs/interfaces/GetContentOptions.md
    }).promise();

    return {
        props: {
            links: links || null,
        },
        revalidate: 5,
    };
}

const Layout = ({ children, home, links }) => {
    console.log(links)
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta name="description" content="Cruisers Accessories" />
                <meta
                    property="og:image"
                    content={`https://og-image.vercel.app/${encodeURI(
                        siteTitle
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <header>
                <nav>
                    {links.data.links.map((link, index) => (
                        <a key={index} href={link.data.url}>
                            {link.data.label}
                        </a>
                    ))}
                </nav>
            </header>
            <main className={styles.main}>{children}</main>
            {!home && (
                <div className={styles.backToHome}>
                    <Link href="/" className={styles.smallLink}>
                        ← Back to home
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Layout;
