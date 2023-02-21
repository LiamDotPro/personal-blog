import Head from 'next/head'
import Image from 'next/image'
import {Inter} from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Hero from "@/components/Hero/Hero";
import Services from "@/components/Services/Services";

export default function Home() {
    return (
        <>
            <Head>
                <title>Liam Read - Technical lead, Fullstack developer and Interim technical recruiter based in
                    Curacao</title>
                <meta name="description"
                      content="More than 10 years experience in software development, technical consultancy and recruitment"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={styles.main}>
                <Hero/>
                <Services/>
            </main>
        </>
    )
}
