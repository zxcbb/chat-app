<template>
	<view class="page">
		<!-- 导航栏 -->
		<free-nav-bar title="群公告" showBack :showRight="true" bgColor="bg-white">
			<free-main-button slot="right" name="推送" @click="submit"></free-main-button>
		</free-nav-bar>
		
		
		<textarea placeholder="请填写投诉内容" class="bg-white p-2 font-md" style="width: 750rpx;box-sizing: border-box;" v-model="remark" />
	</view>
</template>

<script>
	import freeNavBar from '@/components/free-ui/free-nav-bar.vue'
	import freeMainButton from '@/components/free-ui/free-main-button.vue'
	
	import auth from '@/common/mixin/auth.js'
	import $H from '@/common/free-lib/request.js'
	export default {
		mixins:[auth],
		components:{
			freeNavBar,
			freeMainButton,
		},
		data() {
			return {
				remark:'',
				id:0
			}
		},
		onLoad(e) {
			if(!e.params) return this.backToast()
			let params = JSON.parse(e.params)
			this.remark = params.remark;
			this.id = params.id
		},
		methods: {
			submit(){
				$H.post('/group/remark',{
					id:this.id,
					remark:this.remark
				}).then(res => {
					uni.showToast({
						title: '推送成功',
						icon:'none'
					});
					uni.navigateBack({
						delta: 1
					});
				})
				
			}
		}
	}
</script>

<style>

</style>
