import express from 'express'

const app = express()
const port = 3000

app.use(express.json())

// Temporary data storage
const cars = [
    { id: 1, make: 'Toyota', model: 'Camry', price: 2500 },
    { id: 2, make: 'Honda', model: 'Civic', price: 22000 },
    { id: 3, make: 'Ford', model: 'Mustang', price: 65000 }
]


app.get('/cars', (req, res) => {
res.json(cars)
})

app.post('/cars', (req, res) => {
    const newCar = req.body
    cars.push(newCar)
res.json(cars)
})

app.delete('/cars/:id', (req, res) => {
    const id = Number(req.params.id)
    const index = cars.findIndex(car => car.id === id)  
    cars.splice(index, 1)
    res.json({message: `Car ${id} deleted successfully.`, cars})
})

app.listen(port, () =>{
    console.log(`Server is running on ${port}`)
})