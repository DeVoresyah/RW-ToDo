import type {
  QueryResolvers,
  MutationResolvers,
  CategoryResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const categories: QueryResolvers['categories'] = () => {
  return db.category.findMany()
}

export const category: QueryResolvers['category'] = ({ id }) => {
  return db.category.findUnique({
    where: { id },
  })
}

export const createCategory: MutationResolvers['createCategory'] = ({
  input,
}) => {
  return db.category.create({
    data: input,
  })
}

export const updateCategory: MutationResolvers['updateCategory'] = ({
  id,
  input,
}) => {
  return db.category.update({
    data: input,
    where: { id },
  })
}

export const deleteCategory: MutationResolvers['deleteCategory'] = ({ id }) => {
  return db.category.delete({
    where: { id },
  })
}

export const Category: CategoryResolvers = {
  tasks: (_obj, { root }) =>
    db.category.findUnique({ where: { id: root.id } }).tasks(),
}
