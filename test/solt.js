const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;
const salt = bcrypt.genSaltSync(SALT_ROUNDS);
const password = '12345678';
const safePassword = bcrypt.hashSync(password, salt);
console.log(safePassword);
const is = bcrypt.compareSync('password', safePassword);
console.log(is);