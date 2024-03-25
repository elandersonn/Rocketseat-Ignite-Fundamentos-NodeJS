// process.stdin
//   .pipe(process.stdout)

import { Readable, Writable, Transform, Duplex } from 'node:stream'

class OneToHundredStream extends Readable {
  index = 1
  _read() {
    const i = this.index++

    setTimeout(() => {

      if (i > 100) {
        this.push(null)
      } else {
        const buf = Buffer.from(String(i))
        this.push(buf)
      }
    }, 150)
  }
}

class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10);
    callback()
  }
}

class ConvertToNegativeStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1.5

    callback(null, Buffer.from(String(transformed)))
  }
}

new OneToHundredStream()
  .pipe(new ConvertToNegativeStream())
  .pipe(new MultiplyByTenStream())