
export function createCounter() {
  let count = 0;

  function increase() {
    count++;
    return count;
  }

  function decrease() {
    count--;
    return count;
  }

  function reset() {
    count = 0;
    return count;
  }

  return {
    increase,
    decrease,
    reset
  };
}
