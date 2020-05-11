<template>
	<div class="recommendView">
			<div v-for="item in recommends" class="recommend-item">
					<div>
							<img :src="item.image" alt="">
							<div>{{item.title}}</div>
					</div>
			</div>
	</div>
</template>

<script>
    export default {
			name: "RecommendView",
			props: {
			  recommends:{
			    type: Array,
					default() {
            return [];
          }
        }
			}
    }
</script>

<style scoped>
		.recommendView {
				display: flex;
				width: 100%;
				padding: 10px 0 20px;
				text-align: center;
				font-size: 12px;
		}
		.recommend-item {
				flex: 1;
		}
		.recommend-item img {
				height: 70px;
				width: 70px;
		}

</style>
