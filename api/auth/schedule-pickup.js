// API de Agendamento de Coleta
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
    const { userId, material, weight, address, phone, date, notes } = req.body;

    if (!material || !weight || !address || !phone || !date) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const pickup = {
      id: Date.now().toString(),
      userId: userId || 'guest',
      material,
      weight,
      address,
      phone,
      scheduledDate: date,
      notes: notes || '',
      status: 'pending',
      createdAt: new Date().toISOString(),
      estimatedValue: calculateValue(material, weight)
    };

    // Em produção, salvar no banco de dados

    return res.status(201).json({
      success: true,
      message: `Coleta agendada com sucesso para ${new Date(date).toLocaleDateString('pt-BR')}!`,
whatsappMessage: `Olá! Agendei uma coleta pelo ReciclaRenda. Material: ${material}, Peso: ${weight}kg, Endereço: ${address}, Data: ${new Date(date).toLocaleDateString('pt-BR')}`
    });

  } catch (error) {
    return res.status(500).json({ error: 'Erro ao agendar coleta', details: error.message });
  }
}

function calculateValue(material, weight) {
  const prices = {
    papel: 0.65,
    plastico: 1.40,
    metal: 6.20,
    vidro: 0.25,
    eletronicos: 28.00,
    moveis: 0,
    oleo: 1.80
  };
  return (prices[material] || 0) * weight;
}