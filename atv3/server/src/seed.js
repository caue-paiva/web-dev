const Potion = require('./models/Potion');

const seedPotions = async () => {
  try {
    const potions = [
      {
        nome: 'Poção de Cura Maior',
        descricao: 'Restaura completamente a saúde e cura ferimentos graves. Ingredientes: raiz de mandrágora, lágrimas de fênix.',
        imagemUrl: 'https://static.wikia.nocookie.net/fortnite/images/d/d9/Shield_Potion_-_Item_-_Fortnite.png',
        preco: 150.00,
      },
      {
        nome: 'Elixir da Sabedoria',
        descricao: 'Aumenta temporariamente a clareza mental e capacidade de aprendizado. Ideal para estudos e decisões importantes.',
        imagemUrl: 'https://images.unsplash.com/photo-1603909075272-19b6aa0ae25f?w=300&h=300&fit=crop',
        preco: 200.00,
      },
      {
        nome: 'Poção de Invisibilidade',
        descricao: 'Torna o usuário invisível por até 1 hora. Efeito pode variar conforme peso corporal. Uso com cautela.',
        imagemUrl: 'https://portal.loft.com.br/wp-content/uploads/2023/09/o-que-e-parede-de-gesso-e-como-fazer.jpg',
        preco: 350.00,
      },
      {
        nome: 'Elixir da Sorte',
        descricao: 'Aumenta significativamente a probabilidade de sucesso em qualquer empreendimento por 24 horas.',
        imagemUrl: 'https://static.wikia.nocookie.net/roblox-immortal-luck/images/4/44/Luck_Potion.png',
        preco: 500.00,
      },
      {
        nome: 'Poção de Força Titânica',
        descricao: 'Concede força sobre-humana por 2 horas. Ideal para trabalhos pesados ou situações de emergência.',
        imagemUrl: 'https://www.sfpesca.com.br/produtos/original/quick-shake-1200-500604-23051.jpg',
        preco: 175.00,
      },
      {
        nome: 'Antídoto Universal',
        descricao: 'Neutraliza qualquer veneno conhecido. Essencial para viajantes e aventureiros. Ingrediente raro: bezoar.',
        imagemUrl: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=300&h=300&fit=crop',
        preco: 300.00,
      },
    ];

    await Potion.bulkCreate(potions);
    console.log(`✓ ${potions.length} poções foram cadastradas com sucesso!`);
  } catch (error) {
    console.error('✗ Erro ao popular banco de dados:', error);
  }
};

module.exports = { seedPotions };
