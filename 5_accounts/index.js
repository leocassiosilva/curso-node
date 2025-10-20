const inquirer = require('inquirer').default;
const chalk = require('chalk');
const fs = require('fs');

console.log("Iniciamos o Accounts");

function operation() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'O que você deseja fazer?',
        choices: [
          'Criar conta',
          'Consultar saldo',
          'Depositar',
          'Sacar',
          'Sair'
        ],
      },
    ])
    .then((answer) => {
      const action = answer.action;
      console.log("Ação escolhida:", action);
    });
}

operation();
