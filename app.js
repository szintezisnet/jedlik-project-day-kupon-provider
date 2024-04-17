const express = require('express')
const app = express()
const port = 3000

var cuopons = [];

app.get('/', (req, res) => {
  res.send('This is your very best cuopon provider! Use it with care.');
})

app.get('/create', (req, res) => {
  const c = generateCoupon();
  while (cuopons.includes(c)) {
    c = generateCoupon();
  }
  cuopons.push(c);
  console.log('Current cuopons: ' + cuopons);
  res.send({ data: c });
})

app.get('/apply/:cp', (req, res) => {
  if (cuopons.includes(req.params.cp)) {
    cuopons.splice(cuopons.indexOf(req.params.cp), 1);
    res.send({ data: true });
  }
  res.send({ data: false });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

function generateCoupon() {
  return get6RandomChars();
}

var chars = [
  "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
  "k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
  "u", "v", "w", "x", "y", "z"
];

function get6RandomChars() {
  var char1 = chars[Math.floor(Math.random() * 36)];
  var char2 = chars[Math.floor(Math.random() * 36)];
  var char3 = chars[Math.floor(Math.random() * 36)];
  var char4 = chars[Math.floor(Math.random() * 36)];
  var char5 = chars[Math.floor(Math.random() * 36)];
  var char6 = chars[Math.floor(Math.random() * 36)];

  return "" + char1 + char2 + char3 + char4 + char5 + char6;
}