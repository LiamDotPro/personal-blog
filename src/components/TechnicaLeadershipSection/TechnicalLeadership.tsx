import { UserIcon, CalendarIcon, BriefcaseIcon, CodeBracketIcon} from '@heroicons/react/20/solid'
import Image from "next/image";
import LeadershipMain from "../../../public/leadership-main.jpg";
import React from "react";

const features = [
    {
        name: 'People First.',
        description:
            'My success in delivering large technical projects comes from building a team of smart and dedicated developers and motivating them to deliver on goals and having a fun time along the way.',
        icon: UserIcon,
    },
    {
        name: 'Planning.',
        description: 'Software projects can sometimes feel like castles built on sand, improving project practices such as correct project management and solid technical leadership save time and money.',
        icon: CalendarIcon,
    },
    {
        name: 'Technical Accountability.',
        description: `I've often been challenged with new concepts and non programing related tasks, I'm always happy to learn new things and take on new challenges and build this into my teams.`,
        icon: CodeBracketIcon,
    },
    {
        name: 'Get Stuff Done Attitude.',
        description: `I'm a firm believer in getting things done, With a strong focus on delivery and a can do attitude I can help your team deliver on time and on budget.`,
        icon: BriefcaseIcon,
    },
]

export default function Example() {
    return (
        <div className="overflow-hidden bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    <div className="lg:ml-auto lg:pl-4 lg:pt-4">
                        <div className="lg:max-w-lg">
                            <h2 className="text-base font-semibold leading-7 text-indigo-600">People, Teams, Projects</h2>
                            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Technical Leadership</p>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                I&apos;ve been fortunate enough to experience building out teams, products and websites for some big companies and startups. Using this experience I can help lead your team to success.
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
                            src={LeadershipMain}
                            alt="Leadership Main Screenshot"
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