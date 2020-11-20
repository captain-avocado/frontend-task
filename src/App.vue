<template>
  <div id="app">
    <KeywordsTable />
  </div>
</template>

<script>
import KeywordsTable from './components/KeywordsTable.vue'

export default {
  name: 'App',
  components: {
    KeywordsTable
  }
}
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
</style>
