const express = require('express');
const app = express();
const port = 80;

var cuopons = [];

app.get('/', (req, res) => {
  res.send('This is your very best cuopon provider! Use it with care.');
})

app.get('/cuopon/:owner', (req, res) => {
  if (!['purple', 'yellow'].includes(req.params.owner)) {
    res.send({ error: 'ERROR. Wrong owner.' });
    return;
  }

  const c = generateCoupon();
  while (cuopons.find(x => x.id === c)) {
    c = generateCoupon();
  }
  const newCuopon = { id: c, owner: req.params.owner, discount: 10 };
  cuopons.push(newCuopon);
  console.log('Current cuopons: ' + cuopons.map(x => x.id));
  res.send({ data: newCuopon });
})

app.get('/cuopon/:owner/:cp', (req, res) => {
  const foundCuopon = cuopons.find(x => x.id == req.params.cp);
  if (foundCuopon) {
    if (foundCuopon.owner == req.params.owner) {
      res.send({ error: 'You cannot use your own cuopon!' });
      return;
    }

    cuopons = cuopons.filter(x => x.id != req.params.cp);
    res.send({ data: true });
    return;
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