// API de Preços de Materiais Recicláveis
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Preços atualizados para Teresópolis, RJ (valores médios 2025)
  const wastePrices = {
    papel: {
      name: 'Papel/Papelão',
      pricePerKg: 0.65,
      unit: 'kg',
      co2Factor: 3.2,
      description: 'Jornais, revistas, caixas, papelão limpo e seco',
      tips: 'Não misture com papel higiênico, guardanapos usados ou papel engordurado',
      icon: '📄'
    },
    plastico: {
      name: 'Plástico',
      pricePerKg: 1.40,
      unit: 'kg',
      co2Factor: 2.8,
      description: 'Garrafas PET, embalagens plásticas limpas',
      tips: 'Lave as embalagens e remova tampas e rótulos quando possível',
      icon: '♻️'
    },
    metal: {
      name: 'Metal',
      pricePerKg: 6.20,
      unit: 'kg',
      co2Factor: 8.1,
      description: 'Latas de alumínio, ferro, cobre',
      tips: 'Amasse as latas para economizar espaço. Metal tem alto valor!',
      icon: '🥫'
    },
    vidro: {
      name: 'Vidro',
      pricePerKg: 0.25,
      unit: 'kg',
      co2Factor: 1.2,
      description: 'Garrafas, potes, frascos sem tampa',
      tips: 'Cuidado ao manusear. Embale com jornal se quebrado',
      icon: '🍾'
    },
    eletronicos: {
      name: 'Eletrônicos',
      pricePerKg: 28.00,
      unit: 'kg',
      co2Factor: 25.5,
      description: 'Celulares, computadores, TVs, cabos',
      tips: 'Apague todos os dados pessoais antes de descartar',
      icon: '📱'
    },
    moveis: {
      name: 'Móveis',
      pricePerKg: 0,
      unit: 'unidade',
      co2Factor: 15.0,
      description: 'Sofás, mesas, cadeiras, armários',
      tips: 'Agende coleta. Pode ser doado se estiver em bom estado',
      icon: '🪑',
      scheduledPickupOnly: true
    },
    oleo: {
      name: 'Óleo de Cozinha',
      pricePerKg: 1.80,
      unit: 'litro',
      co2Factor: 2.5,
      description: 'Óleo de cozinha usado',
      tips: 'Armazene em garrafa PET. 1 litro de óleo contamina 1 milhão de litros de água!',
      icon: '🛢️'
    }
  };

  const { material } = req.query;

  if (material && wastePrices[material]) {
    return res.status(200).json({
      success: true,
      material: wastePrices[material]
    });
  }

  return res.status(200).json({
    success: true,
    materials: wastePrices,
    lastUpdated: new Date().toISOString(),
    location: 'Teresópolis, RJ ❤️'
  });
}