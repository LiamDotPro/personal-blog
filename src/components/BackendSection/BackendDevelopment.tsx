import { WrenchScrewdriverIcon, DocumentIcon, ServerIcon, CogIcon } from '@heroicons/react/20/solid'
import LaptopImage from '../../../public/laptop.jpg'
import Image from "next/image";

const features = [
    {
        name: 'JS/TS based.',
        description:
            'I can help you setup or extend the functionality of your Node or Go based backend services and provide guidance on best practices.',
        icon: WrenchScrewdriverIcon,
    },
    {
        name: 'SQL or NoSQL.',
        description: 'I have experience working with both SQL and NoSQL databases, if you use an ORM or write raw SQL, I can help boost productivity.',
        icon: DocumentIcon,
    },
    {
        name: '3rd party, party.',
        description: 'I can help with setting up 3rd party solutions like Stripe, Paypal, Auth0, Netlify Forms, Salesforce and much more.',
        icon: CogIcon,
    },
    {
        name: 'Server or Serverless?',
        description: 'I can help you decide if a server or serverless solution is best for your project and help you get setup.',
        icon: ServerIcon,
    }
]

export default function Example() {
    return (
        <div className="overflow-hidden bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    <div className="lg:pr-8 lg:pt-4">
                        <div className="lg:max-w-lg">
                            <h2 className="text-base font-semibold leading-7 text-indigo-600">Robust API development</h2>
                            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Backend Development</p>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                Creating robust, secure and modern backend APIs that work in harmony with your frontend. I have experience working primarily with Node and Golang, providing traditional rest endpoints or graphql.
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
                    <Image
                        src={LaptopImage}
                        alt="Backend Code Image"
                        className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
                        width={2432}
                        height={1442}
                    />
                </div>
            </div>
        </div>
    )
}