require('dotenv').config()
const crypto = require('crypto')

const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex')
const algo = 'aes-256-cbc'


// Encryption function
function encrypt(text, key) {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv(algo, key, iv)
  let encrypted = cipher.update(text, 'utf-8', 'hex')
  encrypted += cipher.final('hex')
  return iv.toString('hex') + ':' + encrypted
}

// Decryption function
function decrypt(input) {
    const parts = input.split(':')
    const iv = Buffer.from(parts[0], 'hex')
    const encrypted = parts[1]
    const decipher = crypto.createDecipheriv(algo, key, iv)
    let decrypted = decipher.update(encrypted, 'hex', 'utf-8')
    decrypted += decipher.final('utf8')
    return decrypted
  }
  
  module.exports = { encrypt, decrypt }