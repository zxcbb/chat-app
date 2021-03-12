import $C from './config.js'
import $U from './utils.js'

export default {
    // 全局配置
    common:{
        baseUrl:$C.baseUrl,
        header:{
            'Content-Type':'application/json;charset=UTF-8',
        },
        data:{},
        method:'GET',
        dataType:'json',
        token:true
    },
    // 请求 返回promise
    request(options = {}){
        // 组织参数
        options.url = this.common.baseUrl + options.url
        options.header = options.header || this.common.header
        options.data = options.data || this.common.data
        options.method = options.method || this.common.method
        options.dataType = options.dataType || this.common.dataType
        options.token = options.token === false ?  false : this.common.token

        // 请求之前验证...
        // token验证
        if (options.token) {
            let token = $U.getStorage('token')
            // 二次验证
            if (!token) {
                uni.showToast({ title: '请先登录', icon: 'none' });
                // token不存在时跳转
                return uni.reLaunch({
                    url: '/pages/common/login/login',
                });
            }
            // 往header头中添加token
            options.header.token = token
        }

        // 请求
        return new Promise((res,rej)=>{
            // 请求中...
            uni.request({
                ...options,
                success: (result) => {
                    // 返回原始数据
                    if(options.native){
                        return res(result)
                    }
                    // 服务端失败
                    if(result.statusCode !== 200){
                        if (options.toast !== false) {
                            uni.showToast({
                                title: result.data.data || '服务端失败',
                                icon: 'none'
                            });
                        }
                        return rej(result.data) 
                    }
                    // 其他验证...
                    // 成功
                    let data = result.data.data
                    res(data)
                },
                fail: (error) => {
                    uni.showToast({ title: error.errMsg || '请求失败', icon: 'none' });
                    return rej(error)
                }
            });
        })
    },
    // get请求
    get(url,data = {},options = {}){
        options.url = url
        options.data = data
        options.method = 'GET'
        return this.request(options)
    },
    // post请求
    post(url,data = {},options = {}){
        options.url = url
        options.data = data
        options.method = 'POST'
        return this.request(options)
    },
    // delete请求
    del(url,data = {},options = {}){
        options.url = url
        options.data = data
        options.method = 'DELETE'
        return this.request(options)
    },
	// 上传文件
	upload(url,data,onPregress = false){
		return new Promise((resolve,reject) => {
			const token = $U.getStorage('token')
			if(!token){
				uni.showToast({
					title:'请先登陆',icon:'none'
				})
				return uni.reLaunch({
					url:'/pages/common/login/login'
				})
			}
			// 上传
			const uploadTask = uni.uploadFile({
				url:this.common.baseUrl + url,
				filePath:data.filePath,
				name:data.name || 'files',
				header:{
					token,
				},
				success:res => {
					console.log(res)
					if(res.statusCode !== 200) return uni.showToast({
						title:'上传失败',
						icon:'none'
					})
					let message = JSON.parse(res.data)
					
					resolve(message.data)
				},
				fail:err=> {
					console.log(err)
					reject(err)
				}
			})
			uploadTask.onProgressUpdate(res=> {
				console.log('上传进度',res.progress)
				if(typeof onPregress === 'function'){
					onPregress(res.progress)
				}
			})
		})
	}
}