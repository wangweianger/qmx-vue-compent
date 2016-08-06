<style scoped>
.container {
  border: 1px solid red;
}
.red {
  color: #f00;
}
.v-link-active{color:red;}
</style>

<template>
  <div class="container">
    <h2 class="red">{{msg}}</h2>
  </div>
  <div>
    <p>当前路径: {{$route.path}}</p>
    <p>当前路由参数: {{$route.params | json}}</p>
    <p>当前路由参数: {{$route.query.name}}</p>
  </div>
<!--   <a v-link="{ path: '/user', exact: true }">go User list</a>
  <a v-link="{ name: 'user', params: { userId: 123 }}">go User userId</a>
  <a v-link="{ name: 'details', params: { details: 1234 }}">go User details</a> -->
</template>

<script>


export default {
  data () {
    return {
      msg: '我这里面是user的 路由',
    }
  },
  ready:function(){
    $('.container').css({background:'#ccc'})
  }
}


</script>