// API de Registro de Usuários
export default async function handler(req, res) {
  // CORS headers
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
    const { name, email, password, phone, address, type } = req.body;

    // Validações básicas
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });
    }

    // Simular salvamento (em produção, conectar com Supabase ou Firebase)
    const user = {
      id: Date.now().toString(),
      name,
      email,
      phone: phone || '',
      address: address || '',
      type: type || 'citizen',
      createdAt: new Date().toISOString(),
      points: 0,
      totalRecycled: 0,
      co2Saved: 0
    };

    // Token simples (em produção, usar JWT)
    const token = Buffer.from(JSON.stringify({ userId: user.id, email: user.email })).toString('base64');

    return res.status(201).json({
      success: true,
      message: 'Usuário registrado com sucesso! ❤️',
      user,
      token
    });

  } catch (error) {
    return res.status(500).json({ error: 'Erro ao registrar usuário', details: error.message });
  }
}