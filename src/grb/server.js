const express = require('express');
const grbRoutes = require('./routes');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('REST API for TASK 2 TBD by Jovita Ayu');
});

app.use("/api/v1/grb", grbRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));