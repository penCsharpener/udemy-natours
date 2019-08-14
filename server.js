const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE_LOCAL;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then((/*con*/) => {
    //console.log(con.connections);
    console.log('DB connection successful!');
  });

// console.log(app.get('env'));
// console.log(process.env);

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true
  },
  rating: {
    type: Number,
    default: 4.5
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price']
  }
});

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
  name: 'The Forest Hiker',
  rating: 4.7,
  price: 497
});

testTour
  .save()
  .then(doc => {
    console.log(doc);
  })
  .catch(err => {
    console.log('ERROR:', err);
  });

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
