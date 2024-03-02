function sum(a, b) {
  return a + b
}

function sum2(a, b) {
  return a + b
}

function sum3(a, b) {
  return a + b
}

function sub(a, b) {
  return a - b
}

function multi(a, b) {
  return a * b
}

function forEach(items, callback) {
  for (const item of items) {
    callback(item)
  }
}

module.exports = {
  sum,
  sum2,
  sum3,
  sub,
  multi,
  forEach,
}
