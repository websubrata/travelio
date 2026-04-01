import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {
      name,
      email,
      contact_number,
      preferred_country,
      course_type,
    } = await req.json();

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use false for TLS
      auth: {
        user: process.env.EMAIL_SENDER_EMAIL, // Your email address
        pass: process.env.EMAIL_SENDER_APP_PASSWORD, // Your email password or app password
      },
    });

    // Render the EJS template

    const templatePath = path.join(
      process.cwd(),
      "public",
      "templates",
      "study-abroad-email-template.ejs"
    );

    const html = await ejs.renderFile(templatePath, {
      host_name: process.env.HOST_NAME,
      name,
      email,
      contact_number,
      preferred_country,
      course_type,
    });

    // Send the email
    const info = await transporter.sendMail({
      from: `"Study Abroad - Travlio" <${process.env.EMAIL_SENDER_EMAIL}>`, // Sender address
      to: "studyabroad@travlio.in,subrata.ash@gmail.com", // Recipient address
      subject: "Enquiry For Study Abroad - Travlio", // Subject
      html, // Rendered HTML content
    });

    return new Response(
      JSON.stringify({ message: "Email sent successfully!", info }),
      { status: 200 }
    );
  } catch (error) {
    // console.error("Error sending email:", error);
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
    });
  }
}
