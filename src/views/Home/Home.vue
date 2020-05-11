<template>
  <div id="home">
    <nav-bar class="navbar">
      <div slot="center">购物街</div>
    </nav-bar>
		<tab-control :titles="['流行','新款','精选']"
								 class="tab-control"
								 @tabClick="tabClick"
								 v-show="isFixed"
								 ref="tabControl1">
		</tab-control>
    <scroll class="content"
						ref="scroll"
						@scroll="backTopShow"
						:probe-type="3"
						:pull-up-load="true"
						@pullingUp="loadMore">
			<home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"></home-swiper>
			<recommend-view :recommends="recommends" class="recommend-view"></recommend-view>
			<feature-view></feature-view>
			<tab-control :titles="['流行','新款','精选']"
									 @tabClick="tabClick"
									 ref="tabControl2">
			</tab-control>
			<goods-list :goods="showGoods"></goods-list>
		</scroll>
		<back-top @click.native="backClick" v-show="backTopIsShow"></back-top>
  </div>

</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
	import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";

  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView"
	import FeatureView from "./childComps/FeatureView";

  import {getHomeMultidata,getHomeGoods} from "network/home";
  import {debounce} from "common/utils"
	// import {itemListenerMixin} from "common/mixin";

  export default {
			name: "Home",
      components:{
				NavBar,
        TabControl,
				HomeSwiper,
        RecommendView,
        FeatureView,
				GoodsList,
        Scroll,
        BackTop
      },
		// mixins: [itemListenerMixin],
      data(){
          return {
            banners: [],
            recommends: [],
						goods: {
							'pop': {page: 0,list: []},
							'new': {page: 0,list: []},
							'sell': {page: 0,list: []},
						},
            currentType: 'pop',
						backTopIsShow: false,
            isFixed: false,
						tabControlOffsetTop: 0,
						saveY: 0
          }
      },
      computed: {
				showGoods() {
				  return this.goods[this.currentType].list
				}
			},
      destroyed() {
        // console.log('destroyed');
      },
      activated() {
        // console.log(this.saveY)

        this.$refs.scroll.scrollTo(0, this.saveY, 1)
        this.$refs.scroll.refresh()
      },
      deactivated() {
        this.saveY = this.$refs.scroll.getScrollY()
        // console.log(this.saveY);


      },
      created() {
				getHomeMultidata().then(res => {
					this.banners = res.data.banner.list;
					this.recommends = res.data.recommend.list
					// console.log(res);
				})

        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')
      },
			mounted() {
				const refresh = debounce(this.$refs.scroll.refresh,50)

        this.$bus.$on('imageLoad',() => {
          // console.log(111);
          refresh()
          // this.$refs.scroll.refresh()
          // console.log(111);
        })
      },


      methods: {

			  getHomeGoods(type) {
          const page = this.goods[type].page+1
					getHomeGoods(type,page).then(res => {
            this.goods[type].list.push(...res.data.list)
            this.goods[type].page += 1

            this.$refs.scroll.finishPullUp()
          })


				},

        tabClick(index){
          switch (index) {
            case 0:
              this.currentType = 'pop'
              break
            case 1:
              this.currentType = 'new'
							break
            case 2:
              this.currentType = 'sell'
							break
          }

          this.$refs.tabControl1.currentIndex = index
          this.$refs.tabControl2.currentIndex = index

				},

        backClick() {
			    this.$refs.scroll.scrollTo(0,0,300)
				},

        backTopShow(position) {
			    this.backTopIsShow = (-position.y) > 1000

					this.isFixed = (-position.y) > this.tabControlOffsetTop


					// console.log(this.isFixed)

				},

        loadMore() {
          // console.log(111)
          this.getHomeGoods(this.currentType)
        },



        swiperImgLoad() {
          // console.log(this.$refs.tabControl2.$el.offsetTop);
					this.tabControlOffsetTop = this.$refs.tabControl2.$el.offsetTop
        }


			}
    }
</script>

<style scoped>
	#home{
			/*padding-top: 44px;*/
			position: relative;
			height: 100vh ;
	}
  .navbar {
    background-color: var(--color-tint);
    color: #fff;
		/*position: fixed;*/
		/*top: 0;*/
		/*left: 0;*/
		/*right: 0;*/
		z-index: 9;
	}
	.recommend-view {
		border-bottom: 10px solid #eee;
	}
	.content {
		overflow: hidden;
		/*margin-top: 44px;*/
		/*height: calc(100% - 93px);*/
		position: absolute;
		top: 44px;
		bottom: 49px;
	}

	.tab-control {
		position: relative;
		z-index: 9;
	}

</style>
