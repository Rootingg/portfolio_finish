import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // ou ton serveur SMTP
  port: 587,
  secure: false, // true pour 465, false pour les autres ports
  auth: {
    user: 'lucas.torres@oteria.fr', // ton email
    pass: 'ivno pjbr ocku zmsa' // ton mot de passe d'application
  }
});

export const sendContactEmail = async (name: string, email: string, message: string) => {
  const mailOptions = {
    from: email,
    to: 'lucas.torres@oteria.fr',
    subject: `Nouveau message de contact de ${name}`,
    html: `
      <h2>Nouveau message de contact</h2>
      <p><strong>Nom:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `
  };

  await transporter.sendMail(mailOptions);
};