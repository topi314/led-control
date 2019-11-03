<template>
  <div id="app">
    <led-control />
  </div>
</template>

<script>
import LedControl from './components/LedControl'

export default {
  name: 'app',
  components: {
    LedControl
  }
}
</script>

<style>
body, html{
  background-color: #2c3e50;
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  height: 100%;
}
</style>
