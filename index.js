const express = require('express');
const app = express();
const connectDB = require('./config/db');
const blogRoutes = require('./routes/blogRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(express.json());

// Connect database
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', blogRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
