import {debounce} from './utils'

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh,50)

    this.itemImgListener = () => {
      refresh()
      // this.$refs.scroll.refresh()
    }
    this.$bus.$on('imageLoad',this.itemImgListener)
    console.log(111);
  }
}