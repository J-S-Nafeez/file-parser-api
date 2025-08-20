// const express = require('express');
// const cors = require('cors');
// const fileRoutes = require('./routes/fileRoutes');

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use('/api', fileRoutes);

// module.exports = app;








const express = require('express');
const cors = require('cors');
const fileRoutes = require('./routes/fileRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', fileRoutes);

module.exports = app;
