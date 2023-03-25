const express = require("express");
const app = express();

// Fibonacci function
function fibonacci(n) {
  if (n < 2) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Endpoint to generate Fibonacci sequence
app.get("/fibonacci/:n", (req, res) => {
  const n = parseInt(req.params.n);
  const result = fibonacci(n);
  res.json({ result });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
