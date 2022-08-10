import type {
  QueryResolvers,
  MutationResolvers,
  CategoryResolvers,
} from 'types/graphql'

import { validate } from '@redwoodjs/api'

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
  validate(input.color, {
    format: {
      pattern: /^#(?:[0-9a-fA-F]{3}){1,2}$/,
      message: 'Color must be hex code',
    },
  })

  return db.category.create({
    data: input,
  })
}

export const updateCategory: MutationResolvers['updateCategory'] = ({
  id,
  input,
}) => {
  validate(input.color, {
    format: {
      pattern: /^#(?:[0-9a-fA-F]{3}){1,2}$/,
      message: 'Color must be hex code',
    },
  })

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
