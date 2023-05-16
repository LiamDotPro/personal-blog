import { UserIcon, EyeIcon, PaintBrushIcon } from '@heroicons/react/20/solid'
import Image from "next/image";
import BitvavoDesktop from "../../../public/bitvavo-desktop.png";
import React from "react";

const features = [
    {
        name: 'Modern Frameworks with Typescript.',
        description:
            'I have a wealth of experience working with React, Vue and Next and the surrounding ecosystem, building a great user experience is at the core of my frontend services.',
        icon: EyeIcon,
    },
    {
        name: 'Pixel Perfect Design.',
        description: 'Ensuring the design matches the code is a priority when I build a new component for my clients, the look and feel is as important as the code behind it.',
        icon: PaintBrushIcon,
    },
    {
        name: 'User Experience Focused.',
        description: 'I build products and websites for people, not for search engines or robots, I ensure that the user experience is at the forefront of my mind when building a new product.',
        icon: UserIcon,
    },
]

export default function Example() {
    return (
        <div className="overflow-hidden bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    <div className="lg:ml-auto lg:pl-4 lg:pt-4">
                        <div className="lg:max-w-lg">
                            <h2 className="text-base font-semibold leading-7 text-indigo-600">Awesome UI</h2>
                            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Frontend Development</p>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                I&apos;ve worked on many projects over the years, from small brochure sites to large scale web applications, I&apos;m confident I can help you with your next project.
                            </p>
                            <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                                {features.map((feature) => (
                                    <div key={feature.name} className="relative pl-9">
                                        <dt className="inline font-semibold text-gray-900">
                                            <feature.icon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" />
                                            {feature.name}
                                        </dt>{' '}
                                        <dd className="inline">{feature.description}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                    <div className="flex items-start justify-end lg:order-first">
                        <Image
                            src={BitvavoDesktop}
                            alt="Bitvavo Desktop Screenshot"
                            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
                            width={2432}
                            height={1442}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}