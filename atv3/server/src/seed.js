const Potion = require('./models/Potion');

const seedPotions = async () => {
  try {
    const potions = [
      {
        nome: 'Poção de Cura Maior',
        descricao: 'Restaura completamente a saúde e cura ferimentos graves. Ingredientes: raiz de mandrágora, lágrimas de fênix.',
        imagemUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=300&h=300&fit=crop',
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
        imagemUrl: 'https://images.unsplash.com/photo-1612528443702-f6741f70a049?w=300&h=300&fit=crop',
        preco: 350.00,
      },
      {
        nome: 'Elixir da Sorte',
        descricao: 'Aumenta significativamente a probabilidade de sucesso em qualquer empreendimento por 24 horas.',
        imagemUrl: 'https://images.unsplash.com/photo-1605256948056-24b37174c10b?w=300&h=300&fit=crop',
        preco: 500.00,
      },
      {
        nome: 'Poção de Força Titânica',
        descricao: 'Concede força sobre-humana por 2 horas. Ideal para trabalhos pesados ou situações de emergência.',
        imagemUrl: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=300&h=300&fit=crop',
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
