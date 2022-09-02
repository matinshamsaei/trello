<template>
  <div class="task-view">
    <div class="content">
      <input class="input"
             type="text"
             :value="task.name"
             placeholder="Task name"
             @change="updateContent($event, 'name')"
             @keyup.enter="updateContent($event, 'name')">
      <br>
      <textarea :value="task.description"
                @change="updateContent($event, 'description')"
                placeholder="write a description">
        {{ task.description }}
      </textarea>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters(['getTask']),

      task() {
        return this.getTask(this.$route.params.id)
      },
    },

    methods: {
      updateContent(event, key) {
        this.$store.commit('updateTask', {
          task: this.task,
          key,
          value: event.target.value
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .task-view {
    margin: auto;
    max-width: 700px;
    min-width: 500px;

    .content {
      text-align: left;
      width: 100%;
      min-height: 100px;
      padding: 10px;
      background-color: white;
      border-radius: 10px;
      color: black;

      input, textarea {
        width: 100%;

        &:focus {
          outline: none;
        }
      }

      .input {
        border-bottom: 1px solid #eee;
        padding-bottom: 10px;
        margin-bottom: 10px;
      }
    }
  }
</style>
