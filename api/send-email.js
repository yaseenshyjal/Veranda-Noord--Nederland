export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const data = req.body;

  const message = `
Naam: ${data.name}
Email: ${data.email}
Telefoon: ${data.phone}
Type: ${data.goot}
Kleur: ${data.kleur}
Dak: ${data.dak}
Afmetingen: ${data.breedte} x ${data.diepte}
Zonwering: ${data.zonwering}
`;

  // Optional: Send using an email service like nodemailer or Resend.com
  console.log("✉️ Email content:\n", message);

  // Simulate success
  res.status(200).json({ success: true });
}
