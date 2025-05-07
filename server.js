console.log("🚀 server.js התחיל לרוץ");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const DATA_FILE = './userPreferences.json';


if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({}));
}


app.get('/preferences/:userId', (req, res) => {
  const userId = req.params.userId;
  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  res.json(data[userId] || []);
});

app.post('/preferences/:userId', (req, res) => {
  const userId = req.params.userId;
  const genres = req.body.genres;

  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  data[userId] = genres;
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

  res.json({ message: 'Genres saved successfully.' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
