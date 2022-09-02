<template>
  <app-drop @drop="moveTaskOrColumn">
    <app-drag
      class="column"
      :transferData="{
        type: 'column',
        fromColumnIndex: columnIndex
      }">
      <div class="name-option flexBetween">
        <div class="column-name">
          {{ column.name }}
        </div>

        <div
          class="options"
          v-click-out-side="closeModal">
          <div
            class="dots-icon"
            @click="dotsOpen = !dotsOpen">
            <font-awesome-icon icon="ellipsis-h"></font-awesome-icon>
          </div>

          <ul
            class="options-list"
            v-if="dotsOpen">
            <li>
              Edit name
              <font-awesome-icon :icon="['far', 'edit']"></font-awesome-icon>
            </li>
            <li @click="deleteColumn(columnIndex)">
              Remove column
              <font-awesome-icon :icon="['far', 'trash-alt']" class="delete"></font-awesome-icon>
            </li>
          </ul>
        </div>
      </div>

      <div class="task-list">
        <BoardTask
          v-for="(task, $taskIndex) of column.tasks"
          :key="$taskIndex"
          :board="board"
          :column="column"
          :columnIndex="columnIndex"
          :task="task"
          :taskIndex="$taskIndex">
        </BoardTask>
      </div>

      <input
        type="text"
        class="block p-2 w-full bg-transparent"
        placeholder="+ Enter new task"
        @keyup.enter="createTask($event, column.tasks)"
      />
    </app-drag>
  </app-drop>
</template>

<script>
  import BoardTask from "./BoardTask";
  import moving from "../mixins/moving";
  import AppDrag from "./drag_drop/AppDrag";
  import AppDrop from "./drag_drop/AppDrop";
  import ClickOutSide from 'vue-click-outside'

  export default {
    data() {
      return {
        dotsOpen: false
      }
    },

    components: {
      AppDrag,
      AppDrop,
      BoardTask
    },

    mixins: [moving],

    directives: {
      ClickOutSide
    },

    methods: {
      createTask(event, tasks) {
        if (event.target.value === '') {
          return
        } else {
          this.$store.commit('createTask', {
            tasks,
            name: event.target.value
          });
        }
        event.target.value = ''
      },
      closeModal() {
        if (this.dotsOpen) {
          this.dotsOpen = false
        }
      },
      deleteColumn(columnIndex) {
        this.$store.commit('deleteColumn', {
          columnIndex
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .name-option {
    color: #35495e;
    font-weight: bold;
    margin: 0 0 10px;

    .column-name {
      cursor: pointer;
    }

    .options {
      position: relative;

      .dots-icon {
        padding: 5px;
        cursor: pointer;

        svg {
          font-size: 20px;
        }
      }

      .options-list {
        position: absolute;
        top: 70px;
        left: 100px;
        transform: translate(-50%, -50%);
        background-color: #eee;
        border-radius: 5px;
        width: 200px;
        line-height: 2;

        li {
          font-weight: normal;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 5px 10px;
          font-size: 13px;
          cursor: pointer;
          transition: .3s ease-out;

          &:first-child {
            border-radius: 5px 5px 0 0 ;
          }

          &:last-child {
            border-radius: 0 0 5px 5px;
          }

          &:hover {
            background-color: #e0e0e0;
          }
        }
      }
    }
  }

  .task-list {
    max-height: 75vh;
    overflow-y: auto;
    padding-right: 5px;
  }
</style>
