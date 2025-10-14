// API de Contato
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Nome, email e mensagem são obrigatórios' });
    }

    // Em produção, enviar email via SendGrid, Resend, etc.
    const contact = {
      id: Date.now().toString(),
      name,
      email,
      subject: subject || 'Contato via ReciclaRenda',
      message,
      createdAt: new Date().toISOString(),
      status: 'received'
    };

    return res.status(200).json({
      success: true,
      message: 'Mensagem enviada com sucesso! Responderemos em breve. ❤️',
      contact
    });

  } catch (error) {
    return res.status(500).json({ error: 'Erro ao enviar mensagem', details: error.message });
  }
}