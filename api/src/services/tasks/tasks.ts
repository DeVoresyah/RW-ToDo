import type {
  QueryResolvers,
  MutationResolvers,
  TaskResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const tasks: QueryResolvers['tasks'] = () => {
  return db.task.findMany()
}

export const taskPage: QueryResolvers['taskPage'] = async ({ page }) => {
  const offset = ((page ?? 1) - 1) * 6

  return {
    tasks: await db.task.findMany({
      take: 6,
      skip: offset,
      orderBy: { createdAt: 'desc' },
    }),
    total: await db.task.count(),
  }
}

export const task: QueryResolvers['task'] = ({ id }) => {
  return db.task.findUnique({
    where: { id },
  })
}

export const createTask: MutationResolvers['createTask'] = ({ input }) => {
  return db.task.create({
    data: input,
  })
}

export const updateTask: MutationResolvers['updateTask'] = ({ id, input }) => {
  return db.task.update({
    data: input,
    where: { id },
  })
}

export const deleteTask: MutationResolvers['deleteTask'] = ({ id }) => {
  return db.task.delete({
    where: { id },
  })
}

export const Task: TaskResolvers = {
  Category: (_obj, { root }) =>
    db.task.findUnique({ where: { id: root.id } }).Category(),
}
