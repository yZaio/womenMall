<template>
  <div id="app" class="wrapper">
		<keep-alive exclude="Detail">
			<router-view/>
		</keep-alive>

    <main-tar-bar/>
  </div>
</template>

<script>
import mainTarBar from 'components/content/MainTabBar/MainTabBar'

export default {
  name: 'App',
  components: {
    mainTarBar
  }
}
</script>

<style>
  @import "assets/css/base.css";

</style>
