<template>
	<view class="page">
		<!-- 导航栏 -->
		<free-nav-bar showBack :showRight="detail.friend" bgColor="bg-white">
			<free-icon-button slot="right" :icon="'\ue6fd'" @click="openAction"></free-icon-button>
		</free-nav-bar>
		
		<view class="px-3 py-4 flex align-center bg-white border-bottom">
			<free-avater :src="detail.avatar" size="120"></free-avater>
			<view class="flex flex-column ml-3 flex-1">
				<view class="flex align-center justify-between">
					<text class="font-lg font-weight-bold mb-1">{{detail.nickname}}</text>
					<image v-if="detail.star" src="/static/star.png" style="width: 40rpx;height: 40rpx;"></image>
				</view>
				<text class="font-md text-light-muted">账号: {{detail.username}}</text>
				<text class="font-md text-light-muted">地区： 江苏苏州</text>
			</view>
		</view>
		
		<free-list-item v-if="detail.friend"  showRight :showLeftIcon="false" @click="navigate('mail/user-remark-tag/user-remark-tag')">
			<view class="flex align-center">
				<text class="font-md text-dark mr-3">标签</text>
				<text class="font-md text-light-muted mr-2" v-for="(item,index) in detail.tags" :key="index">{{item}}</text>
				<text class="font-md text-light-muted" v-if="detail.tags.length<1">未设置</text>
			</view>
		</free-list-item>
		<free-divider></free-divider>
		<free-list-item v-if="detail.friend" showRight :showLeftIcon="false">
			<view class="flex align-center">
				<text class="font-md text-dark mr-3">朋友圈</text>
				<image src="/static/logo.png" style="width: 90rpx;height: 90rpx;" class=" mr-2"></image>
				<image src="/static/logo.png" style="width: 90rpx;height: 90rpx;" class=" mr-2"></image>
				<image src="/static/logo.png" style="width: 90rpx;height: 90rpx;" class=" mr-2"></image>
			</view>
		</free-list-item>
		<free-list-item title="更多信息" showRight :showLeftIcon="false"></free-list-item>
		<free-divider></free-divider>
		<view v-if="detail.friend" class="py-3 flex align-center justify-center bg-white" hover-class="bg-light" @click="doEvent">
			<text class="iconfont text-primary mr-1" v-if="!detail.isblack">&#xe64e;</text>
			<text class="font-md text-primary">{{detail.isblack ? '移出黑名单' : '发信息'}}</text>
		</view>
		<view v-else class="py-3 flex align-center justify-center bg-white" hover-class="bg-light" @click="navigate(addFriend)">
			<text class="font-md text-primary">添加好友</text>
		</view>
		
		<!-- 操作菜单 -->
		<free-popup ref="action" bottom transformOrigin="center bottom" maskColor>
			<scroll-view scroll-y="true" style="height: 700rpx;" class="bg-white" :show-scrollbar="false">
				<free-list-item v-for="(item,index) in actions" :title="item.title" :key="index" :border="false" @click="popupEvent(item)">
					<text slot="icon" class="iconfont font-lg py-2">{{item.icon}}</text>
				</free-list-item>
				
			</scroll-view>
		</free-popup>
	</view>
</template>

