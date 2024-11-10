import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// API Routes
app.get('/api/menu', (req, res) => {
  // Firebase integration will be handled on the client side
  res.json({ message: 'Menu endpoint ready' });
});

app.post('/api/orders', (req, res) => {
  // Firebase integration will be handled on the client side
  res.json({ message: 'Order endpoint ready' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});