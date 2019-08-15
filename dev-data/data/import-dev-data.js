const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE_LOCAL;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('DB connection successful!');
  });

// READ JSON FILE
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
// );

// IMPORT DATA INTO DB
const importData = () => {
  fs.readFile(
    `${__dirname}/tours-simple.json`,
    'utf-8',
    async (errFS, data) => {
      try {
        if (errFS) {
          throw errFS;
        }
        const tours = JSON.parse(data);
        console.log(`${tours.length} tours found in file to import.`);
        await Tour.create(tours);
        console.log('Data successfully loaded!');
      } catch (err) {
        console.log(err);
      }
      process.exit();
    }
  );
};

// DELETE DATA FROM MONGO COLLECTION
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
} else if (process.argv[2] === '--refresh') {
  deleteData();
  importData();
}
