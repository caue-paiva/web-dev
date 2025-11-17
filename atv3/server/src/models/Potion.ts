import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db';

interface PotionAttributes {
  id: number;
  nome: string;
  descricao: string;
  imagemUrl: string;
  preco: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface PotionCreationAttributes extends Optional<PotionAttributes, 'id'> {}

class Potion extends Model<PotionAttributes, PotionCreationAttributes> implements PotionAttributes {
  public id!: number;
  public nome!: string;
  public descricao!: string;
  public imagemUrl!: string;
  public preco!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Potion.init(
  {
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
  },
  {
    sequelize,
    tableName: 'potions',
    timestamps: true,
  }
);

export default Potion;
