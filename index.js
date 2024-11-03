const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON data
app.use(express.json());

// Temporary data storage (in-memory)
let items = [];

// CREATE (POST)
app.post('/items', (req, res) => {
    const { name, description } = req.body;
    const newItem = { id: items.length + 1, name, description };
    items.push(newItem);
    res.status(201).json(newItem);
});

// READ ALL (GET)
app.get('/items', (req, res) => {
    res.json(items);
});

// READ ONE (GET)
app.get('/items/:id', (req, res) => {
    const { id } = req.params;
    const item = items.find(i => i.id == id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
});

// UPDATE (PUT)
app.put('/items/:id', (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const itemIndex = items.findIndex(i => i.id == id);
    if (itemIndex === -1) return res.status(404).json({ message: 'Item not found' });

    items[itemIndex] = { id: parseInt(id), name, description };
    res.json(items[itemIndex]);
});

// DELETE (DELETE)
app.delete('/items/:id', (req, res) => {
    const { id } = req.params;
    const itemIndex = items.findIndex(i => i.id == id);
    if (itemIndex === -1) return res.status(404).json({ message: 'Item not found' });

    const deletedItem = items.splice(itemIndex, 1);
    res.json(deletedItem);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

