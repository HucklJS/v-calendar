export function* range(start, stop) {
  for (let i = start; i < stop; i++) {
    yield i
  }
}