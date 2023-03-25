const express = require('express');
const app = express();

function isPrime(n) {
  if (n <= 1) {
    return false;
  }
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}


app.get('/is-prime', (req, res) => {
  const result = isPrime(4096);
  res.send(result.toString());
});

app.get('/is-prime/:n', (req, res) => {
  const n = parseInt(req.params.n, 10);
  const result = isPrime(n);
  res.send(result.toString());
});

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});

