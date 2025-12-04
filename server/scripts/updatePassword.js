const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const [,, email, newPass] = process.argv;
if (!email || !newPass) {
  console.error('Uso: node updatePassword.js email nuevaContraseña');
  process.exit(1);
}

const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/cmv-mern';

mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    const hash = bcrypt.hashSync(newPass, 10);
    const updated = await User.findOneAndUpdate({ email }, { password: hash }, { new: true });
    if (updated) console.log(`Contraseña actualizada para: ${updated.email}`);
    else console.log('Usuario no encontrado');
    process.exit(0);
  })
  .catch(err => { console.error(err); process.exit(1); });