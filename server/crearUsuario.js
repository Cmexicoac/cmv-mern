const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User.js');
require('dotenv').config();

async function run() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cmv_mern', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const email = 'paty.08calderon@hotmail.com';
  const plainPassword = '123456';

  let user = await User.findOne({ email });

  const hashed = await bcrypt.hash(plainPassword, 10);

  if (user) {
    user.password = hashed;
    await user.save();
    console.log('Password actualizado para:', email);
  } else {
    user = new User({
      email,
      password: hashed,
      nombre: 'Paty',
      rol: 'estudiante',
      matricula: '0000'
    });
    await user.save();
    console.log('Usuario creado:', email);
  }

  await mongoose.disconnect();
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });