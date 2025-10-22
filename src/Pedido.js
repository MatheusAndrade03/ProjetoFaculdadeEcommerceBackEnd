const mongoose = require('mongoose');

const PedidoSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  produtos: [
    {
      produtoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Produto', required: true },
      quantidade: { type: Number, required: true, min: 1 }
    }
  ],
  valorTotal: { type: Number, required: true },
  status: { type: String, enum: ['PENDENTE','PAGO','ENVIADO'], default: 'PENDENTE' },
  criadoEm: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pedido', PedidoSchema);
