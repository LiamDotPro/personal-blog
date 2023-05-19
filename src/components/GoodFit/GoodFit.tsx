import {FC} from "react";

const faqs = [
    {
        question: 'Are you willing to learn X technology?',
        answer:
            `I'm passionate about technology learning in general and providing the overall scope of a project is not to far from my wheel house I'm generally happy to get stuck in and learn something new to accommodate my clients.`,
    },
    {
        question: 'What is your hourly rate?',
        answer:
            `My hourly rate is ~$50 per hour, I'm happy to provide a fixed price for a project if you have a clear scope of work.`,
    },
    {
        question: 'What is your availability?',
        answer:
            `I'm currently available for new projects, please contact me to discuss your requirements. I'm located in the EST timezone, but can accommodate most timezones.`,
    },
    {
        question: 'What is your preferred tech stack?',
        answer:
            `I'm a big fan of the JAM stack, I love working with React, NextJS, TailwindCSS and Typescript. I'm also a big fan of AWS and serverless architecture.`,
    },
    {
        question: 'What is your preferred method of contact?',
        answer:
            `I'm happy to chat via email, phone or video call, whatever works best for you.`,
    },
    {
        question: 'What is your preferred payment method?',
        answer:
            `I prefer to be paid via bank transfer, but I'm happy to accept payment via PayPal or Stripe.`,
    },
    {
        question: 'What is your preferred contract length?',
        answer:
            `I'm happy to work on a project for as long as you need me, I'm also happy to work on a retainer basis if you have ongoing work.`,
    },
    {
        question: 'Which industries do you have experience in?',
        answer:
            `I've worked in a variety of industries, including finance, crypto, e-commerce, marketing, real estate and more.`,
    }
]

const Example:FC<{
    scrollFunc: (refAsString: string) => void
}> = ({
    scrollFunc
                    }) => {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl px-6 py-24 sm:pt-32 lg:px-8 lg:py-40">
                <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                    <div className="lg:col-span-5">
                        <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">Frequently asked
                            questions</h2>
                        <p className="mt-4 text-base leading-7 text-gray-600">
                            Can’t find the answer you’re looking for? Please fill out {' '}
                            <button onClick={() =>  scrollFunc('contactFormRef')} className="font-semibold text-indigo-600 hover:text-indigo-500">
                                my contact form
                            </button>{' '}
                            to talk about how I can fit into your next project.
                        </p>
                    </div>
                    <div className="mt-10 lg:col-span-7 lg:mt-0">
                        <dl className="space-y-10">
                            {faqs.map((faq) => (
                                <div key={faq.question}>
                                    <dt className="text-base font-semibold leading-7 text-gray-900">{faq.question}</dt>
                                    <dd className="mt-2 text-base leading-7 text-gray-600">{faq.answer}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Example