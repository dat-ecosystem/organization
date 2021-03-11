export function runAsync (asyncFn) {
  asyncFn()
    .catch(err => console.error(err))
}
