<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import 'assets/tailwind.css';

body, html {
  height: 100%;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

::-webkit-scrollbar {
  background-color: #eee;
  height: 10px;
  width: 10px;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb {
  background-color: #9a9a9a;
  border-radius: 5px;
}

input {
  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #555;
  }
}

.flexBetween {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.delete {
  color: rgb(255, 124, 138);
}

.columns {
  display: flex;
  align-items: flex-start;
  max-height: 100%;

  .column {
    border-radius: 5px;
    text-align: left;
    margin-right: 30px;
    padding: 10px 20px;
    min-width: 350px;
    max-height: 95vh;
    background-color: #c8c8c8;
  }
}
</style>
