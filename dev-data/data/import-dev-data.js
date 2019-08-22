const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');
const User = require('./../../models/userModel');
const Review = require('./../../models/reviewModel');

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
    /*
    const tourDataPath = `${__dirname}/tours.json`;
    console.log(`importing file: ${tourDataPath}`);

    const data = await readFilePro(tourDataPath);
    const tours = JSON.parse(data);
    console.log(`${tours.length} tours found in file to import.`);
    await Tour.create(tours);

    to import users comment out the two pre save middlewares in userModel.js
    const userDataPath = `${__dirname}/users.json`;
    const userData = await readFilePro(userDataPath);
    const users = JSON.parse(userData);
    console.log(`${users.length} users found in file to import.`);
    await User.create(users, { validateBeforeSave: false });
    */

    const reviewDataPath = `${__dirname}/reviews.json`;
    const reviewData = await readFilePro(reviewDataPath);
    const reviews = JSON.parse(reviewData);
    await Review.create(reviews);

    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE DATA FROM MONGO COLLECTION
const deleteData = async importFn => {
  try {
    // await Tour.deleteMany();
    // await User.deleteMany();
    await Review.deleteMany();
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
