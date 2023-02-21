import {FC} from "react";
import BitvavoImage from '../../../public/bitvavo.png'
import TerminalImage from '../../../public/terminal.jpg'
import ForHire from '../../../public/forhire.jpg'
import Leadership from '../../../public/leadership.jpg'
import Image from 'next/image'

const features = [
    {
        name: 'Frontend Development',
        description:
            `I have a wealth of experience building the user interfaces for a variety of different applications primarily with React/Vue and Typescript. I'm well versed in creating pixel perfect responsive code that make's your product shine. No matter if you use redux or prefer something like RxJS I can help you mold a great user experience.`,
        imageSrc: BitvavoImage,
        imageAlt: 'Bitvavo Homepage example site',
        imagePosition: 'top',
        callToActionText: 'Learn More'
    },
    {
        name: 'Backend Development',
        description:
            `I have lots of experience developing backend services in NodeJS with typescript alongside Apollo tooling or classical rest api services. I've already helped lots of companies to integrate payment solutions and deploy there applications into the cloud while being more efficient, performant and often at better cost. `,
        imageSrc: TerminalImage,
        imageAlt: 'Double stitched black canvas hook loop.',
        imagePosition: 'center',
        callToActionText: 'Learn More'
    },
    {
        name: 'Technical Leadership',
        description:
            `A product team is only as good as it's leadership, with me leading one of your teams you can be sure that your project is being managed by a steady hand. I can help to create, strategize and deliver on the key details of your project and optimise the growth of personnel withing your organization.`,
        imageSrc: Leadership,
        imageAlt: 'Black canvas body with chrome zipper and key ring.',
        imagePosition: 'center',
        callToActionText: 'Learn More'
    },
    {
        name: 'Interim Technical recruitment',
        description:
            `As an interim technical recruiter for your company or team you can outsource all of the effort required in interviewing and ensuring that possible candidates are high quality and match the profile your looking for. Don't waste valuable developer time when you can use someone with a proven track record of hiring the best talent.`,
        imageSrc: ForHire,
        imageAlt: 'Black canvas body with chrome zipper and key ring.',
        imagePosition: 'center',
        callToActionText: 'Learn More'
    },
]

const Services: FC = () => {
    return (
        <div className="bg-gray-100">
            <div className="mx-auto max-w-7xl py-24 sm:py-32 sm:px-2 lg:px-4">
                <div className="mx-auto max-w-2xl px-4 lg:max-w-none">
                    <div className="max-w-3xl">
                        <h2 className="font-semibold text-gray-500">Overview</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">My Services</p>
                        <p className="mt-4 text-gray-500">
                            Figuring out how a contractor will work inside your business can at times be difficult, here's a comprehensive list of the services of which I can deliver on.
                        </p>
                    </div>

                    <div className="mt-10 space-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16">
                        {features.map((feature) => (
                            <div
                                key={feature.name}
                                className="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8"
                            >
                                <div className="mt-6 lg:col-span-5 lg:mt-0 xl:col-span-4">
                                    <h3 className="text-lg font-medium text-gray-900">{feature.name}</h3>
                                    <p className="mt-2 text-sm text-gray-500">{feature.description}</p>
                                    <button
                                        type="button"
                                        className="mt-6 inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        {feature.callToActionText}
                                    </button>
                                </div>
                                <div className="flex-auto lg:col-span-6 xl:col-span-8">
                                    <div className="aspect-w-5 aspect-h-2 overflow-hidden rounded-lg bg-gray-100">
                                        <Image src={feature.imageSrc} alt={feature.imageAlt}
                                             className={`object-cover object-${feature.imagePosition}`}/>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Services
