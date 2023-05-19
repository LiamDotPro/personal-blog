import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

const sendEmail = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { firstName, lastName, company, email, message, telephone } = req.body;

        // Create a Nodemailer transporter
        const transporter = nodemailer.createTransport({
            host: 'server129.web-hosting.com',
            port: 465,
            secure: true,
            auth: {
                user: 'liam@liam.pro',
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        // Define the email options
        const mailOptions = {
            from: 'liam@liam.pro',
            to: 'liam@liam.pro',
            subject: 'New Form Submission - liam.pro',
            text: `
        Name: ${firstName} ${lastName}
        Email: ${email}
        Company: ${company}
        Telephone: ${telephone}
        Message: ${message}
      `,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        // Return a success response
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to send email' });
    }
};

export default sendEmail;