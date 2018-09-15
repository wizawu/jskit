import generate = require("nanoid/generate")

export default function(length = 20) {
    return generate("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz", length)
}
