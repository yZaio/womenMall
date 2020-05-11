<template>
    <ul>
			<li v-for="item in $store.state.cartList">{{item}}</li>
		</ul>
</template>

<script>
    export default {
        name: "Profile"
    }
</script>

<style scoped>

</style>
