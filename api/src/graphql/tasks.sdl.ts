export const schema = gql`
  type Task {
    id: String!
    title: String!
    isComplete: Boolean!
    createdAt: DateTime!
    Category: Category!
    categoryId: String!
  }

  type TaskPage {
    tasks: [Task!]!
    total: Int!
  }

  type Query {
    taskPage(page: Int): TaskPage @requireAuth
    tasks: [Task!]! @requireAuth
    task(id: String!): Task @requireAuth
  }

  input CreateTaskInput {
    title: String!
    isComplete: Boolean!
    categoryId: String!
  }

  input UpdateTaskInput {
    title: String
    isComplete: Boolean
    categoryId: String
  }

  type Mutation {
    createTask(input: CreateTaskInput!): Task! @requireAuth
    updateTask(id: String!, input: UpdateTaskInput!): Task! @requireAuth
    deleteTask(id: String!): Task! @requireAuth
  }
`