<script>
	import freeNavBar from '@/components/free-ui/free-nav-bar.vue'
	import freeAvater from '@/components/free-ui/free-avater.vue'
	import freeDivider from '@/components/free-ui/free-divider.vue'
	import freeListItem from '@/components/free-ui/free-list-item.vue'
	import freeIconButton from '@/components/free-ui/free-icon-button.vue'
	import freePopup from '@/components/free-ui/free-popup.vue'
	
	import auth from '@/common/mixin/auth.js';
	
	
	import $H from '@/common/free-lib/request.js';
	export default {
		mixins:[auth],
		components:{
			freeNavBar,
			freeAvater,
			freeDivider,
			freeListItem,
			freeIconButton,
			freePopup
		},
		data() {
			return {
				detail:{
					id:0,
					area: "",
					avatar: "",
					email: "",
					id: "",
					nickname: "",
					phone: "",
					sex: "",
					sign: "",
					status: "",
					username: "",
					friend:false,
					star:false,		//星标好友
					isblack:false,	//黑名单
					lookme:1,
					lookhim:1,
					tags: []
				},
			}
		},
		onLoad(e) {
			if(!e.user_id){
				return this.backToast()
			}
			
			this.detail.id = e.user_id
			
			uni.$on('saveRemakTag',e => {
				this.tagList = e.tagList
				if(e.nickname)this.nickname = e.nickname
			})
		},
		onShow() {
			// 获取用户信息
			this.getData()
		},
		destroyed() {
			uni.$off('saveRemakTag')
		},
		computed:{
			addFriend() {
				let obj = {
					friend_id:this.detail.id,
					nickname:this.detail.nickname,
					lookme: typeof this.detail.lookme === 'number' ? this.detail.lookme : 0,
					lookhim:typeof this.detail.lookhim === 'number' ? this.detail.lookhim : 0
				}
				return 'mail/add-friend/add-friend?params='+JSON.stringify(obj)
			},
			actions(){
				return [
					{
						icon:"\ue6b3",
						title:"设置备注和标签",
						type:"navigate",
						path:"mail/user-remark-tag/user-remark-tag?params="+ JSON.stringify({
							user_id:this.detail.id,
							nickname:this.detail.nickname,
							tags:this.detail.tags ? this.detail.tags.join(',') : ''
						})
					},
					{
						icon:"\ue613",
						title:"把他推荐给朋友",
						type:"navigate",
						path:"mail/send-card/send-card"
					},
					{
						icon:"\ue6b0",
						title:this.detail.star ? '取消星标好友':'设为星标好友',
						type:"event",
						event:"setStar"
					},
					{
						icon:"\ue667",
						title:"设置朋友圈和动态权限",
						type:"navigate",
						path:"mail/user-moments-auth/user-moments-auth?user_id="+this.detail.id+"&params="+JSON.stringify({
							lookme:this.detail.lookme,
							lookhim:this.detail.lookhim
						})
					},
					{
						icon:"\ue638",
						title:this.detail.isblack ? '移出黑名单' : '加入黑名单',
						type:"event",
						event:"setBlack"
					},
					{
						icon:"\ue61c",
						title:"投诉",
						type:"navigate",
						path:"mail/user-report/user-report?params="+JSON.stringify({
							user_id:this.detail.id,
							type:'user'
						})
					},
					{
						icon:"\ue61c",
						title:"删除",
						type:"event",
						event:'deleteItem'
					},
				]
			}
		},
		methods: {
			//打开操作菜单
			openAction(){
				this.$refs.action.show()
			},
			//跳转
			navigate(path){
				uni.navigateTo({
					url: '/pages/' + path,
				});
			},
			//操作菜单事件
			popupEvent(e){
				if(!e.type){
					return
				}
				switch (e.type){
					case 'navigate':
					uni.navigateTo({
						url: '/pages/'+e.path,
					});
						break;
					case 'event':
						this[e.event](e)
						break;
					default:
						break;
				}
				
				this.$refs.action.hide()
			},
			// 删除好友
			deleteItem() {
				uni.showModal({
					content: '是否删除',
					success:  (res) => {
						if (res.confirm) {
							$H.post('/friend/destroy',{
								friend_id:this.detail.id
							}).then(res => {
								uni.showToast({
									title: '删除好友成功'
								});
								uni.reLaunch({
									url:'/pages/tabbar/index/index'
								})
							})
						} 
					}
				});
			},
			//设为星标
			setStar(e){
				let star = this.detail.star === 0 ? 1 : 0
				$H.post('/friend/setstar/'+this.detail.id,{star}).then(res => {
					this.detail.star = star
					e.title = this.detail.star ? '取消星标好友' : '设为星标好友'
				})
			},
			//加入黑名单
			setBlack(e){
				 let msg = this.detail.isblack ? '移出黑名单' : "加入黑名单"
				uni.showModal({
					content:'是否要'+msg+'?',
					success:(res)=> {
						if(res.confirm){
							let isblack = this.detail.isblack=== 0 ? 1 : 0
							$H.post('/friend/setblack/'+this.detail.id,{isblack}).then(res => {
								this.detail.isblack= isblack
							})
							uni.showToast({
								title:msg+"成功",
								icon:"none"
							})
						}
					}
				}) 
			},
			getData(){
				$H.get('/friend/read/'+this.detail.id).then(res => {
					this.detail = res
					// console.log(res)
				})
			},
			doEvent(){
				if(this.detail.isblack){
					return this.setBlack()
				}
				// console.log("发送消息")
				uni.navigateTo({
					url: '/pages/chat/chat/chat?params='+encodeURIComponent(JSON.stringify({
						id:this.detail.id,
						name:this.detail.nickname ? this.detail.nickname : this.detail.username,
						avatar:this.detail.avatar,
						chat_type:"user"
					}))
				});
			},
		}
	}
</script>

<style>

</style>
