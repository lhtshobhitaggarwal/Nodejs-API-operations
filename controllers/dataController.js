import Data from '../models/Data.js';

const dataController = async (req, res) => {
  const method = req.method;
  const id = req.query.id || req.body?.id;

  try {
    switch (method) {
      case 'GET':
        if (id) {
          const item = await Data.findById(id);
          if (!item) return res.status(404).json({ message: 'Item not found' });
          return res.json(item);
        }
        const all = await Data.find();
        return res.json(all);

      case 'POST':
        const created = await Data.create(req.body);  
        return res.status(201).json(created);

      case 'PUT':
        if (!id) return res.status(400).json({ message: 'ID is required for PUT' });

        const replaced = await Data.findByIdAndUpdate(id, req.body, {
          new: true,
          overwrite: true, // ensures full replacement like PUT should do
        });

        if (!replaced) return res.status(404).json({ message: 'Item not found' });
        return res.json(replaced);
      case 'PATCH':
        if (!id) return res.status(400).json({ message: 'ID is required' });
        const updated = await Data.findByIdAndUpdate(id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: 'Item not found' });
        return res.json(updated);

      case 'DELETE':
        if (!id) return res.status(400).json({ message: 'ID is required' });
        const deleted = await Data.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ message: 'Item not found' });
        return res.json({ message: 'Deleted', deleted });

      default:
        return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export { dataController };
