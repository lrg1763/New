const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Feedback = require('./database');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Route to handle feedback submission
app.post('/api/feedback', async (req, res) => {
  try {
    const feedback = await Feedback.create(req.body);
    res.status(201).send({ message: 'Feedback submitted successfully', feedback });
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).send({ message: 'Error saving feedback' });
  }
});

// Route to get feedbacks
app.get('/api/feedback', async (req, res) => {
  try {
    const feedbacks = await Feedback.findAll();
    res.status(200).send(feedbacks);
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).send({ message: 'Error fetching feedbacks' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
