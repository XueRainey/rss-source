const bcrypt = require('bcrypt');
// const SALT_ROUNDS = 1;

const func = (SALT_ROUNDS) => {
    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    const password = '12345678';
    const safePassword = bcrypt.hashSync(password, salt, 1);
    return safePassword;
    // console.log('salt::', salt);
    // console.log('safePassword::', safePassword);
}
const safePassword = func(12);

const start = Date.now();
for(let i = 0; i< 100; i++) {
    console.log('rounds::', i);
    bcrypt.compareSync('password', safePassword)
}
console.log('tiemout::', Date.now() - start, 'ms');
  