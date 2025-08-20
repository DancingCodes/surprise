<template>
	<div class="video">
		<div class="videoBox" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
			<div class="videoItem" v-for="(i, idx) in displayList" :key="i.id"
				:style="{top: `${(idx - 1) * screenHeight}px`}">
				<video :src="i.videoSrc" :id="`video${i.id}`" loop :controls="false" object-fit="cover"></video>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				videoList: [], // 所有视频列表
				displayList: [], // 当前显示的三条视频
				currentIndex: 0, // 当前播放索引
				screenHeight: 0,
				scrollData: {
					startY: 0,
					moveY: 0,
					isTransition: false
				}
			}
		},
		onLoad() {
			this.screenHeight = uni.getSystemInfoSync().windowHeight
			this.getList()
		},
		methods: {
			getList() {
				const res = [
					"https://alimov2.a.kwimgs.com/upic/2023/12/21/16/BMjAyMzEyMjExNjEzNDNfMTAyNzY2NDk1MV8xMjAxNzc0MzgyNTdfMV8z_b_B1fa8b1158ae14559830d8ade4f510f02.mp4",
					"https://alimov2.a.kwimgs.com/upic/2023/11/24/11/BMjAyMzExMjQxMTQ1NThfODEwNTYyNjg3XzExNzkxNTA1Mzc3M18xXzM=_b_B8627dfbe86e0f53c3b853aa47b496549.mp4",
					"https://alimov2.a.kwimgs.com/upic/2022/10/16/10/BMjAyMjEwMTYxMDAxMTJfODczNTUwN184NjU1MzgxODQ2OF8xXzM=_b_B622d93ca0b9275a8e533ea16686b9399.mp4"
				]
				this.videoList = res.map(src => ({
					id: uni.$u.guid(),
					videoSrc: src,
					context: null
				}))
				this.updateDisplayList()
				this.$nextTick(() => this.playVideo())
			},

			updateDisplayList() {
				const prev = this.videoList[this.currentIndex - 1] || {
					id: 'empty_prev',
					videoSrc: ''
				}
				const curr = this.videoList[this.currentIndex]
				const next = this.videoList[this.currentIndex + 1] || {
					id: 'empty_next',
					videoSrc: ''
				}
				this.displayList = [prev, curr, next]
				this.$nextTick(() => {
					this.displayList.forEach(i => {
						if (i.id && i.videoSrc) {
							i.context = uni.createVideoContext('video' + i.id, this)
						}
					})
				})
			},

			onTouchStart(e) {
				this.scrollData.startY = e.touches[0].clientY
				this.scrollData.isTransition = false
			},

			onTouchMove(e) {
				this.scrollData.moveY = this.scrollData.startY - e.touches[0].clientY
			},

			onTouchEnd() {
				const y = this.scrollData.moveY
				if (y >= 100 && this.currentIndex < this.videoList.length - 1) {
					this.currentIndex++
				} else if (y <= -100 && this.currentIndex > 0) {
					this.currentIndex--
				}
				this.scrollData.moveY = 0
				this.scrollData.isTransition = true
				this.updateDisplayList()
				this.$nextTick(() => this.playVideo())
			},

			playVideo() {
				// 只播放当前视频，暂停前后视频
				this.displayList.forEach((i, idx) => {
					if (!i.context) return
					if (idx === 1) {
						i.context.play()
					} else {
						i.context.pause()
					}
				})
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
		padding: 20rpx;
		box-sizing: border-box;

		.videoBox {
			width: 100%;
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