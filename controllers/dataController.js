const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/data.json');

// Helper to read data from file
const readData = () => {
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
};

// Helper to write data to file
const writeData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Controller function
const dataController = (req, res) => {
  const method = req.method;
  const id = req.query.id || req.body?.id;
  const data = readData();

  switch (method) {
    case 'GET': {
      if (id) {
        const item = data.find((entry) => entry.id == id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        return res.json(item);
      }
      return res.json(data);
    }

    case 'POST': {
      const newItem = req.body;
      if (!newItem || Object.keys(newItem).length === 0)
        return res.status(400).json({ message: 'Request body is empty' });

      const newId = data.length ? data[data.length - 1].id + 1 : 1;
      const itemToAdd = { id: newId, ...newItem };
      data.push(itemToAdd);
      writeData(data);
      return res.status(201).json(itemToAdd);
    }

    case 'PUT': {
      if (!id) return res.status(400).json({ message: 'ID is required for PUT' });

      const index = data.findIndex((entry) => entry.id == id);
      if (index === -1)
        return res.status(404).json({ message: 'Item not found' });

      const updatedItem = { id: Number(id), ...req.body };
      data[index] = updatedItem;
      writeData(data);
      return res.json(updatedItem);
    }

    case 'PATCH': {
      if (!id) return res.status(400).json({ message: 'ID is required for PATCH' });

      const index = data.findIndex((entry) => entry.id == id);
      if (index === -1)
        return res.status(404).json({ message: 'Item not found' });

      data[index] = { ...data[index], ...req.body };
      writeData(data);
      return res.json(data[index]);
    }

    case 'DELETE': {
      if (!id) return res.status(400).json({ message: 'ID is required for DELETE' });

      const index = data.findIndex((entry) => entry.id == id);
      if (index === -1)
        return res.status(404).json({ message: 'Item not found' });

      const deletedItem = data.splice(index, 1)[0];
      writeData(data);
      return res.json({ message: 'Deleted successfully', deletedItem });
    }

    default:
      return res.status(405).json({ message: `${method} not allowed` });
  }
};

module.exports = dataController;
