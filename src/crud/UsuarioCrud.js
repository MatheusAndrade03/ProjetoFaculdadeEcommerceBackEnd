const Usuario = require('../Usuario');
const logger = require('../logger');
const AppError = require('../error');
const { Types } = require('mongoose');

function validarUsuario(u) {
  if (!u.nome || typeof u.nome !== 'string') throw new AppError('Nome inválido');
  if (!u.email || typeof u.email !== 'string' || !u.email.includes('@')) throw new AppError('Email inválido');
}

module.exports = {
  async create(dados) {
    validarUsuario(dados);
    const doc = await Usuario.create(dados);
    logger.info('Usuário criado: ' + doc._id);
    return doc;
  },

  async list() {
    return await Usuario.find().lean();
  },

  async update(id, dados) {
    if (!Types.ObjectId.isValid(id)) throw new AppError('ID inválido');
    const updated = await Usuario.findByIdAndUpdate(id, { $set: dados }, { new: true });
    if (!updated) throw new AppError('Usuário não encontrado', 404);
    logger.info('Usuário atualizado: ' + id);
    return updated;
  },

  async delete(id) {
    if (!Types.ObjectId.isValid(id)) throw new AppError('ID inválido');
    const del = await Usuario.findByIdAndDelete(id);
    if (!del) throw new AppError('Usuário não encontrado', 404);
    return del;
  }
};
