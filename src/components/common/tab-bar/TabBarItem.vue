<template>
    <div class="tab-bar-item" @click="itemClick">
      <div v-if="!isActive"><slot name="icon1"></slot></div>
      <div v-else><slot name="icon2"></slot></div>
      <div :style="activeStyle"><slot name="text"></slot></div>
    </div>
</template>

<script>
    export default {
        name: "TabBarItem",

        props: {
          path:String,
          activeColor:{
            type: String,
            default: 'red'
          }


        },
      computed:{
          isActive() {
            // return this.$route.path.indexOf(this.path) !==-1
            return this.$route.path === this.path
            // 这里的this.path在每个引用的item里都不相同，每个有每个自己传进来的item  相当于前面maintabbar中定义4个item传进来4个不同的path值，则他里面的4个item的4个this.path值是各自不影响各自不同的，这里定义的这个方法也是每个item里面自己各自定义的，所以maintarbar里4个item有4个不同的方法
          },
        activeStyle() {
          return this.isActive?{color:this.activeColor} : {}
        },

      },


        methods:{
          itemClick(){
            // console.log(this.$route);
            this.$router.replace(this.path)
          }
        }
    }
</script>

<style scoped>
.tab-bar-item{
  flex:1;
  text-align: center;

}
.active{
  color:red;
}

  .tab-bar-item img{
    width: 24px;
    height: 24px;
		/*margin-top: 2px;*/
    margin-bottom: 2px;
  }

</style>
