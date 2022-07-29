import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.TaskCreateArgs>({
  task: {
    one: {
      data: {
        title: 'String',
        isComplete: true,
        Category: {
          create: { title: 'String', slug: 'String', color: 'String' },
        },
      },
    },
    two: {
      data: {
        title: 'String',
        isComplete: true,
        Category: {
          create: { title: 'String', slug: 'String', color: 'String' },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
