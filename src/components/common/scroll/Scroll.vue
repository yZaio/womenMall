<template>
	<div class="wrap" ref="wrapper">
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import bScroll from 'better-scroll'

  export default {
    name: "Scroll",
		props: {
      probeType: {
        type: Number,
				default: 0
			},
      pullUpLoad: {
        type: Boolean,
				default: false
			}
		},
		data() {
      return {
        bs: null
			}
		},

		mounted() {
      this.bs = new bScroll(this.$refs.wrapper,{
        probeType: this.probeType,
				click: true,
        pullUpLoad: this.pullUpLoad
			})
			// this.bs.on('scroll',(positon) => {
      //   console.log(positon);
      // })

			if(this.pullUpLoad){
        this.bs.on('pullingUp', () => {
          // this.$emit('pullingUp')
          // console.log('到底部');
					this.$emit('pullingUp')
        })
			}

			if(this.probeType === 2 || this.probeType === 3) {
        this.bs.on('scroll',(position) => {
          // console.log(position);
          this.$emit('scroll',position)
        })
			}

    },
    methods: {
      scrollTo(x, y, time=300) {
        this.bs && this.bs.scrollTo(x, y, time)
      },

      refresh() {
        this.bs && this.bs.refresh()
        // console.log(111);
      },

      finishPullUp() {
        this.bs && this.bs.finishPullUp()
      },

			getScrollY() {
        return this.bs ? this.bs.y : 0
			}

    }

  }
</script>

<style scoped>

</style>