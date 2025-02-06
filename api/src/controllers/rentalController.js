const rentalModel = require("../models/rentalModel");

// Listar todos os aluguéis
const getAll = async (req, res) => {
  try {
    const rentals = await rentalModel.getAll();
    res.json(rentals);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar aluguéis." });
  }
};

// Buscar aluguel por ID
const getById = async (req, res) => {
  try {
    const rental = await rentalModel.getById(req.params.id);
    if (!rental) {
      return res.status(404).json({ error: "Aluguel não encontrado." });
    }
    res.json(rental);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar aluguel." });
  }
};

// Criar um novo aluguel
const create = async (req, res) => {
  try {
    const newRental = await rentalModel.create(req.body);
    res.status(201).json(newRental);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar aluguel." });
  }
};

// Atualizar um aluguel
const update = async (req, res) => {
  try {
    const updated = await rentalModel.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: "Aluguel não encontrado." });
    }
    res.json({ message: "Aluguel atualizado com sucesso." });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar aluguel." });
  }
};

// Deletar um aluguel
const remove = async (req, res) => {
  try {
    const deleted = await rentalModel.remove(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Aluguel não encontrado." });
    }
    res.json({ message: "Aluguel removido com sucesso." });
  } catch (error) {
    res.status(500).json({ error: "Erro ao remover aluguel." });
  }
};

module.exports = { getAll, getById, create, update, remove };
