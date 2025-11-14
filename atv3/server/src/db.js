const { Sequelize } = require('sequelize');

// SQLite em memória
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
  logging: false, // Desabilita logs SQL no console
});

const initDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✓ Conexão com banco de dados estabelecida com sucesso.');

    // Sincroniza modelos com o banco
    await sequelize.sync({ force: true });
    console.log('✓ Modelos sincronizados com o banco de dados.');
  } catch (error) {
    console.error('✗ Erro ao conectar com o banco de dados:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, initDatabase };
