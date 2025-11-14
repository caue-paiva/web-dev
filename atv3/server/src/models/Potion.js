const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Potion = sequelize.define('Potion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Nome é obrigatório',
      },
    },
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Descrição é obrigatória',
      },
    },
  },
  imagemUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'URL da imagem é obrigatória',
      },
      isUrl: {
        msg: 'URL da imagem deve ser válida',
      },
    },
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: {
        msg: 'Preço deve ser um número decimal',
      },
      min: {
        args: [0.01],
        msg: 'Preço deve ser maior que zero',
      },
    },
  },
}, {
  tableName: 'potions',
  timestamps: true,
});

module.exports = Potion;
