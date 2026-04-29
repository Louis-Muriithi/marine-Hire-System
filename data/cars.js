// ─────────────────────────────────────
// TEMPORARY MOCK DATA
// TODO: Replace with PostgreSQL queries later
// ─────────────────────────────────────

export const cars = [
    { 
        id: 1, 
        make: 'Toyota', 
        model: 'Camry', 
        price: 2500,
        available: true,
        createdAt: new Date().toISOString()
    },
    { 
        id: 2, 
        make: 'Honda', 
        model: 'Civic', 
        price: 22000,
        available: true,
        createdAt: new Date().toISOString()
    },
    { 
        id: 3, 
        make: 'Ford', 
        model: 'Mustang', 
        price: 65000,
        available: true,
        createdAt: new Date().toISOString()
    }
]