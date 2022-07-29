export const schema = gql`
  type Category {
    id: String!
    title: String!
    slug: String!
    color: String!
    createdAt: DateTime!
    tasks: [Task]!
  }

  type Query {
    categories: [Category!]! @requireAuth
    category(id: String!): Category @requireAuth
  }

  input CreateCategoryInput {
    title: String!
    slug: String!
    color: String!
  }

  input UpdateCategoryInput {
    title: String
    slug: String
    color: String
  }

  type Mutation {
    createCategory(input: CreateCategoryInput!): Category! @requireAuth
    updateCategory(id: String!, input: UpdateCategoryInput!): Category!
      @requireAuth
    deleteCategory(id: String!): Category! @requireAuth
  }
`
