<template>
	<view class="page">

		<!-- 导航栏 -->
		<free-nav-bar :title="true" title="发现">
			<!-- <block slot="title">微信</block> -->
		</free-nav-bar>
		
		<free-list-item title="朋友圈" showRight @click="openMoments">
			<text slot="icon" class="iconfont font-lg py-1">&#xe667;</text>
			<view slot="right" class="position-relative p-1">
				<free-avater src="/static/images/mail/contact_top-addgroup.png" size="55"></free-avater>
				<text class="rounded-circle bg-danger position-absolute" style="width: 20rpx;height: 20rpx;top: 0;right: 0;"></text>
			</view>
		</free-list-item>
		<free-divider></free-divider>
		<free-list-item title="扫一扫" showRight>
			<text slot="icon" class="iconfont font-lg py-1">&#xe86d;</text>
		</free-list-item>
		<free-list-item title="摇一摇" showRight>
			<text slot="icon" class="iconfont font-lg py-1">&#xe63d;</text>
		</free-list-item>
		<free-divider></free-divider>
		<free-list-item title="看一看" showRight>
			<text slot="icon" class="iconfont font-lg py-1">&#xe610;</text>
		</free-list-item>
		<free-list-item title="搜一搜" showRight>
			<text slot="icon" class="iconfont font-lg py-1">&#xe611;</text>
		</free-list-item>
		<free-divider></free-divider>
	
	</view>
</template>

<script>
	import freeNavBar from '@/components/free-ui/free-nav-bar.vue'
	import freeListItem from '@/components/free-ui/free-list-item.vue'
	import freeAvater from '@/components/free-ui/free-avater.vue'
	import freeDivider from '@/components/free-ui/free-divider.vue'
	
	import auth from '@/common/mixin/auth.js'
	export default {
		mixins:[auth],
		components:{
			freeNavBar,
			freeListItem,
			freeAvater,
			freeDivider
		},
		data() {
			return {
				
			}
		},
		methods: {
			//打开朋友圈
			openMoments(){
				uni.navigateTo({
					url: '/pages/find/moments/moments',
				});
			}
			
		}
	}
</script>

<style>

</style>
