import { UsersIcon, EyeIcon, DocumentPlusIcon } from '@heroicons/react/20/solid'
import InterimImage from '../../../public/interim-deskotp.jpg'
import Image from "next/image";

const features = [
    {
        name: 'Why not internal?',
        description:
            'Often using a technical lead or senior developer to interview candidates can be a waste of time and money. Let your developers focus on what they do best, building your product.',
        icon: UsersIcon,
    },
    {
        name: 'Vision and Scaling.',
        description: `I've helped scale a very small company to over 200 employees and conducted hundreds of interviews. I can help you scale your company and find the right people for the job.`,
        icon: EyeIcon,
    },
    {
        name: 'Assessments and Code Reviews.',
        description: `I can help you assess your current team and help you find the right people to fill the gaps. I can also help you with code reviews and producing unique technical assessments.`,
        icon: DocumentPlusIcon,
    }
]

export default function Example() {
    return (
        <div className="overflow-hidden bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    <div className="lg:pr-8 lg:pt-4">
                        <div className="lg:max-w-lg">
                            <h2 className="text-base font-semibold leading-7 text-indigo-600">The Right People for the job</h2>
                            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Interim Technical Recruitment</p>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                               Save time and money by letting me interview and filter potential new hires for your company. Leverage years of actual development experience and hundreds of interviews for a excellent experience for you and your candidates.
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
                        src={InterimImage}
                        alt="Interim recuitment Image"
                        className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
                        width={2432}
                        height={1442}
                    />
                </div>
            </div>
        </div>
    )
}