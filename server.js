const app = require('./src/app');
const { sequelize, connectDB } = require('./src/config/db.config');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Synchronize database schema and then start the server
sequelize.sync({ alter: true }).then(() => {
  console.log('Database schema synchronized');
  app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Error synchronizing database:', err);
});