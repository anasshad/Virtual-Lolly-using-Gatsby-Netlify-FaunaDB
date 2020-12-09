const path = require(`path`)
var faunadb = require("faunadb"),
  q = faunadb.query

var client = new faunadb.Client({
  secret: "fnAD76nwPJACAX8qQCHdJz7Qqjb-xHTlzAO0WrrP",
})

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions
  const lollyTemplate = path.resolve(`src/templates/lolly.tsx`)

  createRedirect({
    fromPath: "/lolly/*",
    toPath: "/.netlify/functions/showLolly?id=:splat",
    isPermanent: false
  })

  try {
    const result = await client.query(
      q.Map(
        q.Paginate(q.Match(q.Index("all_lollies"))),
        q.Lambda(x => q.Get(x))
      )
    )
    console.log(result)
    return result.data.map(d =>
      createPage({
        path: `lolly/${d.data.link}`,
        component: lollyTemplate,
        context: {
          link: d.data.link,
        },
      })
    )
  } catch (error) {
    console.log(error)
  }
}
