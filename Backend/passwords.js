const bcrypt = require('bcryptjs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.question('Por favor, escribe algo: ', (password) => {
    bcrypt.hash(password, 10)
    .then(hashedPassword => {
        console.log('Hashed Password:', hashedPassword);
    })
    .catch(error => {
        console.error('Error hashing password:', error);
    });
    rl.close();
  });
