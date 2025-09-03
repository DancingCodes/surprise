<template>

	<div class="video">
		<!-- #ifdef APP-PLUS -->
		<cover-view class="statusBarBg"></cover-view>
		<!-- #endif -->
		<div class="videoBox" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
			<div class="scrollBox" :style="{
					height: `${videoList.length * 100}%`,
					top: `${scrollData.currentPage * -100}%`, 
					transform: `translateY(${scrollData.moveY * -1}px)`
				}">
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
					currentPage: 1,
					startY: 0,
					moveY: 0
				},
			}
		},
		onLoad() {
			this.getList()
		},
		methods: {
			getList() {
				video().then(res => {
					const list = res.data.map(src => ({
						id: uni.$u.guid(),
						videoSrc: src,
						context: null
					}))
					this.videoList.push(...list)
					this.$nextTick(() => {
						list.forEach(i => {
							i.context = uni.createVideoContext(`video${i.id}`)
						})
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
					if (this.scrollData.currentPage >= this.videoList.length - 1) {
						return
					}
					this.videoList[this.scrollData.currentPage].context.pause()
					this.scrollData.currentPage++
					this.videoList[this.scrollData.currentPage].context.play()
				}
				if (y <= -100) {
					if (this.scrollData.currentPage <= 0) {
						return
					}
					this.videoList[this.scrollData.currentPage].context.pause()
					this.scrollData.currentPage--
					this.videoList[this.scrollData.currentPage].context.play()
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

		.statusBarBg {
			position: fixed;
			left: 0;
			top: 0;
			height: var(--status-bar-height);
			width: 100%;
			background-color: #fff;
		}

		.videoBox {
			height: 100%;

			.scrollBox {
				display: flex;
				flex-direction: column;
				position: relative;

				.videoItem {
					flex: 1;
					display: flex;
					flex-direction: column;
					/* #ifdef APP-PLUS */
					padding-top: var(--status-bar-height);
					background-color: #000;
					box-sizing: border-box;
					/* #endif */

					video {
						flex: 1;
						width: 100%;
						display: block;
					}
				}
			}
		}
	}
</style>