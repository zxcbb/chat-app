<template>
	<view class="page">
		<free-nav-bar bgColor="bg-white">
			<free-icon-button slot="right" :icon="'\ue6ed'"></free-icon-button>
		</free-nav-bar>
		
		<free-list-item :cover="user.avatar ? user.avatar : '/static/logo.png'" :title="nickname" showRight coverSize="120" @click="open('my/userinfo/userinfo')">
			<view class="flex flex-column">
				<text class="text-dark font-lg font-weight-bold">{{nickname}}</text>
				<text class="text-light-muted font mt-2">仿微信号: {{user.username}}</text>
			</view>
			<view slot="right">
				<text class="iconfont font-md text-light-muted">&#xe614;</text>
			</view>
		</free-list-item>
		<free-divider></free-divider>
		
		<free-list-item title="支付" showRight>
			<text slot="icon" class="iconfont font-lg py-1">&#xe66c;</text>
		</free-list-item>
		
		<free-divider></free-divider>
		
		<free-list-item title="收藏" showRight @click="open('my/fava/fava')">
			<text slot="icon" class="iconfont font-lg py-1">&#xea2d;</text>
		</free-list-item>
		<free-list-item title="相册" showRight @click="open('find/moments/moments')">
			<text slot="icon" class="iconfont font-lg py-1">&#xe608;</text>
		</free-list-item>
		<free-list-item title="表情" showRight>
			<text slot="icon" class="iconfont font-lg py-1">&#xe605;</text>
		</free-list-item>
		
		<free-divider></free-divider>
		
		<free-list-item title="设置" showRight @click="open('my/setting/setting')">
			<text slot="icon" class="iconfont font-lg py-1">&#xe612;</text>
		</free-list-item>
	</view>
</template>

<script>
	import freeNavBar from '@/components/free-ui/free-nav-bar.vue'
	import freeIconButton from '@/components/free-ui/free-icon-button.vue'
	import freeListItem from '@/components/free-ui/free-list-item.vue'
	import freeDivider from '@/components/free-ui/free-divider.vue'
	
	import auth from '@/common/mixin/auth.js'
	import { mapState } from 'vuex'
	export default {
		mixins:[auth],
		components:{
			freeNavBar,
			freeIconButton,
			freeListItem,
			freeDivider
		},
		data() {
			return {
				
			}
		},
		computed:{
			...mapState({
				user:state => state.user.user
			}),
			nickname(){
				// console.log(this.user)
				return this.user.nickname ? this.user.nickname : this.user.username
			}
		},
		methods: {
			open(path){
				uni.navigateTo({
					url:'/pages/'+path
				})
			}
		}
	}
</script>

<style>

</style>
