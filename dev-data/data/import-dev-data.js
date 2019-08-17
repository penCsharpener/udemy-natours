const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE_LOCAL;

const readFilePro = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    const dataPath = `${__dirname}/tours-simple.json`;
    console.log('importing file: ' + dataPath);

    const data = await readFilePro(dataPath);
    const tours = JSON.parse(data);
    console.log(`${tours.length} tours found in file to import.`);
    await Tour.create(tours);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE DATA FROM MONGO COLLECTION
const deleteData = async importFn => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  if (importFn) {
    await importFn();
  }
  process.exit();
};

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(async () => {
    console.log('DB connection successful!');

    if (process.argv[2] === '--import') {
      await importData();
    } else if (process.argv[2] === '--delete') {
      await deleteData();
    } else if (process.argv[2] === '--refresh') {
      await deleteData(importData);
    }
  });

// READ JSON FILE
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
// );
