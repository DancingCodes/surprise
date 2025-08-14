<template>
	<view class="video">
		<u-loading-page :loading="pageLoading" loading-text="玩命加载中" font-size="30rpx"></u-loading-page>
		<template v-if="!pageLoading">
			<swiper v-if="videoList.length" class="swiper" vertical @change="swiperChange">
				<swiper-item v-for="(item,index) in videoList">
					<video class="swiperItem" :src="item.videoSrc" :id="`video${item.id}`" loop :controls="false"
						:show-fullscreen-btn="false"></video>
				</swiper-item>
			</swiper>
			<u-empty v-else iconSize="0" text="空空如也" marginTop="500rpx"></u-empty>
		</template>
	</view>
</template>

<script>
	import {
		video
	} from '@/api/index.js'
	export default {
		data() {
			return {
				pageLoading: true,
				videoList: [],
				swiperCurrentId: null
			}
		},
		async onLoad() {
			this.pageLoading = true
			await this.getVideoList()
			this.swiperCurrentId = this.videoList[0]?.id
			this.pageLoading = false

			// #ifdef APP
			// 默认自动播放第一个
			if (this.videoList.length) {
				this.playVideo(0)
			}
			// #endif
		},
		methods: {
			async getVideoList() {
				const res = await video()
				res.data = res.data.map(i => ({
					videoSrc: i,
					id: uni.$u.guid(),
					context: null
				}))

				this.videoList.push(...res.data)

				this.$nextTick(() => {
					res.data.forEach((item, index) => {
						item.context = uni.createVideoContext(`video${item.id}`)
					})
				})
			},

			swiperChange(e) {
				// 暂停上一个
				this.videoList.find(i => i.id === this.swiperCurrentId).context.pause()
				// 记录当前VideoId
				this.swiperCurrentId = this.videoList[e.detail.current].id
				// 播放当前
				this.videoList.find(i => i.id === this.swiperCurrentId).context.play()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.video {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		padding: 20rpx;
		box-sizing: border-box;

		.swiper {
			height: 100%;

			.swiperItem {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>