export default {
  methods: {
    // important
    moveTaskOrColumn(transferData) {
      if (transferData.type === 'task') {
        this.moveTask(transferData)
      } else {
        this.moveColumn(transferData)
      }
    },
    moveTask({ fromColumnIndex, fromTaskIndex }) {
      const fromTasks = this.board.columns[fromColumnIndex].tasks;

      this.$store.commit('moveTask', {
        fromTasks,
        toTasks: this.column.tasks,
        fromTaskIndex,
        toTaskIndex: this.taskIndex
      })
    },
    moveColumn({ fromColumnIndex }) {
      this.$store.commit('moveColumn', {
        fromColumnIndex,
        toColumnIndex: this.columnIndex
      })
    },
  },

  props: {
    board: {
      type: Object,
      required: true
    },
    column: {
      type: Object,
      required: true
    },
    columnIndex: {
      type: Number,
      required: true
    },
  },
};
