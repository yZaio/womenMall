<template>
	<div class="goods-item" @click="detailClick">
		<img :src="showImage" alt="" @load="imgLoad">

		<div class="goods-info">
			<p>{{goodsItem.title}}</p>
			<span class="price">¥{{goodsItem.price}}</span>
			<span class="collect">{{goodsItem.cfav}}</span>
		</div>
	</div>
</template>

<script>
  export default {
    name: "GoodsItem",
		props: {
      goodsItem: {
        type: Object,
				default() {
          return {}
				}
			},
		},
		computed: {
      showImage() {
				return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
			}
		},
		methods: {
      imgLoad() {
        // console.log('1111')
        // console.log(this.$bus);
				this.$bus.$emit('imageLoad')
      },

      detailClick() {
        this.$router.push('/detail/'+this.goodsItem.iid)
			}

		}
  }
</script>

<style scoped>
	.goods-item {
		padding-bottom: 40px;
		position: relative;

		width: 48%;
	}

	.goods-item img {
		width: 100%;
		border-radius: 5px;
	}

	.goods-info {
		font-size: 12px;
		position: absolute;
		bottom: 5px;
		left: 0;
		right: 0;
		overflow: hidden;
		text-align: center;
	}

	.goods-info p {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-bottom: 3px;
	}

	.goods-info .price {
		color: var(--color-high-text);
		margin-right: 20px;
	}

	.goods-info .collect {
		position: relative;
	}

	.goods-info .collect::before {
		content: '';
		position: absolute;
		left: -15px;
		top: -1px;
		width: 14px;
		height: 14px;
		background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
	}
	/*.goods-item {*/
	/*	padding-bottom: 40px;*/
	/*	position: relative;*/
	/*	width: 48%;*/
	/*}*/
	/*.goods-item img {*/
	/*	width: 100%;*/
	/*	border-radius: 5px;*/
	/*}*/
	/*.goods-item .content {*/
	/*	position: absolute;*/
	/*	left: 0;*/
	/*	right: 0;*/
	/*	border-bottom: 5px;*/
	/*	text-align: center;*/
	/*	font-size: 12px;*/
	/*	overflow: hidden;*/
	/*}*/
	/*.title {*/
	/*	overflow: hidden;*/
	/*	white-space: nowrap;*/
	/*	text-overflow: ellipsis;*/
	/*	margin: 2px 0;*/
	/*}*/
	/*.goods-item .price {*/
	/*	color: var(--color-high-text);*/
	/*	margin-right: 20px;*/
	/*}*/
	/*.goods-item .cfav {*/
	/*	position: relative;*/
	/*}*/
	/*.goods-item .cfav::before {*/
	/*	content: '';*/
	/*	position: absolute;*/
	/*	left: -15px;*/
	/*	top: -1px;*/
	/*	width: 14px;*/
	/*	height: 14px;*/
	/*	background: url("~assets/img/common/collect.svg") 0 0/14px 14px;*/
	/*}*/

</style>