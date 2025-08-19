<template>
	<view class="index">
		<u-swiper :list="swiperData.list" keyName="imgUrl" indicator indicatorMode="dot" circular
			:loading="swiperData.loading" height="360rpx"></u-swiper>

		<u-notice-bar :text="noticeData.list.map(i=> i.title)" direction="column"
			style="margin-top: 20rpx;"></u-notice-bar>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperData: {
					loading: true,
					list: []
				},
				noticeData: {
					loading: true,
					list: []
				}
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			init() {
				this.getSwiper()
				this.getNotice()
			},
			getSwiper() {
				this.swiperData.loading = true
				new Promise((res) => {
					setTimeout(() => {
						res({
							data: [{
								id: 1,
								imgUrl: "https://filestore.moonc.love/uploadFiles/1755584054993-554399180.jpg",
							}, {
								id: 2,
								imgUrl: "https://filestore.moonc.love/uploadFiles/1755584054993-554399180.jpg",
							}]
						})
					}, 1000)
				}).then(res => {
					this.swiperData.list = res.data
				}).finally(() => {
					this.swiperData.loading = false
				})
			},
			getNotice() {
				this.noticeData.loading = true
				new Promise((res) => {
					setTimeout(() => {
						res({
							data: [{
								id: 1,
								title: "老铁没毛病吧！！！",
							}, {
								id: 2,
								title: "我滴宝贝666！！！",
							}]
						})
					}, 1000)
				}).then(res => {
					this.noticeData.list = res.data
				}).finally(() => {
					this.noticeData.loading = false
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.index {
		padding: 20rpx;
		/* #ifdef APP-PLUS */
		padding-top: var(--status-bar-height, 20px);
		/* #endif */
		box-sizing: border-box;
	}
</style>