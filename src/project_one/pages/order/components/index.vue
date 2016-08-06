<template>
  <div id="toolbar">
    <div>{{getIndexState.number}}</div>
    <button v-on:click="alertSomeThing(getIndexState.number)">弹出某些东西</button>
    <a v-link="{ path: '/user', exact: true }">go User</a><br>
    <a v-link="{ path: '/home', exact: true }">go home</a>
  </div>
</template>

<script>
import {  getIndexState } from '../vuex/getters'
import { alertSomeThing } from '../vuex/action'

export default {
  components:{
  },
  vuex: {
    getters: {
      getIndexState
    },
    actions: {
      alertSomeThing
    }
  },
  ready:function(){
    console.log($('#toolbar').css({background:'#ccc'}))
  },
}
</script>


