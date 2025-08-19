<template>
	<div class="video" @touchstart="onTouchStart" @touchend="onTouchEnd">
		<div class="videoScrollBox" v-for="(i, index) in videoList" :key="i.id" v-show="currentIndex === index">
			<video class="videoItem" :src="i.videoSrc" :id="`video${i.id}`" loop :controls="false"></video>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				videoList: [],
				currentIndex: 0,
				startY: 0
			}
		},
		onLoad() {
			this.getList()
		},
		methods: {
			getList() {
				const res = [
					"https://www.w3school.com.cn/i/movie.mp4",
					"https://media.w3.org/2010/05/sintel/trailer.mp4",
					"https://media.w3.org/2010/05/bunny/trailer.mp4"
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
					// 播放第一个视频
					this.playVideo(0)
				})
			},
			onTouchStart(e) {
				this.startY = e.touches[0].clientY
			},
			onTouchEnd(e) {
				const endY = e.changedTouches[0].clientY
				const diff = endY - this.startY

				if (diff > 50) {
					// 下滑
					this.prevVideo()
				} else if (diff < -50) {
					// 上滑
					this.nextVideo()
				}
			},
			nextVideo() {
				const next = this.currentIndex + 1
				if (next < this.videoList.length) {
					this.switchVideo(next)
				}
			},
			prevVideo() {
				const prev = this.currentIndex - 1
				if (prev >= 0) {
					this.switchVideo(prev)
				}
			},
			switchVideo(index) {
				this.pauseVideo(this.currentIndex)
				this.currentIndex = index
				this.playVideo(this.currentIndex)
			},
			playVideo(index) {
				const i = this.videoList[index]
				if (i?.context) i.context.play()
			},
			pauseVideo(index) {
				const i = this.videoList[index]
				if (i?.context) i.context.pause()
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

		.videoScrollBox {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;

			.videoItem {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>