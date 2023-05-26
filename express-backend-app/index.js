const express = require('express');
const app = express();
const port = 3003;
const USERS = [];
const QUESTIONS = [{
  Title: "Two states",
  Description: "gives an array, return the maximum of the array",
  Testcases: [{
    input: "[1,2,3,4,5]",
    output: "5"
  }]
}];
const SUBMISSIONS = [{
  userId: "1",
  questionId: "1",
  code: "function max(arr){return Math.max(...arr)}",
  status: "accepted"
},
{
  userId: "1",
  questionId: "1",
  code: "function max(arr){return Math.min(...arr)}",
  status: "rejected"
}];

app.get('/signup', (req, res) => {
  res.send('This is the signup page');
});

app.post('/signup', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }
  const existingUser = USERS.find(user => user.email === email);
  if (existingUser) {
    return res.status(409).send('User already exists');
  }
  USERS.push({ email, password });
  res.status(200).send('User registered successfully');
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }
  if (!user || user.password !== password) {
    return res.status(401).send('Invalid email or password');
  }
  const Token = 'Random Token';
  res.status(200).json({ token: Token });
});

app.get('/questions', (req, res) => {
  res.json(QUESTIONS);
});

app.get('/submissions', (req, res) => {
  res.json(SUBMISSIONS);
});

app.post('/submissions', (req, res) => {
  const isAccepted = Math.random() < 0.5;
  const submission = {
    problem: req.body.problem,
    isAccepted: isAccepted
  };
  SUBMISSIONS.push(submission);
  res.status(200).send('Submission received successfully');
});

app.post('/problems', (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).send('Only admins can add new problems');
  }
  const { title, description, testcases } = req.body;
  const problem = {
    title,
    description,
    testcases
  };
  QUESTIONS.push(problem);
  res.status(200).send('Problem added successfully');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
