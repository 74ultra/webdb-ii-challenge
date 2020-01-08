const express = require('express');
const router = express.Router();
const Cars = require('./cars-model.js')



router.get('/', (req, res) => {
    Cars.get()
        .then(cars => {
            res.status(200).json(cars)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: 'There was an error retrieving the list of cars'})
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Cars.getById(id)
        .then(car => {
            if (car) {
                res.status(200).json(car)
            } else {
                res.status(404).json({ message: 'A car with that id does not exist'})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: 'There was an error retrieving the car with that id'})
        })
})

router.post('/', (req, res) => {
    const { VIN, make, model, mileage, transmission, title_status } = req.body;
    Cars.insert({ VIN, make, model, mileage, transmission, title_status })
        .then(car => {
            if (car) {
                res.status(201).json(car)
            } else {
                res.status(500).json({ message: 'Damn, there was an error adding a new car'})
            }
        })
        .catch(err => {
            console.log('Hello', err)
            res.status(500).json({ message: 'There was an error adding a new car'})
        })
})

module.exports = router;