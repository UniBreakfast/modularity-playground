export function generateToken() {
  let token = ''
  for (let i = 0; i < 41; ++i)
    token += (i+1)%7 ? chars[random() * 62 | 0] : '-'
  return token
}


const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const {random} = Math
