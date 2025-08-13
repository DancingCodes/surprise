<template>
	<view class="image">
		<image :src="imgUrl" mode=""></image>
	</view>
</template>

<script>
	import {
		img
	} from '@/api/index.js'
	export default {
		data() {
			return {

			}
		},
		onLoad() {
			console.log(img());
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.image {}
</style>