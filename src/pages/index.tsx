import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Hero from "@/components/Hero/Hero";
import Services from "@/components/Services/Services";
import React, {RefObject, useRef} from "react";
import FrontendDevelopment from '@/components/FrontendSection/FrontendDevelopment';
import BackendDevelopment from '@/components/BackendSection/BackendDevelopment';
import TechnicalLeadership from '@/components/TechnicaLeadershipSection/TechnicalLeadership';
import InterimTechnicalRecuitment from '@/components/InterimTechnicalRecuitment/InterimTechnicalRecuitment';
import ContactForm from '@/components/ContactForm/ContactForm';
import GoodFit from '@/components/GoodFit/GoodFit';
export default function Home() {

    const frontendRef: RefObject<HTMLDivElement> = useRef(null);
    const backendRef: RefObject<HTMLDivElement> = useRef(null);
    const technicalLeadershipRef: RefObject<HTMLDivElement> = useRef(null);
    const interimTechnicalRecuitmentRef: RefObject<HTMLDivElement> = useRef(null);
    const contactFormRef: RefObject<HTMLDivElement> = useRef(null);
    const servicesRef: RefObject<HTMLDivElement> = useRef(null);
    const goodFitRef: RefObject<HTMLDivElement> = useRef(null);

    const scrollTowardsUsingRef = (refAsString: string) => {
        if (refAsString === "frontendRef") {
            if (frontendRef.current)
                frontendRef.current.scrollIntoView({behavior: "smooth"});
        } else if (refAsString === "backendRef") {
            if (backendRef.current) backendRef.current.scrollIntoView({behavior: "smooth"});
        } else if (refAsString === "technicalLeadershipRef") {
            if (technicalLeadershipRef.current) technicalLeadershipRef.current.scrollIntoView({behavior: "smooth"});
        } else if (refAsString === "interimTechnicalRecuitmentRef") {
            if (interimTechnicalRecuitmentRef.current) interimTechnicalRecuitmentRef.current.scrollIntoView({behavior: "smooth"});
        } else if (refAsString === "contactFormRef") {
            if (contactFormRef.current) contactFormRef.current.scrollIntoView({behavior: "smooth"});
        } else if (refAsString === "servicesRef") {
            if (servicesRef.current) servicesRef.current.scrollIntoView({behavior: "smooth"});
        } else if (refAsString === "goodFitRef") {
            if (goodFitRef.current) goodFitRef.current.scrollIntoView({behavior: "smooth"});
        }

    }

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
                <Hero scrollFunc={scrollTowardsUsingRef}/>
                <div ref={servicesRef}><Services scrollFunc={scrollTowardsUsingRef}/></div>
                <div ref={frontendRef}><FrontendDevelopment/></div>
                <div ref={backendRef}><BackendDevelopment/></div>
                <div ref={technicalLeadershipRef}><TechnicalLeadership/></div>
                <div ref={interimTechnicalRecuitmentRef}><InterimTechnicalRecuitment/></div>
                <div ref={goodFitRef}><GoodFit scrollFunc={scrollTowardsUsingRef}/></div>
                <div ref={contactFormRef}><ContactForm/></div>
            </main>
        </>
    )
}
