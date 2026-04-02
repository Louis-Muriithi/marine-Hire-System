import express from 'express'

const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.static('public'))

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
    const { id, make, model, price } = req.body

    if (
        id === undefined || id === null ||
        make === undefined || make === null ||
        model === undefined || model === null ||
        price === undefined || price === null
    ) {
        return res.status(400).json({
            error: 'All fields are required (id, make, model, price)'
        })
    }

    if (typeof id !== 'number' || !Number.isFinite(id)) {
        return res.status(400).json({
            error: 'ID must be a valid number'
        })
    }

    if (typeof price !== 'number' || !Number.isFinite(price)) {
        return res.status(400).json({
            error: 'Price must be a valid number'
        })
    }

    if (typeof make !== 'string' || typeof model !== 'string') {
        return res.status(400).json({
            error: 'Make and model must be text'
        })
    }

    const cleanMake = make.trim()
    const cleanModel = model.trim()

    if (!cleanMake || !cleanModel) {
        return res.status(400).json({
            error: 'Make and model cannot be empty'
        })
    }

    const exists = cars.some(car => car.id === id)
    if (exists) {
        return res.status(409).json({
            error: `Car with id ${id} already exists`
        })
    }

    const newCar = { id, make: cleanMake, model: cleanModel, price }
    cars.push(newCar)
    return res.status(201).json(newCar)
})

app.delete('/cars/:id', (req, res) => {
    const id = Number(req.params.id)
    const index = cars.findIndex(car => car.id === id)

    if (index === -1) {
        return res.status(404).json({ message: `Car ${id} not found.` })
    }

    cars.splice(index, 1)
    res.json({ message: `Car ${id} deleted successfully.`, cars })
})

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
})