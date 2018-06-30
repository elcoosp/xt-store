const wait = time => (cb, ...args) => setTimeout(() => cb(...args), time)

module.exports = { delay: wait(50) }
