const express = require('express');
const Potion = require('../models/Potion');

const router = express.Router();

// GET /api/potions - Lista todas as poções
router.get('/', async (req, res) => {
  try {
    const potions = await Potion.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.json(potions);
  } catch (error) {
    console.error('Erro ao buscar poções:', error);
    res.status(500).json({
      error: 'Erro ao buscar poções',
      details: error.message
    });
  }
});

// GET /api/potions/:id - Busca uma poção específica
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const potion = await Potion.findByPk(id);

    if (!potion) {
      return res.status(404).json({
        error: 'Poção não encontrada'
      });
    }

    res.json(potion);
  } catch (error) {
    console.error('Erro ao buscar poção:', error);
    res.status(500).json({
      error: 'Erro ao buscar poção',
      details: error.message
    });
  }
});

// POST /api/potions - Cadastra uma nova poção
router.post('/', async (req, res) => {
  try {
    const { nome, descricao, imagemUrl, preco } = req.body;

    // Validação básica
    if (!nome || !descricao || !imagemUrl || !preco) {
      return res.status(400).json({
        error: 'Todos os campos são obrigatórios',
        fields: { nome, descricao, imagemUrl, preco }
      });
    }

    if (parseFloat(preco) <= 0) {
      return res.status(400).json({
        error: 'Preço deve ser maior que zero'
      });
    }

    const potion = await Potion.create({
      nome,
      descricao,
      imagemUrl,
      preco: parseFloat(preco),
    });

    res.status(201).json(potion);
  } catch (error) {
    console.error('Erro ao criar poção:', error);

    // Se for erro de validação do Sequelize
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        error: 'Erro de validação',
        details: error.errors.map(e => ({ field: e.path, message: e.message }))
      });
    }

    res.status(500).json({
      error: 'Erro ao criar poção',
      details: error.message
    });
  }
});

// DELETE /api/potions/:id - Remove uma poção
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const potion = await Potion.findByPk(id);

    if (!potion) {
      return res.status(404).json({
        error: 'Poção não encontrada'
      });
    }

    await potion.destroy();
    res.json({
      message: 'Poção removida com sucesso',
      id: parseInt(id)
    });
  } catch (error) {
    console.error('Erro ao remover poção:', error);
    res.status(500).json({
      error: 'Erro ao remover poção',
      details: error.message
    });
  }
});

module.exports = router;
