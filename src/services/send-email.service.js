
//----------------------
import nodemailer from "nodemailer";


export const sendEmailService = async ({
  to,
  subject = "No Reply",
  textMessage = "",
  htmlMessage = "",
  attachments = [],
} = {}) => {
  // configer email ( transporter)
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
      user: "mernabassem21@gmail.com", 
      pass: "yajvbppxnvvpitbe", 
    },
  });
  // configer message ( mail )
  const info = await transporter.sendMail({
    from: "Active Email <mernabassem21@gmail.com>",
    to,
    subject,
    text: textMessage,
    html: htmlMessage,
    attachments,
  });

  return info;
};
