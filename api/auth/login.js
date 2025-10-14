// API de Login
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    // Simular autenticação (em produção, verificar hash de senha)
    const user = {
      id: '12345',
      name: 'Marcos Amorim Jr.',
      email: 'marcosamorimjr@gmail.com',
      phone: '21986976714',
      address: 'Teresópolis, RJ',
      type: 'citizen',
      points: 1250,
      totalRecycled: 145.5,
      co2Saved: 342.8
    };

    const token = Buffer.from(JSON.stringify({ userId: user.id, email: user.email })).toString('base64');

    return res.status(200).json({
      success: true,
      message: 'Login realizado com sucesso! ❤️',
      user,
      token
    });

  } catch (error) {
    return res.status(500).json({ error: 'Erro ao fazer login', details: error.message });
  }
}