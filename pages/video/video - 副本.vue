<template>
	<div class="video">
		<div class="videoBox" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
			<div class="videoItem" v-for="(i,x) in videoList" :key="i.id" :style="{
					top: `${(x - scrollData.currentPage) * 100}%`,
					transform: `translateY(${scrollData.moveY * -1}px)`
				}">
				<video :src="i.videoSrc" :id="`video${i.id}`" loop :controls="false"></video>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				videoList: [],
				scrollData: {
					currentPage: 0,
					startY: 0,
					moveY: 0,
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
						i.context = uni.createVideoContext('video' + i.id)
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
				let currentPage = this.scrollData.currentPage
				const y = this.scrollData.moveY
				this.scrollData.moveY = 0

				if (y >= 100) {
					if (this.scrollData.currentPage >= this.videoList.length - 1) {
						return
					}
					currentPage++
				}
				if (y <= -100) {
					if (this.scrollData.currentPage <= 0) {
						return
					}
					currentPage--
				}
				this.playVideo(currentPage)
			},
			playVideo(currentPage) {
				if (currentPage === this.scrollData.currentPage) return
				this.videoList[this.scrollData.currentPage].context.pause()
				this.scrollData.currentPage = currentPage
				this.videoList[this.scrollData.currentPage].context.play()
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

		.videoBox {
			height: 100%;
			overflow: hidden;
			position: relative;

			.videoItem {
				position: absolute;
				width: 100%;
				height: 100%;

				video {
					width: 100%;
					height: 100%;
					display: block;
				}
			}
		}
	}
</style>