const redis = require('redis')

/*
  Make sure you have redis installed and that you can run "brew services start redis" on your local machine
*/
 
const redisUrl = "redis://127.0.0.1:6379"
const client = redis.createClient(redisUrl)
client.get = util.promisify(client.get) // enables cache to return a promise

// stores a reference to mongoose's untouched exec function
const exec = mongoose.Query.prototype.exec
