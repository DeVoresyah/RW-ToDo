import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.CategoryCreateArgs>({
  category: {
    one: { data: { title: 'String', slug: 'String', color: 'String' } },
    two: { data: { title: 'String', slug: 'String', color: 'String' } },
  },
})

export type StandardScenario = typeof standard
