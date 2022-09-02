import Vue from 'vue'
import Vuex from 'vuex'
import defaultBoard from './default-board'
import { saveStatePlugin, uuid } from './utils'

Vue.use(Vuex);

const board = JSON.parse(localStorage.getItem('board')) || defaultBoard;

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  state: {
    board
  },
  getters: {
    getTask: state => {
      return (id) => {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            if (task.id === id) {
              return task
            }
          }
        }
      }
    }
  },
  mutations: {
    createColumn(state, { name }) {
      state.board.columns.push({
        name,
        tasks: []
      })
    },
    createTask (state, { tasks, name }) {
      tasks.push({
        description: '',
        name,
        id: uuid()
      })
    },
    deleteColumn(state, { columnIndex }) {
      state.board.columns.splice(columnIndex, 1)[0]
    },
    deleteTask(state, { columnIndex, taskIndex }) {
      state.board.columns[columnIndex].tasks.splice(taskIndex, 1)[0]
    },
    updateTask (state, { task, key, value }) {
      // ******************* value ro brize tooye key e in task e ******************
      task[key] = value
      // Vue.set(task, key, value)
    },
    moveColumn (state, { fromColumnIndex, toColumnIndex }) {
      const columnList = state.board.columns;
      const movableColumn = columnList.splice(fromColumnIndex, 1)[0];
      columnList.splice(toColumnIndex, 0, movableColumn)
    },
    moveTask (state, { fromTasks, toTasks, fromTaskIndex, toTaskIndex }) {
      const movableTask = fromTasks.splice(fromTaskIndex, 1)[0];
      toTasks.splice(toTaskIndex, 0, movableTask)
    },
  }
})
