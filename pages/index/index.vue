<template>
	<view class="index">
		<u-swiper :list="swiperData.list" keyName="imgUrl" indicator indicatorMode="dot" circular
			:loading="swiperData.loading"></u-swiper>

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
								imgUrl: "https://filestore.moonc.love/uploadFiles/1755064512387-279027339.png",
							}, {
								id: 2,
								imgUrl: "https://filestore.moonc.love/uploadFiles/1755064512387-279027339.png",
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
								title: "1.0版本强势上线！！！",
							}, {
								id: 2,
								title: "1.0版本强势上线！！！",
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
		box-sizing: border-box;
	}
</style>