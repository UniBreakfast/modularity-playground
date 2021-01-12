export const crypter = {hash, verify}


function hash(password) {
  let first = '', second = '', hashed = ''
  for (let i = 0; i < password.length; ++i) {
    if (i % 2) first += password[i]
    else second += password[i]
  }
  const str = first + second
  for (let i = 0; i < str.length; ++i) {
    hashed += String.fromCharCode(str[i].charCodeAt() + i%3 + i%10)
  }
  return hashed
}

function verify(password, hashed) {
  return hash(password) == hashed
}
