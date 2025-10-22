const readline = require('readline-sync');
const logger = require('./logger');
const ProdutoCrud = require('./crud/ProdutoCrud');
const UsuarioCrud = require('./crud/UsuarioCrud');
const PedidoCrud = require('./crud/PedidoCrud');

async function menu() {
  while (true) {
    console.log('\n===== E-COMMERCE - MENU =====');
    console.log('1 - Gerenciar Produtos');
    console.log('2 - Gerenciar Usuários');
    console.log('3 - Gerenciar Pedidos');
    console.log('0 - Sair');
    const opt = readline.question('Escolha: ');

    if (opt === '0') break;
    if (opt === '1') await menuProdutos();
    else if (opt === '2') await menuUsuarios();
    else if (opt === '3') await menuPedidos();
    else console.log('Opção inválida');
  }
}

async function menuProdutos() {
  console.log('\n--- PRODUTOS ---');
  console.log('1 - Criar');
  console.log('2 - Listar');
  console.log('3 - Atualizar');
  console.log('4 - Deletar');
  console.log('0 - Voltar');
  const op = readline.question('Escolha: ');
  try {
    if (op === '1') {
      const nome = readline.question('Nome: ');
      const preco = Number(readline.question('Preço: '));
      const estoque = Number(readline.question('Estoque: '));
      await ProdutoCrud.create({ nome, preco, estoque });
    } else if (op === '2') {
      const items = await ProdutoCrud.list();
      console.table(items);
    } else if (op === '3') {
      const id = readline.question('ID do produto: ');
      const estoque = Number(readline.question('Novo estoque: '));
      await ProdutoCrud.update(id, { estoque });
    } else if (op === '4') {
      const id = readline.question('ID do produto: ');
      await ProdutoCrud.delete(id);
    }
  } catch (e) {
    logger.error(e.message);
    console.log('Erro: ' + e.message);
  }
}

async function menuUsuarios() {
  console.log('\n--- USUÁRIOS ---');
  console.log('1 - Criar');
  console.log('2 - Listar');
  console.log('3 - Atualizar');
  console.log('4 - Deletar');
  console.log('0 - Voltar');
  const op = readline.question('Escolha: ');
  try {
    if (op === '1') {
      const nome = readline.question('Nome: ');
      const email = readline.question('Email: ');
      await UsuarioCrud.create({ nome, email, senha: '123456' });
    } else if (op === '2') {
      const items = await UsuarioCrud.list();
      console.table(items);
    } else if (op === '3') {
      const id = readline.question('ID do usuário: ');
      const nome = readline.question('Novo nome: ');
      await UsuarioCrud.update(id, { nome });
    } else if (op === '4') {
      const id = readline.question('ID do usuário: ');
      await UsuarioCrud.delete(id);
    }
  } catch (e) {
    logger.error(e.message);
    console.log('Erro: ' + e.message);
  }
}

async function menuPedidos() {
  console.log('\n--- PEDIDOS ---');
  console.log('1 - Criar');
  console.log('2 - Listar');
  console.log('3 - Atualizar');
  console.log('4 - Deletar');
  console.log('0 - Voltar');
  const op = readline.question('Escolha: ');
  try {
    if (op === '1') {
      const usuarioId = readline.question('ID do usuário: ');
      const produtoId = readline.question('ID do produto: ');
      const quantidade = Number(readline.question('Quantidade: '));
      const valorTotal = Number(readline.question('Valor total: '));
      await PedidoCrud.create({ usuarioId, produtos: [{ produtoId, quantidade }], valorTotal });
    } else if (op === '2') {
      const items = await PedidoCrud.list();
      console.table(items);
    } else if (op === '3') {
      const id = readline.question('ID do pedido: ');
      const valorTotal = Number(readline.question('Novo total: '));
      await PedidoCrud.update(id, { valorTotal });
    } else if (op === '4') {
      const id = readline.question('ID do pedido: ');
      await PedidoCrud.delete(id);
    }
  } catch (e) {
    logger.error(e.message);
    console.log('Erro: ' + e.message);
  }
}

module.exports = menu;
