<template>
  <div class="board" id="board">
    <div class="columns">
      <board-column
        v-for="(column, $columnIndex) of board.columns"
        :key="$columnIndex"
        :board="board"
        :column="column"
        v-on:dotsOpen=""
        :columnIndex="$columnIndex">
      </board-column>

      <div class="column">
        <input class="newColumnInp"
               type="text"
               placeholder="+ Create now column"
               v-model="columnName"
               @keyup.enter="createColumn">
      </div>
    </div>

    <div
      class="task-modal"
      v-if="isModalOpen"
      @click.self="close">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import BoardColumn from "../components/BoardColumn";
  import { mapState } from "vuex";

  export default {
    components: {
      BoardColumn
    },

    data() {
      return {
        columnName: ''
      }
    },

    computed: {
      ...mapState([
        'board'
      ]),

      isModalOpen() {
        return this.$route.name === 'task'
      }
    },

    methods: {
      createColumn() {
        this.$store.commit('createColumn', {
          name: this.columnName
        });

        this.columnName = ''
      },
      close(dotsOpen) {
        this.$router.push({name: 'board'});
        dotsOpen = false
      }
    },
  }
</script>

<style lang="scss">
  .board {
    position: relative;
    height: 100%;
    background-color: #35495e;
    padding: 15px 20px;
    overflow-y: hidden;

    .newColumnInp {
      border: none;
      width: 100%;
      background: transparent;
      margin-right: 40px;

      &:focus {
        outline: none;
      }

      &::placeholder {
        color: #333;
      }
    }

    .task-modal {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
