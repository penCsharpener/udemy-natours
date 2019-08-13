const fs = require('fs');

exports.tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  const id = val * 1;
  const tour = this.tours.find(el => el.id === id);
  console.log(`params middleware id: ${id}`);
  if (id > this.tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price.'
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: this.tours.length,
    data: {
      tours: this.tours
    }
  });
};

exports.getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = this.tours.find(el => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
};

exports.createTour = (req, res) => {
  console.log(req.body);
  const newId = this.tours[this.tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  this.tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(this.tours),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      });
    }
  );
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: 'Updated tour...'
    }
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null
  });
};
