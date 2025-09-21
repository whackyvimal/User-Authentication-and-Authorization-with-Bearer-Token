// ...existing code...
const app = require('./app');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
