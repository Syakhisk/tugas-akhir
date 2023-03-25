const express = require("express");
const app = express();

function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

app.get("/bubble-sort", (req, res) => {
  const arr = [4, 2, 1, 3, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const sortedArr = bubbleSort(arr);
  res.send(sortedArr.toString());
});

app.listen(3000, () => {
  console.log("App listening on port 3000!");
});
