<template>
	<div class="cart-navbar">
		<nav-bar><div slot="center">购物车({{this.$store.getters.cartLength}})</div></nav-bar>
	</div>
</template>

<script>
	import NavBar from "components/common/navbar/NavBar";

  export default {
    name: "CartNavBar",
		components: {
      NavBar
		}
  }
</script>

<style scoped>
	.cart-navbar {
		background-color: var(--color-tint);
		color: #fff;
	}
</style>