<template>
	<div class="detail">
		<detail-nav-bar @navBarClick="navBarClick" class="detail-nav" ref="detailNavBar"></detail-nav-bar>

		<scroll class="content" ref="scroll" @scroll="commentScroll" :probe-type="3">
			<ul><li v-for="item in $store.state.cartList">{{item}}</li></ul>
			<detail-swiper :top-images="topImages"></detail-swiper>
			<detail-base-info :goods="goods"></detail-base-info>
			<detail-shop-info :shop="shop"></detail-shop-info>
			<detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
			<detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
			<detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
			<goods-list ref="recommend" :goods="recommends"></goods-list>
		</scroll>
		<detail-bottom-bar @addToCart="addCart"></detail-bottom-bar>
		<back-top v-show="backTopIsShow" @click.native="backClick"></back-top>

		<toast ref="toast"/>



	</div>
</template>

<script>
	import DetailNavBar from "./childComps/DetailNavBar";
	import DetailSwiper from "./childComps/DetailSwiper";
	import DetailBaseInfo from "./childComps/DetailBaseInfo";
	import DetailShopInfo from "./childComps/DetailShopInfo";
	import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
	import DetailParamInfo from "./childComps/DetailParamInfo";
	import DetailCommentInfo from "./childComps/DetailCommentInfo";
	import DetailBottomBar from "./childComps/DetailBottomBar";

	import Scroll from "components/common/scroll/Scroll";
	import GoodsList from "components/content/goods/GoodsList";
	import BackTop from "components/content/backTop/BackTop";

	import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail";

  import Toast from 'components/common/toast/Toast'

  export default {
    name: "Detail",
		components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      Scroll,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      BackTop,
      Toast
		},
		data() {
      return {
        iid: null,
        topImages: [],
				goods: {},
				shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
				recommends: [],
				themeTopsY: [],
				currentIndex: 0,
        backTopIsShow: false
			}
		},
		created() {
			this.iid = this.$route.params.iid

      getDetail(this.iid).then(res => {
        // console.log(res)
				const data = res.result

				//1.轮播图
				this.topImages = data.itemInfo.topImages

				//2.商品信息
				this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // console.log(this.goods);

        //3.商家信息
				this.shop = new Shop(data.shopInfo)

				//4.商品详情图片
        this.detailInfo = data.detailInfo;


				//5.获取商品参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        // 6.保存评论数据
        if (data.rate.list) {
          this.commentInfo = data.rate.list[0];
        }
      })

      getRecommend().then(res => {
        console.log(res)
				this.recommends = res.data.list
			})

    },
		methods: {
      imageLoad() {
        this.$refs.scroll.refresh()

				this.themeTopsY.push(0)
				this.themeTopsY.push(this.$refs.param.$el.offsetTop)
				this.themeTopsY.push(this.$refs.comment.$el.offsetTop)
				this.themeTopsY.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopsY.push(Number.MAX_VALUE)
      },

      navBarClick(index) {
        this.$refs.scroll.scrollTo(0,-(this.themeTopsY[index]-44),500)
			},

      commentScroll(position) {

        this.backTopIsShow = (-position.y) > 1000

        // console.log(position);
				for(var i = 0;i < this.themeTopsY.length-1;i++) {
				  // console.log(i)
					if(this.currentIndex !== i && (-position.y+44) > this.themeTopsY[i] && (-position.y+44) < this.themeTopsY[i+1]){
					  // console.log(0)
						this.currentIndex = i
						// console.log(this.currentIndex)
						this.$refs.detailNavBar.currentIndex = this.currentIndex
					}

				}
      },

      backClick() {
        this.$refs.scroll.scrollTo(0,0,300)
      },

      addCart() {
        var product = {}
        product.img = this.topImages[0]
				product.desc = this.goods.desc
				product.price = this.goods.realPrice
				product.title = this.goods.title
				product.iid = this.iid

        this.$store.commit('addCart',product)
        this.$toast({message: '加入购物车成功'})
			}
		}
  }
</script>

<style scoped>
	.detail {
		position: relative;
		z-index: 9;
		background-color: #fff;
		height: 100vh;
	}
	.detail-nav {
		position: relative;
		z-index: 9;
		background-color: #fff;
	}
	.content {
		height: calc(100% - 44px - 49px);
		overflow:hidden;
	}
</style>