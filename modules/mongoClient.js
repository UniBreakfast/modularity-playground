const {MongoClient, ObjectId} = require('mongodb')
const options = { useNewUrlParser: true, useUnifiedTopology: true }


module.exports = {ObjectId,
  async connect(uri, dbName) {
    const client = await new MongoClient(uri, options).connect()
    return dbName ? client.db(dbName) : client
  }
}
