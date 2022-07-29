import { tasks, task, createTask, updateTask, deleteTask } from './tasks'
import type { StandardScenario } from './tasks.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('tasks', () => {
  scenario('returns all tasks', async (scenario: StandardScenario) => {
    const result = await tasks()

    expect(result.length).toEqual(Object.keys(scenario.task).length)
  })

  scenario('returns a single task', async (scenario: StandardScenario) => {
    const result = await task({ id: scenario.task.one.id })

    expect(result).toEqual(scenario.task.one)
  })

  scenario('creates a task', async (scenario: StandardScenario) => {
    const result = await createTask({
      input: {
        title: 'String',
        isComplete: true,
        categoryId: scenario.task.two.categoryId,
      },
    })

    expect(result.title).toEqual('String')
    expect(result.isComplete).toEqual(true)
    expect(result.categoryId).toEqual(scenario.task.two.categoryId)
  })

  scenario('updates a task', async (scenario: StandardScenario) => {
    const original = await task({ id: scenario.task.one.id })
    const result = await updateTask({
      id: original.id,
      input: { title: 'String2' },
    })

    expect(result.title).toEqual('String2')
  })

  scenario('deletes a task', async (scenario: StandardScenario) => {
    const original = await deleteTask({ id: scenario.task.one.id })
    const result = await task({ id: original.id })

    expect(result).toEqual(null)
  })
})
