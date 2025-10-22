const Produto = require('../Produto');
const logger = require('../logger');
const AppError = require('../error');
const { Types } = require('mongoose');

function validarProduto(p) {
  if (!p.nome || typeof p.nome !== 'string') throw new AppError('Nome inválido');
  if (typeof p.preco !== 'number' || p.preco <= 0) throw new AppError('Preço inválido');
  if (typeof p.estoque !== 'number' || p.estoque < 0) throw new AppError('Estoque inválido');
}

module.exports = {
  async create(dados) {
    validarProduto(dados);
    const doc = await Produto.create(dados);
    logger.info('Produto criado: ' + doc._id);
    return doc;
  },

  async list() {
    return await Produto.find().lean();
  },

  async update(id, dados) {
    if (!Types.ObjectId.isValid(id)) throw new AppError('ID inválido');
    const updated = await Produto.findByIdAndUpdate(id, { $set: dados }, { new: true });
    if (!updated) throw new AppError('Produto não encontrado', 404);
    logger.info('Produto atualizado: ' + id);
    return updated;
  },

  async delete(id) {
    if (!Types.ObjectId.isValid(id)) throw new AppError('ID inválido');
    const del = await Produto.findByIdAndDelete(id);
    if (!del) throw new AppError('Produto não encontrado', 404);
    logger.info('Produto deletado: ' + id);
    return del;
  }
};
