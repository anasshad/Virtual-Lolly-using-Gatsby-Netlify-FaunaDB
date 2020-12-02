const { ApolloServer, gql } = require("apollo-server-lambda")
const shortid = require("shortid")
var faunadb = require("faunadb"),
  q = faunadb.query

var client = new faunadb.Client({
  secret: "fnAD76nwPJACAX8qQCHdJz7Qqjb-xHTlzAO0WrrP",
})

const typeDefs = gql`
  type Query {
    allLollies: [Lolly!]
    lollyByLink(link: String!): Lolly
  }
  type Mutation {
    addLolly(
      cl1: String!
      cl2: String!
      cl3: String!
      to: String!
      msg: String!
      from: String!
    ): Lolly
  }
  type Lolly {
    id: ID!
    cl1: String!
    cl2: String!
    cl3: String!
    to: String!
    msg: String!
    from: String!
    link: String!
  }
`

const resolvers = {
  Query: {
    allLollies: (root, args, context) => {
      try {
        const result = client.query(
          q.Map(
            q.Paginate(q.Match(q.Index("all_lollies"))),
            q.Lambda(x => q.Get(x))
          )
        )
        return result.data.map(d => ({
          id: d.ts,
          cl1: d.data.cl1,
          cl2: d.data.cl2,
          cl3: d.data.cl3,
          to: d.data.to,
          msg: d.data.msg,
          from: d.data.from,
          link: d.data.link,
        }))
      } catch (error) {
        console.log(error)
      }
    },
    lollyByLink: async (root, args, context) => {
      try {
        console.log('args: ', args)
        const result = await client.query(
          q.Get(q.Match(q.Index('lollies_by_link'), args.link))
        )        
        return result.data;
      } catch (error) {
        console.log(error)
      }
    }
  },
  Mutation: {
    addLolly: async (_, { cl1, cl2, cl3, to, from, msg }) => {
      try {
        const result = await client.query(
          q.Create(q.Collection("lollies"), {
            data: {
              cl1,
              cl2,
              cl3,
              to,
              from,
              msg,
              link: shortid.generate(),
            },
          })
        )
        console.log(result)
        return result.data
      } catch (error) {
        console.log(error)
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

module.exports = { handler }
