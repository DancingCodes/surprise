<template>
	<div class="video" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
		<div class="scrollBox"
			:style="{top: `${scrollData.currentPage * -100}%`, transform: `translateY(${scrollData.moveY * -1}px)`}">
			<video class="videoItem" v-for="i in videoList" :src="i.videoSrc" :id="`video${i.id}`" loop
				:controls="false"></video>
		</div>
	</div>
</template>

<script>
	import {
		video
	} from '@/api/index.js'
	export default {
		data() {
			return {
				videoList: [],
				scrollData: {
					currentPage: 1,
					startY: 0,
					moveY: 0
				}
			}
		},
		onLoad() {
			this.getList()
		},
		methods: {
			getList() {
				const res = [
					"https://alimov2.a.kwimgs.com/upic/2023/12/21/16/BMjAyMzEyMjExNjEzNDNfMTAyNzY2NDk1MV8xMjAxNzc0MzgyNTdfMV8z_b_B1fa8b1158ae14559830d8ade4f510f02.mp4?clientCacheKey=3x6jqjbe9pye39s_b.mp4&tt=b&di=78e498d6&bp=14214",
					"https://alimov2.a.kwimgs.com/upic/2023/11/24/11/BMjAyMzExMjQxMTQ1NThfODEwNTYyNjg3XzExNzkxNTA1Mzc3M18xXzM=_b_B8627dfbe86e0f53c3b853aa47b496549.mp4?clientCacheKey=3xn7devj75c23u6_b.mp4&tt=b&di=78e49864&bp=13414",
					"https://alimov2.a.kwimgs.com/upic/2022/10/16/10/BMjAyMjEwMTYxMDAxMTJfODczNTUwN184NjU1MzgxODQ2OF8xXzM=_b_B622d93ca0b9275a8e533ea16686b9399.mp4?clientCacheKey=3xe59hvcyy2jumi_b.mp4&tt=b&di=78e49e79&bp=13414",
				]

				this.videoList = res.map(src => ({
					id: uni.$u.guid(),
					videoSrc: src,
					context: null
				}))

				this.$nextTick(() => {
					this.videoList.forEach(i => {
						i.context = uni.createVideoContext('video' + i.id, this)
					})
				})
			},
			onTouchStart(e) {
				this.scrollData.startY = e.touches[0].clientY
			},
			onTouchMove(e) {
				this.scrollData.moveY = this.scrollData.startY - e.changedTouches[0].clientY
			},

			onTouchEnd() {
				const y = this.scrollData.moveY

				this.scrollData.moveY = 0
				if (y >= 100) {
					if(this.scrollData.currentPage >= 2) {
						return
					}
					this.scrollData.currentPage++
				}

				if (y <= -100) {
					if(this.scrollData.currentPage <= 0) {
						return
					}
					this.scrollData.currentPage--
				}

			}
		}
	}
</script>

<style scoped lang="scss">
	.video {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;

		.scrollBox {
			height: 300%;
			display: flex;
			flex-direction: column;
			position: relative;

			.videoItem {
				width: 100%;
				flex: 1;
				display: block;
			}
		}
	}
</style>