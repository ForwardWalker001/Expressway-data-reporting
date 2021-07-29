<template>
  <div id="app">
    <index-com></index-com>
  </div>
</template>

<script>
 import IndexCom from './components/IndexCom.vue'
export default {
  name: 'App',
  components: {
    IndexCom
  }
}
</script>

<style>
/* #app { */
  /* width: 100%; */
  /* height: 100%; */
/* } */
body, html{
  margin: 0;
  padding: 0;
}
</style>
