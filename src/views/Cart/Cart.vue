<template>
	<div class="cart">
		<cart-nav-bar></cart-nav-bar>
		<cart-list></cart-list>
		<cart-bottom-bar></cart-bottom-bar>
	</div>

</template>

<script>
	import CartNavBar from "./childComps/CartNavBar";
	import CartList from "./childComps/CartList";
	import CartBottomBar from "./childComps/CartBottomBar";

  export default {
    name: "Cart",
		components: {
      CartNavBar,
      CartList,
      CartBottomBar
		},
  }
</script>

<style scoped>
	.cart {
		height: 100vh;
	}
</style>