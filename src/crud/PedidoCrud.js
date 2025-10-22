const Pedido = require('../Pedido');
const Produto = require('../Produto');
const Usuario = require('../Usuario');
const logger = require('../logger');
const AppError = require('../error');
const { Types } = require('mongoose');

function validarPedido(p) {
  if (!p.usuarioId || !Types.ObjectId.isValid(p.usuarioId)) throw new AppError('Usuário inválido');
  if (!Array.isArray(p.produtos) || p.produtos.length === 0) throw new AppError('Produtos inválidos');
  if (typeof p.valorTotal !== 'number' || p.valorTotal <= 0) throw new AppError('Valor total inválido');
}

module.exports = {
  async create(dados) {
    validarPedido(dados);
    // optional: check user and product existence
    const user = await Usuario.findById(dados.usuarioId);
    if (!user) throw new AppError('Usuário não encontrado', 404);
    for (const item of dados.produtos) {
      if (!Types.ObjectId.isValid(item.produtoId)) throw new AppError('Produto inválido');
      const prod = await Produto.findById(item.produtoId);
      if (!prod) throw new AppError('Produto não encontrado', 404);
    }
    const doc = await Pedido.create(dados);
    logger.info('Pedido criado: ' + doc._id);
    return doc;
  },

  async list() {
    return await Pedido.find().populate('usuarioId').populate('produtos.produtoId').lean();
  },

  async update(id, dados) {
    if (!Types.ObjectId.isValid(id)) throw new AppError('ID inválido');
    const updated = await Pedido.findByIdAndUpdate(id, { $set: dados }, { new: true });
    if (!updated) throw new AppError('Pedido não encontrado', 404);
    logger.info('Pedido atualizado: ' + id);
    return updated;
  },

  async delete(id) {
    if (!Types.ObjectId.isValid(id)) throw new AppError('ID inválido');
    const del = await Pedido.findByIdAndDelete(id);
    if (!del) throw new AppError('Pedido não encontrado', 404);
    logger.info('Pedido deletado: ' + id);
    return del;
  }
};
