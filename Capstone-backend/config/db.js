config/db.js
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));
;

module.exports = mongoose;
// Connect to MongoDB
mongoose.connect(process.env.DB_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));
  