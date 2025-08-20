<template>
	<div class="video">
		<div class="videoBox" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
			<div class="scrollBox" :class="{Transition: scrollData.isTransition}"
				:style="{top: `${scrollData.currentPage * -100}%`, transform: `translateY(${scrollData.moveY * -1}px)`}">
				<div class="videoItem" v-for="i in videoList">
					<video :src="i.videoSrc" :id="`video${i.id}`" loop :controls="false"></video>
				</div>
			</div>
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
					currentPage: 0,
					startY: 0,
					moveY: 0,
					isTransition: false
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
				// 记录起始值
				this.scrollData.startY = e.touches[0].clientY
				// 关闭过渡
				this.scrollData.isTransition = false
			},
			onTouchMove(e) {
				// 记录偏移量
				this.scrollData.moveY = this.scrollData.startY - e.changedTouches[0].clientY
			},
			onTouchEnd() {
				let currentPage = this.scrollData.currentPage
				const y = this.scrollData.moveY

				// 开启过渡
				this.scrollData.isTransition = true

				// 重置滑动偏移量
				this.scrollData.moveY = 0
				// 下一个
				if (y >= 100) {
					if (this.scrollData.currentPage >= this.videoList.length - 1) {
						return
					}
					currentPage++
				}
				// 上一个
				if (y <= -100) {
					if (this.scrollData.currentPage <= 0) {
						return
					}
					currentPage--
				}
				this.playVideo(currentPage)
			},
			playVideo(currentPage) {
				if(currentPage === this.scrollData.currentPage) {
					return
				}
				// 暂停上一个
				this.videoList[this.scrollData.currentPage].context.pause()
				// 记录当前
				this.scrollData.currentPage = currentPage
				// 播放当前
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
		padding: 20rpx;
		/* #ifdef APP-PLUS */
		padding-top: var(--status-bar-height);
		/* #endif */
		box-sizing: border-box;

		.videoBox {
			height: 100%;
			overflow: hidden;
			position: relative;

			.scrollBox {
				height: 300%;
				display: flex;
				flex-direction: column;
				position: relative;

				.videoItem {
					width: 100%;
					flex: 1;

					video {
						width: 100%;
						height: 50%;
						display: block;
					}
				}
			}

			.Transition {
				transition: all 0.3s;
			}

		}
	}
</style>