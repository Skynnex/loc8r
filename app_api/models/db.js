const mongoose = require('mongoose');
const readLine = require('readline');

let dbURI = 'mongodb://localhost/Loc8r';
if(process.env.NODE_ENV === 'production') {
  dbURI = process.env.MONGODB_URI ;
  console.log(dbURI);
}
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true});
mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`)
});
mongoose.connection.on('error', err => {
  console.log('Mongoose connection error', err)
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected')
});

if(process.platform === 'win32') {
  const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.on('SIGNINT', () => {
    process.emit("SIGNINT");
  });
}

const gracefulShotdon = (msg, callback) => {
  mongoose.connection.close( () => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
};

process.once('SIGUSR2', () => {
  gracefulShotdon('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});

process.on('SIGINT', () => {
  gracefulShotdon('app termination', () => {
    process.exit(0);
  })
});

process.on('SIGTERM', () => {
  gracefulShotdon('Heroku app shotdown', () => {
    process.exit(0);
  });
});


require('./locations');
require('./users');