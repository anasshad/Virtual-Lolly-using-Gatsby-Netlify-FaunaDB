const faunadb  = require('faunadb')
const q = faunadb.query;
const pageTemplate = require('./redirect');

var client = new faunadb.Client({
  secret: "fnAD76nwPJACAX8qQCHdJz7Qqjb-xHTlzAO0WrrP",
})

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const handler = async (event, context, callback) => {
  try {
    const subject = event.queryStringParameters.id.replace("/","");
  
    console.log(subject)

    const result = await client.query(
      q.Get(q.Match(q.Index('lollies_by_link'), subject))
    )

      console.log(result)

    return callback(null, {
      statusCode: 200,
      body:  pageTemplate(result.data)
    })
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
