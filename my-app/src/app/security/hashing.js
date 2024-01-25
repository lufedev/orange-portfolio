import * as bcrypt from 'bcrypt'

function hashpass(password) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (saltError, salt) => {
      if (saltError) {
        reject(saltError)
      } else {
        bcrypt.hash(password, salt, (hashError, hash) => {
          if (hashError) {
            reject(hashError)
          } else {
            console.log(hash)
            resolve(hash)
          }
        })
      }
    })
  })
}

export default hashpass
