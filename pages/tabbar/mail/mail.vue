<template>
	<view>
		
		<!-- 导航栏 -->
		<free-nav-bar :title="true" title="通讯录">
			<!-- <block slot="title">微信</block> -->
		</free-nav-bar>
		
		<!-- 通讯录列表 -->
		<scroll-view  scroll-y="true" :style="'height:'+scrollHeight+ ';'" :scroll-into-view="scrollInto">
			<free-list-item v-for="(item,index) in topList" :key="item.title"
			 :title="item.title" :cover="item.cover" :showRight="index === 0 && applyCount>0" @click="navigate(item.path)">
				<free-badge v-if="applyCount > 0" :value="applyCount" slot="right"></free-badge>
			 </free-list-item>
			 
			 <view v-for="(item,index) in list" :key="index" :id="'item-'+item.title">
				 <view v-if="item.list.length" class="py-2 px-3 border-bottom bg-light">
					 <text class="font-md text-dark">{{item.title}}</text>
				 </view>
				 <free-list-item v-for="(item2,index2) in item.list" :key="index2"
				  :title="item2.name" :cover="item2.avatar ? item2.avatar : '/static/images/mail/contact_top-friend-notify.png'" @click="navigate('mail/user-base/user-base?user_id='+item2.user_id)"></free-list-item>
			 </view>
		</scroll-view>
		 
		 <!-- 侧边导航条 -->
		 <view class="position-fixed right-0 bottom-0 bg-light flex flex-column" :style="'top:'+this.top+';'" style="width: 50rpx;" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
		 	<view class="flex-1 flex align-center justify-center" v-for="(item,index) in list" :key="index">
		 		<text class="font-sm text-muted">{{item.title}}</text>
		 	</view>
		 </view>
		 
		 <view class="position-fixed rounded-circle bg-light border flex align-center justify-center" style="width: 150rpx;height: 150rpx;left: 300rpx;" :style="'top:'+modalTop+'px'" v-if="current">
		 	<text class="font-lg">{{current}}</text>
		 </view>
	</view>
</template>

<script
>
	import freeNavBar from '@/components/free-ui/free-nav-bar.vue'
	import freeListItem from '@/components/free-ui/free-list-item.vue'
	import freeBadge from '@/components/free-ui/free-badge.vue'
	
	import auth from '@/common/mixin/auth.js'
	import { mapState } from 'vuex'
	export default {
		mixins:[auth],
		components:{
			freeNavBar,
			freeListItem,
			freeBadge
		},
		data() {
			return { 
				current:"",
				scrollInto:'',
				top:0,
				scrollHeight:0,
				topList:[
					{title:'新的朋友',cover:"/static/images/mail/contact_top-friend-notify.png",path:"mail/apply-list/apply-list"},
					{title:'群聊',cover:"/static/images/mail/contact_top-addgroup.png",path:"mail/group-list/group-list"},
					{title:'标签',cover:"/static/images/mail/tag.png",path:""},
				],
			}
		},
		onLoad() {
			let res = uni.getSystemInfoSync()
			// #ifdef APP-PLUS-NVUE
			this.top = res.statusBarHeight + uni.upx2px(90)
			// #endif
			// this.top = uni.upx2px(90)
			this.scrollHeight = res.windowHeight - this.top
			
			this.$store.dispatch('getMailList')
		},
		computed:{
			...mapState({
				applyCount:state => state.user.apply.count,
				list: state => state.user.mailList
			}),
			modalTop(){
				return (this.scrollHeight-uni.upx2px(150)) / 2
			},
			itemHeight(){
				let count = this.list.length
				if(count<1) return 0
				else return this.scrollHeight / count
			}
		},
		methods: {
			touchstart(e){
				this.changeScrollInto(e)
			},
			touchmove(e){
				this.changeScrollInto(e)
			},
			touchend(){
				this.current = ""
			},
			//联动
			changeScrollInto(e){
				let Y = e.touches[0].pageY
				let index = Math.floor(Y / this.itemHeight)
				let item = this.list[index]
				// console.log(item)
				if(item){
					this.scrollInto = 'item-'+item.letter
					this.current = item.letter
				}
			}
		}
	}
</script>

<style>

</style>
