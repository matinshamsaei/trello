<template>
  <app-drop @drop="moveTaskOrColumn">
    <app-drag
      class="task"
      :transferData="{
        type: 'task',
        fromColumnIndex: columnIndex,
        fromTaskIndex: taskIndex
      }">
      <!-- we must set .stop to stop doing and dont have compile two mutation -->
      <div
        class="task-name flexBetween">
        <div @click="goToTask(task)">{{ task.name }}</div>
        <div
          @click="deleteTask(columnIndex, taskIndex)"
          class="deleteBtn">
          <font-awesome-icon
            :icon="['far', 'trash-alt']"
            class="delete">
          </font-awesome-icon>
        </div>
      </div>
      <p v-if="task.description">{{ task.description }}</p>
    </app-drag>
  </app-drop>
</template>

<script>
  import moving from "../mixins/moving";
  import AppDrag from "./drag_drop/AppDrag";
  import AppDrop from "./drag_drop/AppDrop";

  export default {
    mixins: [ moving ],

    components: {
      AppDrag,
      AppDrop
    },

    props: {
      task: {
        type: Object,
        required: true
      },
      taskIndex: {
        type: Number,
        required: true
      },
    },

    methods: {
      goToTask(task) {
        this.$router.push({name: 'task', params: {id: task.id}})
      },
      deleteTask(columnIndex, taskIndex) {
        this.$store.commit('deleteTask', {
          columnIndex,
          taskIndex
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .task {
    cursor: pointer;
    box-shadow: 0 0 0.5rem 0 #9e9e9e;
    width: 100%;
    border-radius: 5px;
    background-color: #eee;
    margin-bottom: 15px;
    padding: 10px;

    &:hover .deleteBtn {
      transform: translateX(-5px);
      opacity: 1;
    }

    div {
      color: #555;
      font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      font-size: 15px;
      overflow: hidden;

      .deleteBtn {
        transform: translateX(300px);
        opacity: 0;
        transition: .2s ease-out;
      }
    }

    p {
      font-size: 15px;
      color: #777;
    }
  }
</style>
