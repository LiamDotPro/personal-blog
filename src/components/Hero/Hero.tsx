import React, {FC} from "react";
import Image from "next/image";
import MyImage from '../../../public/me-min.jpg'

const Hero: FC = () => {
    return (
        <div className="relative bg-white">
            <div className="mx-auto max-w-7xl">
                <div className="relative z-10 lg:w-full lg:max-w-2xl">
                    <svg
                        className="absolute inset-y-0 right-8 hidden h-full w-80 translate-x-1/2 transform fill-white lg:block"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                    >
                        <polygon points="0,0 90,0 50,100 0,100"/>
                    </svg>

                    <div className="relative py-32 px-6 sm:py-40 lg:py-56 lg:px-8 lg:pr-0">
                        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
                            <div className="hidden sm:mb-10 sm:flex">
                                <div
                                    className="relative rounded-full py-1 px-3 text-sm leading-6 text-gray-500 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                                    I&apos;m currently based on the lovely small island of Curacao 🇨🇼
                                    <a href="https://www.google.com/maps/place/Cura%C3%A7ao/data=!4m2!3m1!1s0x8e849dbe62c7fdc7:0xfc7f9228dbc64723?sa=X&ved=2ahUKEwi9pNqu56T9AhVJi7AFHW1mCjMQ8gF6BAgIEAI"
                                       className="ml-1 whitespace-nowrap font-semibold text-indigo-600">
                                        <span className="absolute inset-0" aria-hidden="true"/>
                                        Google Maps<span aria-hidden="true">&rarr;</span>
                                    </a>
                                </div>
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                                Technical lead, Fullstack developer and Interim Technical recruiter.
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                I have more than 10 years experience leading and building products for small to medium
                                size businesses and startups. I&apos;ve built product teams, been a mentor, installed
                                devops/project management, recruited ambitious developers and got Sh*T done.
                            </p>
                            <div className="mt-10 flex items-center gap-x-6">
                                <a
                                    href="#"
                                    className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    My Services
                                </a>
                                <a href="#" className="text-base font-semibold leading-7 text-gray-900">
                                    Why I&apos;m a good fit <span aria-hidden="true">→</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                <Image src={MyImage} alt={"A photo of Liam Read"}
                       className="aspect-[3/2] object-cover lg:aspect-auto lg:h-full lg:w-full"/>

            </div>
        </div>
    )
}

export default Hero
