const pool = require("./connection");

// Buscar todos os espaços disponíveis
const getAll = async() => {
    const [rows] = await pool.query(
        "SELECT espaco.*, usuario.nome AS responsavel_nome FROM espaco INNER JOIN usuario ON espaco.responsavel = usuario.id WHERE espaco.disponivel = 1"
    );
    return rows;
};

// Buscar espaço por ID
const getById = async(id) => {
    const [rows] = await pool.query(
        "SELECT espaco.*, usuario.nome AS responsavel_nome FROM espaco INNER JOIN usuario ON espaco.responsavel = usuario.id WHERE espaco.id = ? AND espaco.disponivel = 1", [id]
    );
    return rows[0] || null;
};

const getByUserId = async(id) => {
    const [rows] = await pool.query(
        "SELECT espaco.*, usuario.id AS responsavel_id FROM espaco INNER JOIN usuario ON espaco.responsavel = usuario.id WHERE usuario.id = ? AND espaco.disponivel = 1", [id]
    );
    return rows;
};

// Criar novo espaço
const create = async(space) => {
    const { numero, disponivel, descricao, valor, responsavel, imagem } = space;
    const [result] = await pool.query(
        "INSERT INTO espaco (numero, disponivel, descricao, valor, responsavel, imagem) VALUES (?, ?, ?, ?, ?, ?)", [numero, disponivel, descricao, valor, responsavel, imagem]
    );
    return { id: result.insertId, ...space };
};

// Atualizar espaço por ID
const update = async(id, space) => {
    const { numero, disponivel, descricao, valor, imagem } = space;
    console.log(space);
    const [result] = await pool.query(
        "UPDATE espaco SET numero = ?, disponivel = ?, descricao = ?, valor = ?, imagem = ? WHERE id = ?",
        [numero, disponivel, descricao, valor, imagem, id]
    );
    return result.affectedRows > 0;
};

// Deletar espaço por ID
const remove = async(id) => {
    const [result] = await pool.query("DELETE FROM espaco WHERE id = ?", [id]);
    return result.affectedRows > 0;
};

module.exports = { getAll, getById, getByUserId, create, update, remove };
