/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`)
var faunadb = require("faunadb"),
  q = faunadb.query

var client = new faunadb.Client({
  secret: "fnAD76nwPJACAX8qQCHdJz7Qqjb-xHTlzAO0WrrP",
})

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const lollyTemplate = path.resolve(`src/templates/lolly.tsx`)

  try {
    const result = client.query(
      q.Map(
        q.Paginate(q.Match(q.Index("all_lollies"))),
        q.Lambda(x => q.Get(x))
      )
    )
    return result.data.map(d =>
      createPage({
        path: `${d.data.link}`,
        component: lollyTemplate,
        context: {
          link: d.data.link,
        },
      })
    )
  } catch (error) {
    console.log(error)
  }

  //   return graphql(
  //     `
  //       query allLollies {
  //         allMarkdownRemark(limit: $limit) {
  //           edges {
  //             node {
  //               frontmatter {
  //                 slug
  //               }
  //             }
  //           }
  //         }
  //       }
  //     `,
  //     { limit: 1000 }
  //   ).then(result => {
  //     if (result.errors) {
  //       throw result.errors
  //     }

  //     // Create blog post pages.
  //     result.data.allMarkdownRemark.edges.forEach(edge => {
  //       createPage({
  //         // Path for this page — required
  //         path: `${edge.node.frontmatter.slug}`,
  //         component: blogPostTemplate,
  //         context: {
  //           // Add optional context data to be inserted
  //           // as props into the page component..
  //           //
  //           // The context data can also be used as
  //           // arguments to the page GraphQL query.
  //           //
  //           // The page "path" is always available as a GraphQL
  //           // argument.
  //         },
  //       })
  //     })
  //   })
}
