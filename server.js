import express from 'express'

const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.static('public'))

// ─────────────────────────────────────
// TEMPORARY DATA STORAGE
// Will be replaced with PostgreSQL later
// ─────────────────────────────────────
const cars = [
    { id: 1, make: 'Toyota', model: 'Camry', price: 2500 },
    { id: 2, make: 'Honda', model: 'Civic', price: 22000 },
    { id: 3, make: 'Ford', model: 'Mustang', price: 65000 }
]

// GET /cars — Fetch all cars
app.get('/cars', (req, res) => {
    try {
        res.json(cars)
    } catch (error) {
        res.status(500).json({
            error: 'Server error while fetching cars'
        })
    }
})

// POST /cars — Add a new car
app.post('/cars', (req, res) => {
    try {
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

        if (typeof id !== 'number' || !Number.isFinite(id) || id < 0) {
            return res.status(400).json({
                error: 'ID must be a valid positive number'
            })
        }

        if (typeof price !== 'number' || !Number.isFinite(price) || price < 0) {
            return res.status(400).json({
                error: 'Price must be a valid positive number'
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

    } catch (error) {
        res.status(500).json({
            error: 'Server error while adding car'
        })
    }
})

// PATCH /cars/:id — Update a car
app.patch('/cars/:id', (req, res) => {
    try {
        const id = Number(req.params.id)
        const car = cars.find(car => car.id === id)

        if (!car) {
            return res.status(404).json({
                error: `Car ${id} not found`
            })
        }

        const { make, model, price } = req.body

        if (make !== undefined) {
            if (typeof make !== 'string' || !make.trim()) {
                return res.status(400).json({
                    error: 'Make must be valid text'
                })
            }
            car.make = make.trim()
        }

        if (model !== undefined) {
            if (typeof model !== 'string' || !model.trim()) {
                return res.status(400).json({
                    error: 'Model must be valid text'
                })
            }
            car.model = model.trim()
        }

        if (price !== undefined) {
            if (typeof price !== 'number' ||
                !Number.isFinite(price) || price < 0) {
                return res.status(400).json({
                    error: 'Price must be a valid positive number'
                })
            }
            car.price = price
        }

        res.json(car)

    } catch (error) {
        res.status(500).json({
            error: 'Server error while updating car'
        })
    }
})

// DELETE /cars/:id — Delete a car
app.delete('/cars/:id', (req, res) => {
    try {
        const id = Number(req.params.id)
        const index = cars.findIndex(car => car.id === id)

        if (index === -1) {
            return res.status(404).json({
                error: `Car ${id} not found`
            })
        }

        cars.splice(index, 1)
        return res.json({
            message: `Car ${id} deleted successfully`
        })

    } catch (error) {
        res.status(500).json({
            error: 'Server error while deleting car'
        })
    }
})

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({
        error: 'Something went wrong on the server!'
    })
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})