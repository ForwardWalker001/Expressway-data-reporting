<template>
  <div id="app">
    <!-- <router-link to="/login"></router-link> -->
    <!-- <index-com></index-com> -->
    <router-view></router-view>
  </div>
</template>

<script>
//  import IndexCom from './components/IndexCom.vue'
export default {
  name: 'App',
  components: {
    // IndexCom
  },
  data(){
    return {

    }
  },
  methods:{

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
  height: 100%;
}
</style>
