/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File

/**
 * 接口 [注册&登录↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/1275) 的 **请求类型**
 *
 * @分类 [v1通用接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_277)
 * @标签 `v1`
 * @请求头 `POST /v1/signUpOrIn`
 * @更新时间 `2021-11-16 11:14:03`
 */
export interface SignUpOrInParams {
  /**
   * 手机号
   */
  phone: string
  /**
   * 短信验证码
   */
  smsCode: string
}

/**
 * 接口 [注册&登录↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/1275) 的 **返回类型**
 *
 * @分类 [v1通用接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_277)
 * @标签 `v1`
 * @请求头 `POST /v1/signUpOrIn`
 * @更新时间 `2021-11-16 11:14:03`
 */
export interface SignUpOrInResult {
  /**
   * 账号ID
   */
  accountId: string
  /**
   * 昵称
   */
  nickname: string
  /**
   * 头像URL
   */
  avatar: string
  /**
   * 手机号
   */
  phone: string
  /**
   * 登录TOKEN
   */
  loginToken: string
  imConfig: {
    /**
     * IM TOKEN
     */
    imToken: string
    /**
     * IM类型枚举：https://cf.qiniu.io/pages/viewpage.action?pageId=63570443
     */
    type: number
    /**
     * 七牛IM登录用用户名
     */
    imUsername: string
    /**
     * 七牛IM登录用密码
     */
    imPassword: string
    /**
     * 七牛IM的UID
     */
    imUid: string
  }
}

/**
 * 接口 [获取短信验证码↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/1276) 的 **请求类型**
 *
 * @分类 [v1通用接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_277)
 * @标签 `v1`
 * @请求头 `POST /v1/getSmsCode`
 * @更新时间 `2021-04-20 22:45:08`
 */
export interface GetSmsCodeParams {
  phone: string
}

/**
 * 接口 [获取短信验证码↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/1276) 的 **返回类型**
 *
 * @分类 [v1通用接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_277)
 * @标签 `v1`
 * @请求头 `POST /v1/getSmsCode`
 * @更新时间 `2021-04-20 22:45:08`
 */
export interface GetSmsCodeResult {}

/**
 * 接口 [登出↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/1277) 的 **请求类型**
 *
 * @分类 [v1通用接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_277)
 * @标签 `v1`
 * @请求头 `POST /v1/signOut`
 * @更新时间 `2021-04-22 22:15:33`
 */
export interface SignOutParams {}

/**
 * 接口 [登出↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/1277) 的 **返回类型**
 *
 * @分类 [v1通用接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_277)
 * @标签 `v1`
 * @请求头 `POST /v1/signOut`
 * @更新时间 `2021-04-22 22:15:33`
 */
export interface SignOutResult {}

/**
 * 接口 [用户信息获取↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/1278) 的 **请求类型**
 *
 * @分类 [v1通用接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_277)
 * @标签 `v1`
 * @请求头 `GET /v1/accountInfo/{accountId}`
 * @更新时间 `2021-04-22 13:47:07`
 */
export interface AccountInfoAccountIdParams {
  /**
   * 不传则通过登录TOKEN获取，为后续HR修改他人信息预留
   */
  accountId: string
}

/**
 * 接口 [用户信息获取↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/1278) 的 **返回类型**
 *
 * @分类 [v1通用接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_277)
 * @标签 `v1`
 * @请求头 `GET /v1/accountInfo/{accountId}`
 * @更新时间 `2021-04-22 13:47:07`
 */
export interface AccountInfoAccountIdResult {
  /**
   * 账号ID
   */
  accountId: string
  /**
   * 昵称
   */
  nickname: string
  /**
   * 头像URL
   */
  avatar: string
  /**
   * 电话
   */
  phone: string
  /**
   * 个性签名
   */
  profile: string
}

/**
 * 接口 [APP全局配置信息↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/1279) 的 **请求类型**
 *
 * @分类 [v1通用接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_277)
 * @标签 `v1`
 * @请求头 `GET /v1/appConfig`
 * @更新时间 `2021-04-20 22:43:58`
 */
export interface AppConfigParams {}

/**
 * 接口 [APP全局配置信息↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/1279) 的 **返回类型**
 *
 * @分类 [v1通用接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_277)
 * @标签 `v1`
 * @请求头 `GET /v1/appConfig`
 * @更新时间 `2021-04-20 22:43:58`
 */
export interface AppConfigResult {
  /**
   * 欢迎页信息
   */
  welcome?: {
    /**
     * 图片链接
     */
    image?: string
    /**
     * 跳转链接
     */
    url?: string
    /**
     * 扩展信息-备用
     */
    extra?: {}
  }
}

/**
 * 接口 [场景列表↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/1280) 的 **请求类型**
 *
 * @分类 [v1通用接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_277)
 * @标签 `v1`
 * @请求头 `GET /v1/solution`
 * @更新时间 `2021-11-16 10:47:02`
 */
export interface SolutionParams {
  /**
   * 默认是10，每页数据条数
   */
  pageSize: string
  /**
   * 默认是1，页码
   */
  pageNum: string
}

/**
 * 接口 [场景列表↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/1280) 的 **返回类型**
 *
 * @分类 [v1通用接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_277)
 * @标签 `v1`
 * @请求头 `GET /v1/solution`
 * @更新时间 `2021-11-16 10:47:02`
 */
export interface SolutionResult {
  /**
   * 全部数据数量
   */
  total: number
  /**
   * 暂不需要
   */
  nextId?: string
  /**
   * 当前页码
   */
  currentPageNum: number
  /**
   * 下页页码，如果无下页则和当前页页码一致
   */
  nextPageNum: number
  /**
   * 当前页预计条数
   */
  pageSize: number
  /**
   * 是否最后一页
   */
  endPage: boolean
  /**
   * 当前分页数量
   */
  cnt: number
  /**
   * 场景列表
   */
  list: {
    /**
     * 场景ID
     */
    id: string
    /**
     * 场景标题
     */
    title: string
    /**
     * 场景跳转连接
     */
    url: string
    /**
     * 场景文字描述
     */
    desc: string
    /**
     * 场景图标
     */
    icon: string
  }[]
}

/**
 * 接口 [用户信息修改↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/1281) 的 **请求类型**
 *
 * @分类 [v1通用接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_277)
 * @标签 `v1`
 * @请求头 `POST /v1/accountInfo/{accountId}`
 * @更新时间 `2021-04-26 13:54:56`
 */
export interface AccountInfoAccountIdParams {
  nickname: string
  /**
   * 不传则通过登录TOKEN获取，为后续HR修改他人信息预留
   */
  accountId: string
}

/**
 * 接口 [用户信息修改↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/1281) 的 **返回类型**
 *
 * @分类 [v1通用接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_277)
 * @标签 `v1`
 * @请求头 `POST /v1/accountInfo/{accountId}`
 * @更新时间 `2021-04-26 13:54:56`
 */
export interface AccountInfoAccountIdResult {}

/**
 * 接口 [token登录↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/1293) 的 **请求类型**
 *
 * @分类 [v1通用接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_277)
 * @标签 `v1`
 * @请求头 `POST /v1/signInWithToken`
 * @更新时间 `2021-04-22 13:48:17`
 */
export interface SignInWithTokenParams {}

/**
 * 接口 [token登录↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/1293) 的 **返回类型**
 *
 * @分类 [v1通用接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_277)
 * @标签 `v1`
 * @请求头 `POST /v1/signInWithToken`
 * @更新时间 `2021-04-22 13:48:17`
 */
export interface SignInWithTokenResult {
  /**
   * 账号ID
   */
  accountId: string
  /**
   * 昵称
   */
  nickname: string
  /**
   * 头像URL
   */
  avatar: string
  /**
   * 手机号
   */
  phone: string
  /**
   * 登录TOKEN
   */
  loginToken: string
  /**
   * 个性签名
   */
  profile: string
  imConfig: {
    /**
     * IM TOKEN
     */
    imToken: string
    /**
     * IM类型枚举：https://cf.qiniu.io/pages/viewpage.action?pageId=63570443
     */
    type: number
  }
}

/**
 * 接口 [获取内容的token值↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2274) 的 **请求类型**
 *
 * @分类 [v1通用接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_277)
 * @标签 `v1`
 * @请求头 `POST /v1/token/getToken`
 * @更新时间 `2021-09-27 16:57:24`
 */
export interface TokenGetTokenParams {
  /**
   * 内容
   */
  content?: string
}

/**
 * 接口 [获取内容的token值↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2274) 的 **返回类型**
 *
 * @分类 [v1通用接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_277)
 * @标签 `v1`
 * @请求头 `POST /v1/token/getToken`
 * @更新时间 `2021-09-27 16:57:24`
 */
export interface TokenGetTokenResult {
  token?: string
}

/**
 * 接口 [获取最近的一张照片↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2499) 的 **请求类型**
 *
 * @分类 [v1通用接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_277)
 * @标签 `v1`
 * @请求头 `GET /v1/recentImage`
 * @更新时间 `2021-12-08 17:34:18`
 */
export interface RecentImageParams {}

/**
 * 接口 [获取最近的一张照片↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2499) 的 **返回类型**
 *
 * @分类 [v1通用接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_277)
 * @标签 `v1`
 * @请求头 `GET /v1/recentImage`
 * @更新时间 `2021-12-08 17:34:18`
 */
export interface RecentImageResult {
  id?: string
  fileName?: string
  fileUrl?: string
  status?: number
}

/**
 * 接口 [上传文件↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2508) 的 **请求类型**
 *
 * @分类 [v1通用接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_277)
 * @标签 `v1`
 * @请求头 `POST /v1/upload`
 * @更新时间 `2021-12-08 17:38:34`
 */
export interface UploadParams {
  file: FileData
}

/**
 * 接口 [上传文件↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2508) 的 **返回类型**
 *
 * @分类 [v1通用接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_277)
 * @标签 `v1`
 * @请求头 `POST /v1/upload`
 * @更新时间 `2021-12-08 17:38:34`
 */
export interface UploadResult {
  id?: string
  fileName?: string
  fileUrl?: string
  status?: number
}

/**
 * 接口 [通用创建房间↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2283) 的 **请求类型**
 *
 * @分类 [V1房间相关通用接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_371)
 * @标签 `v1`
 * @请求头 `POST /v1/base/createRoom`
 * @更新时间 `2021-11-30 10:06:13`
 */
export interface BaseCreateRoomParams {
  /**
   * 房间名称
   */
  title: string
  /**
   * 房间描述
   */
  desc?: string
  /**
   * 场景分类
   */
  type: string
  /**
   * 房间封面
   */
  image?: string
  /**
   * 自定义属性
   */
  attrs?: {
    'key[0]'?: string
    'value[0]'?: string
  }[]
  /**
   * 房间参数
   */
  params?: {
    'key[0]'?: string
    'value[0]'?: string
  }[]
}

/**
 * 接口 [通用创建房间↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2283) 的 **返回类型**
 *
 * @分类 [V1房间相关通用接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_371)
 * @标签 `v1`
 * @请求头 `POST /v1/base/createRoom`
 * @更新时间 `2021-11-30 10:06:13`
 */
export interface BaseCreateRoomResult {
  roomInfo?: {
    image?: string
    title?: string
    creator?: string
    desc?: string
    status?: number
    type?: string
    roomId?: string
    /**
     * 当前房间人数
     */
    totalUsers?: number
    attrs?: {
      'key[0]'?: string
      'value[0]'?: string
    }[]
    params?: {
      'key[0]'?: string
      'value[0]'?: string
    }[]
  }
  userInfo?: {
    role?: string
    userId?: string
    avatar?: string
    nickname?: string
    phone?: string
    profile?: string
    attrs?: {
      'key[0]'?: string
      'value[0]'?: string
    }[]
  }
  rtcInfo?: {
    roomToken?: string
    publishUrl?: string
    rtmpPlayUrl?: string
    flvPlayUrl?: string
    hlsPlayUrl?: string
  }
}

/**
 * 接口 [通用加入房间↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2292) 的 **请求类型**
 *
 * @分类 [V1房间相关通用接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_371)
 * @标签 `v1`
 * @请求头 `POST /v1/base/joinRoom`
 * @更新时间 `2021-11-29 15:03:22`
 */
export interface BaseJoinRoomParams {
  /**
   * 房间ID
   */
  roomId?: string
  type: string
  /**
   * 保留
   */
  params?: {
    'key[0]'?: string
    'value[0]': string
  }[]
}

/**
 * 接口 [通用加入房间↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2292) 的 **返回类型**
 *
 * @分类 [V1房间相关通用接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_371)
 * @标签 `v1`
 * @请求头 `POST /v1/base/joinRoom`
 * @更新时间 `2021-11-29 15:03:22`
 */
export interface BaseJoinRoomResult {
  rtcInfo?: {
    roomToken?: string
    publishUrl?: string
    rtmpPlayUrl?: string
    flvPlayUrl?: string
    hlsPlayUrl?: string
  }
  imConfig: {
    /**
     * IM聊天室ID
     */
    imGroupId: string
    /**
     * 默认2
     */
    type: string
  }
  allUserList?: {
    userId: string
    nickname: string
    avatar: string
    phone: string
    role: string
    profile: string
  }[]
  userInfo?: {
    avatar?: string
    role?: string
    profile?: string
    phone?: string
    userId?: string
    nickname?: string
    attrs?: {
      'key[0]'?: string
      'value[0]'?: string
    }[]
  }
  roomInfo?: {
    title?: string
    status?: string
    roomId?: string
    image?: string
    /**
     * 场景类型
     */
    type?: string
    desc?: string
    creator?: string
    params?: {
      'key[0]'?: string
      'value[0]'?: string
    }[]
    attrs?: {
      'key[0]'?: string
      'value[0]'?: string
    }[]
    totalUsers?: number
  }
}

/**
 * 接口 [通用离开房间↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2301) 的 **请求类型**
 *
 * @分类 [V1房间相关通用接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_371)
 * @标签 `v1`
 * @请求头 `POST /v1/base/leaveRoom`
 * @更新时间 `2021-10-29 09:58:49`
 */
export interface BaseLeaveRoomParams {
  roomId: string
  type: string
}

/**
 * 接口 [通用离开房间↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2301) 的 **返回类型**
 *
 * @分类 [V1房间相关通用接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_371)
 * @标签 `v1`
 * @请求头 `POST /v1/base/leaveRoom`
 * @更新时间 `2021-10-29 09:58:49`
 */
export type BaseLeaveRoomResult = boolean

/**
 * 接口 [通用房间列表↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2310) 的 **请求类型**
 *
 * @分类 [V1房间相关通用接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_371)
 * @标签 `v1`
 * @请求头 `GET /v1/base/listRoom`
 * @更新时间 `2021-11-09 14:03:00`
 */
export interface BaseListRoomParams {
  /**
   * 默认是10，每页数据条数
   */
  pageSize?: string
  /**
   * 默认是1，页码
   */
  pageNum?: string
  /**
   * 场景类型
   */
  type: string
}

/**
 * 接口 [通用房间列表↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2310) 的 **返回类型**
 *
 * @分类 [V1房间相关通用接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_371)
 * @标签 `v1`
 * @请求头 `GET /v1/base/listRoom`
 * @更新时间 `2021-11-09 14:03:00`
 */
export interface BaseListRoomResult {
  total?: number
  nextId?: string
  cnt?: number
  currentPageNum?: number
  nextPageNum?: number
  pageSize?: number
  endPage?: boolean
  list?: {
    roomId?: string
    title?: string
    image?: string
    status?: number
    desc?: string
    creator?: string
    type?: string
    params?: {
      'key[0]'?: string
      'value[0]'?: string
    }[]
    attrs?: {
      'key[0]'?: string
      'value[0]'?: string
    }[]
    totalUsers?: number
  }[]
}

/**
 * 接口 [通用心跳↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2319) 的 **请求类型**
 *
 * @分类 [V1房间相关通用接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_371)
 * @标签 `v1`
 * @请求头 `GET /v1/base/heartBeat`
 * @更新时间 `2021-11-04 16:09:09`
 */
export interface BaseHeartBeatParams {
  roomId: string
  type: string
}

/**
 * 接口 [通用心跳↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2319) 的 **返回类型**
 *
 * @分类 [V1房间相关通用接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_371)
 * @标签 `v1`
 * @请求头 `GET /v1/base/heartBeat`
 * @更新时间 `2021-11-04 16:09:09`
 */
export interface BaseHeartBeatResult {
  interval?: number
}

/**
 * 接口 [通用获取完整房间信息↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2328) 的 **请求类型**
 *
 * @分类 [V1房间相关通用接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_371)
 * @标签 `v1`
 * @请求头 `GET /v1/base/getRoomInfo`
 * @更新时间 `2021-11-09 14:06:29`
 */
export interface BaseGetRoomInfoParams {
  type: string
  roomId: string
}

/**
 * 接口 [通用获取完整房间信息↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2328) 的 **返回类型**
 *
 * @分类 [V1房间相关通用接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_371)
 * @标签 `v1`
 * @请求头 `GET /v1/base/getRoomInfo`
 * @更新时间 `2021-11-09 14:06:29`
 */
export interface BaseGetRoomInfoResult {
  rtcInfo?: {
    publishUrl?: string
    rtmpPlayUrl?: string
    flvPlayUrl?: string
    hlsPlayUrl?: string
  }
  mics?: {
    userExtension?: string
    micId?: string
    attrs?: {
      key1?: string
      value1?: string
    }[]
    /**
     * JSON串
     */
    params?: string
  }[]
  userInfo?: {
    nickname?: string
    avatar?: string
    role?: string
    userId?: string
    phone?: string
    profile?: string
    attrs?: {
      'key[0]'?: string
      'value[0]'?: string
    }[]
  }
  roomInfo?: {
    title?: string
    status?: number
    roomId?: string
    desc?: string
    type?: string
    image?: string
    creator?: string
    totalUsers?: number
    attrs?: {
      'key[0]'?: string
      'value[0]'?: string
    }[]
    params?: {
      'key[0]'?: string
      'value[0]'?: string
    }[]
  }
  allUserList?: {
    userId?: string
    profile?: string
    nickname?: string
    role?: string
    avatar?: string
    phone?: string
    attrs?: {
      'key[0]'?: string
      'value[0]'?: string
    }[]
  }[]
}

/**
 * 接口 [通用上麦接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2337) 的 **请求类型**
 *
 * @分类 [V1房间相关通用接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_371)
 * @标签 `v1`
 * @请求头 `POST /v1/base/upMic`
 * @更新时间 `2021-11-11 11:49:31`
 */
export interface BaseUpMicParams {
  roomId: string
  type: string
  userExtension?: string
  attrs?: {
    'key[0]'?: string
    'value[0]'?: string
  }[]
  params?: {
    'key[0]'?: string
    'value[0]'?: string
  }[]
}

/**
 * 接口 [通用上麦接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2337) 的 **返回类型**
 *
 * @分类 [V1房间相关通用接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_371)
 * @标签 `v1`
 * @请求头 `POST /v1/base/upMic`
 * @更新时间 `2021-11-11 11:49:31`
 */
export interface BaseUpMicResult {
  mics?: {
    userExtension?: string
    did?: string
    attrs?: {
      'key[0]'?: string
      'value[0]'?: string
    }[]
    params?: {
      'key[0]'?: string
      'value[0]'?: string
    }[]
  }[]
}

/**
 * 接口 [通用更新房间属性↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2346) 的 **请求类型**
 *
 * @分类 [V1房间相关通用接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_371)
 * @标签 `v1`
 * @请求头 `POST /v1/base/updateRoomAttr`
 * @更新时间 `2021-11-09 14:08:48`
 */
export interface BaseUpdateRoomAttrParams {
  roomId?: string
  type?: string
  attrs?: {
    'key[0]'?: string
    'value[0]'?: string
  }[]
}

/**
 * 接口 [通用更新房间属性↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2346) 的 **返回类型**
 *
 * @分类 [V1房间相关通用接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_371)
 * @标签 `v1`
 * @请求头 `POST /v1/base/updateRoomAttr`
 * @更新时间 `2021-11-09 14:08:48`
 */
export interface BaseUpdateRoomAttrResult {
  userInfo?: {
    userId?: string
    nickname?: string
    avatar?: string
    phone?: string
    profile?: string
    role?: string
    attrs?: {
      'key[0]'?: string
      'value[0]'?: string
    }[]
  }
  roomInfo?: {
    roomId?: string
    status?: string
    title?: string
    desc?: string
    creator?: string
    image?: string
    type?: string
    attrs?: {
      'key[0]'?: string
      'value[0]'?: string
    }[]
    params?: {
      'key[0]'?: string
      'value[0]'?: string
    }[]
    totalUsers?: number
  }
}

/**
 * 接口 [通用更新麦位属性↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2355) 的 **请求类型**
 *
 * @分类 [V1房间相关通用接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_371)
 * @标签 `v1`
 * @请求头 `POST /v1/base/updateMicAttr`
 * @更新时间 `2021-11-09 11:40:50`
 */
export interface BaseUpdateMicAttrParams {
  roomId: string
  uid: string
  type: string
  attrs: {
    'key[0]': string
    'value[0]': string
  }[]
}

/**
 * 接口 [通用更新麦位属性↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2355) 的 **返回类型**
 *
 * @分类 [V1房间相关通用接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_371)
 * @标签 `v1`
 * @请求头 `POST /v1/base/updateMicAttr`
 * @更新时间 `2021-11-09 11:40:50`
 */
export type BaseUpdateMicAttrResult = boolean

/**
 * 接口 [通用下麦接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2400) 的 **请求类型**
 *
 * @分类 [V1房间相关通用接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_371)
 * @标签 `v1`
 * @请求头 `POST /v1/base/downMic`
 * @更新时间 `2021-10-29 15:11:23`
 */
export interface BaseDownMicParams {
  roomId: string
  type: string
  uid?: string
}

/**
 * 接口 [通用下麦接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2400) 的 **返回类型**
 *
 * @分类 [V1房间相关通用接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_371)
 * @标签 `v1`
 * @请求头 `POST /v1/base/downMic`
 * @更新时间 `2021-10-29 15:11:23`
 */
export type BaseDownMicResult = boolean

/**
 * 接口 [通用获取房间麦位列表自定义数据接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2409) 的 **请求类型**
 *
 * @分类 [V1房间相关通用接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_371)
 * @标签 `v1`
 * @请求头 `GET /v1/base/getRoomMicInfo`
 * @更新时间 `2021-11-11 11:47:35`
 */
export interface BaseGetRoomMicInfoParams {
  roomId: string
  type: string
}

/**
 * 接口 [通用获取房间麦位列表自定义数据接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2409) 的 **返回类型**
 *
 * @分类 [V1房间相关通用接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_371)
 * @标签 `v1`
 * @请求头 `GET /v1/base/getRoomMicInfo`
 * @更新时间 `2021-11-11 11:47:35`
 */
export interface BaseGetRoomMicInfoResult {
  roomInfo?: {
    attrs?: {
      'key[0]': string
      'value[0]': string
    }[]
    roomId?: string
  }
  mics?: {
    attrs?: {
      'key[0]'?: string
      'value[0]'?: string
    }[]
    userExtension?: string
    uid?: string
    params?: {
      'key[0]'?: string
      'value[0]'?: string
    }[]
  }[]
}

/**
 * 接口 [通用查询房间自定义属性值↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2418) 的 **请求类型**
 *
 * @分类 [V1房间相关通用接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_371)
 * @标签 `v1`
 * @请求头 `GET /v1/base/getRoomAttr`
 * @更新时间 `2021-11-09 14:09:43`
 */
export interface BaseGetRoomAttrParams {
  roomId: string
  type: string
  /**
   * 没有则返回所有
   */
  attrKey?: string
}

/**
 * 接口 [通用查询房间自定义属性值↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2418) 的 **返回类型**
 *
 * @分类 [V1房间相关通用接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_371)
 * @标签 `v1`
 * @请求头 `GET /v1/base/getRoomAttr`
 * @更新时间 `2021-11-09 14:09:43`
 */
export interface BaseGetRoomAttrResult {
  attrs?: {
    'key[0]'?: string
    'value[0]'?: string
  }[]
}

/**
 * 接口 [通用查询麦位自定义属性值↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2427) 的 **请求类型**
 *
 * @分类 [V1房间相关通用接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_371)
 * @标签 `v1`
 * @请求头 `GET /v1/base/getMicAttr`
 * @更新时间 `2021-11-09 14:10:26`
 */
export interface BaseGetMicAttrParams {
  roomId: string
  uid: string
  type: string
  /**
   * 没有则返回所有
   */
  attrKey?: string
}

/**
 * 接口 [通用查询麦位自定义属性值↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2427) 的 **返回类型**
 *
 * @分类 [V1房间相关通用接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_371)
 * @标签 `v1`
 * @请求头 `GET /v1/base/getMicAttr`
 * @更新时间 `2021-11-09 14:10:26`
 */
export interface BaseGetMicAttrResult {
  attrs?: {
    'key[0]'?: string
    'value[0]'?: string
  }[]
}

/**
 * 接口 [创建考试↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2526) 的 **请求类型**
 *
 * @分类 [在线考试接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_386)
 * @标签 `v1`
 * @请求头 `POST /v1/exam/create`
 * @更新时间 `2022-01-12 10:31:54`
 */
export interface ExamCreateParams {
  name: string
  startTime: number
  endTime: number
  type?: string
  desc?: string
  examinees?: string[]
  paper: {
    name: string
    questionList: string[]
  }
}

/**
 * 接口 [创建考试↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2526) 的 **返回类型**
 *
 * @分类 [在线考试接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_386)
 * @标签 `v1`
 * @请求头 `POST /v1/exam/create`
 * @更新时间 `2022-01-12 10:31:54`
 */
export interface ExamCreateResult {
  examId: string
}

/**
 * 接口 [获取考试列表(学生端)↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2535) 的 **请求类型**
 *
 * @分类 [在线考试接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_386)
 * @标签 `v1`
 * @请求头 `GET /v1/exam/list/student`
 * @更新时间 `2022-01-12 10:25:30`
 */
export interface ExamListStudentParams {
  pageNum: string
  /**
   * 默认10
   */
  pageSize?: string
}

/**
 * 接口 [获取考试列表(学生端)↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2535) 的 **返回类型**
 *
 * @分类 [在线考试接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_386)
 * @标签 `v1`
 * @请求头 `GET /v1/exam/list/student`
 * @更新时间 `2022-01-12 10:25:30`
 */
export interface ExamListStudentResult {
  total: number
  nextId: string
  cnt: number
  currentPageNum: number
  nextPageNum: number
  pageSize: number
  endPage: boolean
  list: {
    examId: string
    examName: string
    startTime: number
    endTime: number
    duration: number
    type: string
    desc: string
    creator: string
    /**
     * 1待参与，2参与中，3已结束
     */
    status: number
  }[]
}

/**
 * 接口 [参加考试↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2544) 的 **请求类型**
 *
 * @分类 [在线考试接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_386)
 * @标签 `v1`
 * @请求头 `POST /v1/exam/join`
 * @更新时间 `2022-01-12 16:47:59`
 */
export interface ExamJoinParams {
  examId: string
  roomId: string
}

/**
 * 接口 [参加考试↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2544) 的 **返回类型**
 *
 * @分类 [在线考试接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_386)
 * @标签 `v1`
 * @请求头 `POST /v1/exam/join`
 * @更新时间 `2022-01-12 16:47:59`
 */
export interface ExamJoinResult {
  result: boolean
}

/**
 * 接口 [退出考试↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2553) 的 **请求类型**
 *
 * @分类 [在线考试接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_386)
 * @标签 `v1`
 * @请求头 `POST /v1/exam/leave`
 * @更新时间 `2022-01-12 10:29:07`
 */
export interface ExamLeaveParams {
  examId: string
}

/**
 * 接口 [退出考试↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2553) 的 **返回类型**
 *
 * @分类 [在线考试接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_386)
 * @标签 `v1`
 * @请求头 `POST /v1/exam/leave`
 * @更新时间 `2022-01-12 10:29:07`
 */
export interface ExamLeaveResult {
  result: boolean
}

/**
 * 接口 [获取试卷↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2562) 的 **请求类型**
 *
 * @分类 [在线考试接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_386)
 * @标签 `v1`
 * @请求头 `GET /v1/exam/paper/{examId}`
 * @更新时间 `2022-01-12 10:28:56`
 */
export interface ExamPaperExamIdParams {
  examId: string
}

/**
 * 接口 [获取试卷↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2562) 的 **返回类型**
 *
 * @分类 [在线考试接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_386)
 * @标签 `v1`
 * @请求头 `GET /v1/exam/paper/{examId}`
 * @更新时间 `2022-01-12 10:28:56`
 */
export interface ExamPaperExamIdResult {
  paperName: string
  totalScore: number
  questionList: {
    questionId: string
    type: string
    score: number
    desc: string
    choiceList: string[]
  }[]
}

/**
 * 接口 [提交答案↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2571) 的 **请求类型**
 *
 * @分类 [在线考试接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_386)
 * @标签 `v1`
 * @请求头 `POST /v1/exam/answer`
 * @更新时间 `2022-01-12 10:29:15`
 */
export interface ExamAnswerParams {
  examId: string
  answerList: {
    questionId: string
    textList: string[]
  }[]
}

/**
 * 接口 [提交答案↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2571) 的 **返回类型**
 *
 * @分类 [在线考试接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_386)
 * @标签 `v1`
 * @请求头 `POST /v1/exam/answer`
 * @更新时间 `2022-01-12 10:29:15`
 */
export interface ExamAnswerResult {
  result: boolean
}

/**
 * 接口 [作答详情↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2580) 的 **请求类型**
 *
 * @分类 [在线考试接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_386)
 * @标签 `v1`
 * @请求头 `GET /v1/exam/answer/details/{examId}/{userId}`
 * @更新时间 `2022-01-12 10:29:22`
 */
export interface ExamAnswerDetailsExamIdUserIdParams {
  examId: string
  userId: string
}

/**
 * 接口 [作答详情↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2580) 的 **返回类型**
 *
 * @分类 [在线考试接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_386)
 * @标签 `v1`
 * @请求头 `GET /v1/exam/answer/details/{examId}/{userId}`
 * @更新时间 `2022-01-12 10:29:22`
 */
export interface ExamAnswerDetailsExamIdUserIdResult {
  paperName: string
  totalScore: number
  list: {
    questionId: string
    question: {
      type: string
      score: number
      desc: string
      choiceList: string[]
      answer: {
        textList: string[]
        correct: boolean
      }
    }
  }[]
}

/**
 * 接口 [批改试卷(预留)↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2589) 的 **请求类型**
 *
 * @分类 [在线考试接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_386)
 * @标签 `v1`
 * @请求头 `POST /v1/exam/paper/mark`
 * @更新时间 `2022-01-12 10:29:32`
 */
export interface ExamPaperMarkParams {
  examId: string
  userId: string
  questionId: string
  score: number
}

/**
 * 接口 [批改试卷(预留)↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2589) 的 **返回类型**
 *
 * @分类 [在线考试接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_386)
 * @标签 `v1`
 * @请求头 `POST /v1/exam/paper/mark`
 * @更新时间 `2022-01-12 10:29:32`
 */
export type ExamPaperMarkResult = boolean

/**
 * 接口 [添加考题(与答案)(预留)↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2598) 的 **请求类型**
 *
 * @分类 [在线考试接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_386)
 * @标签 `v1`
 * @请求头 `POST /v1/exam/questions/add`
 * @更新时间 `2022-01-14 10:43:45`
 */
export interface ExamQuestionsAddParams {
  questions: {
    question: {
      type: string
      score: number
      desc: string
      choiceList: string[]
      answer: {
        textList: string[]
      }
    }
  }[]
}

/**
 * 接口 [添加考题(与答案)(预留)↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2598) 的 **返回类型**
 *
 * @分类 [在线考试接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_386)
 * @标签 `v1`
 * @请求头 `POST /v1/exam/questions/add`
 * @更新时间 `2022-01-14 10:43:45`
 */
export type ExamQuestionsAddResult = boolean

/**
 * 接口 [更新考题(或答案)(预留)↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2607) 的 **请求类型**
 *
 * @分类 [在线考试接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_386)
 * @标签 `v1`
 * @请求头 `POST /v1/exam/questions/update`
 * @更新时间 `2022-01-14 11:44:02`
 */
export interface ExamQuestionsUpdateParams {
  questions: {
    questionId: string
    question: {
      type?: string
      score?: number
      desc?: string
      choiceList?: string[]
      answer: {
        textList?: string
      }
    }
  }[]
}

/**
 * 接口 [更新考题(或答案)(预留)↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2607) 的 **返回类型**
 *
 * @分类 [在线考试接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_386)
 * @标签 `v1`
 * @请求头 `POST /v1/exam/questions/update`
 * @更新时间 `2022-01-14 11:44:02`
 */
export type ExamQuestionsUpdateResult = boolean

/**
 * 接口 [考场信息↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2616) 的 **请求类型**
 *
 * @分类 [在线考试接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_386)
 * @标签 `v1`
 * @请求头 `GET /v1/exam/info/{examId}`
 * @更新时间 `2022-01-14 14:47:31`
 */
export interface ExamInfoExamIdParams {
  examId: string
}

/**
 * 接口 [考场信息↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2616) 的 **返回类型**
 *
 * @分类 [在线考试接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_386)
 * @标签 `v1`
 * @请求头 `GET /v1/exam/info/{examId}`
 * @更新时间 `2022-01-14 14:47:31`
 */
export interface ExamInfoExamIdResult {
  examName: string
  startTime: number
  endTime: number
  duration: number
  type: string
  desc: string
  creator: string
  /**
   * 1:已创建 2进行中 3已结束
   */
  status: number
}

/**
 * 接口 [获取考试列表(教师端)↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2625) 的 **请求类型**
 *
 * @分类 [在线考试接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_386)
 * @标签 `v1`
 * @请求头 `GET /v1/exam/list/teacher`
 * @更新时间 `2022-01-14 14:55:30`
 */
export interface ExamListTeacherParams {
  pageNum: string
  /**
   * 默认10
   */
  pageSize?: string
}

/**
 * 接口 [获取考试列表(教师端)↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2625) 的 **返回类型**
 *
 * @分类 [在线考试接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_386)
 * @标签 `v1`
 * @请求头 `GET /v1/exam/list/teacher`
 * @更新时间 `2022-01-14 14:55:30`
 */
export interface ExamListTeacherResult {
  total: number
  nextId: string
  cnt: number
  currentPageNum: number
  nextPageNum: number
  pageSize: number
  endPage: boolean
  list: {
    examId: string
    examName: string
    startTime: number
    endTime: number
    duration: number
    type: string
    desc: string
    creator: string
    /**
     * 1已创建 2进行中 3已结束
     */
    status: number
    paper: {
      paperName: string
      questionList: string[]
    }
  }[]
}

/**
 * 接口 [试题列表↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2634) 的 **请求类型**
 *
 * @分类 [在线考试接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_386)
 * @标签 `v1`
 * @请求头 `GET /v1/exam/questionList/{type}`
 * @更新时间 `2022-01-12 10:25:38`
 */
export interface ExamQuestionListTypeParams {
  pageNum: string
  /**
   * 默认10
   */
  pageSize?: string
  /**
   * 如果默认所有，则填all，不可为空！
   */
  type: string
}

/**
 * 接口 [试题列表↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2634) 的 **返回类型**
 *
 * @分类 [在线考试接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_386)
 * @标签 `v1`
 * @请求头 `GET /v1/exam/questionList/{type}`
 * @更新时间 `2022-01-12 10:25:38`
 */
export interface ExamQuestionListTypeResult {
  total?: number
  nextId?: string
  cnt?: number
  currentPageNum?: number
  nextPageNum?: number
  pageSize?: number
  endPage?: boolean
  list?: {
    questionId?: string
    type?: string
    score?: number
    desc?: string
    choiceList?: string[]
  }[]
}

/**
 * 接口 [更新考试↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2643) 的 **请求类型**
 *
 * @分类 [在线考试接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_386)
 * @标签 `v1`
 * @请求头 `POST /v1/exam/update`
 * @更新时间 `2022-01-12 10:30:52`
 */
export interface ExamUpdateParams {
  examId: string
  name?: string
  startTime?: number
  endTime?: number
  type?: string
  desc?: string
  examinees?: string[]
  paper?: {
    name: string
    questionList: string[]
  }
}

/**
 * 接口 [更新考试↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2643) 的 **返回类型**
 *
 * @分类 [在线考试接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_386)
 * @标签 `v1`
 * @请求头 `POST /v1/exam/update`
 * @更新时间 `2022-01-12 10:30:52`
 */
export interface ExamUpdateResult {
  result: boolean
}

/**
 * 接口 [删除考试↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2652) 的 **请求类型**
 *
 * @分类 [在线考试接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_386)
 * @标签 `v1`
 * @请求头 `POST /v1/exam/delete`
 * @更新时间 `2022-01-12 10:26:07`
 */
export interface ExamDeleteParams {
  examId: string
}

/**
 * 接口 [删除考试↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2652) 的 **返回类型**
 *
 * @分类 [在线考试接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_386)
 * @标签 `v1`
 * @请求头 `POST /v1/exam/delete`
 * @更新时间 `2022-01-12 10:26:07`
 */
export interface ExamDeleteResult {
  result: boolean
}

/**
 * 接口 [加入考试房间↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2661) 的 **请求类型**
 *
 * @分类 [在线考试接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_386)
 * @标签 `v1`
 * @请求头 `GET /v1/exam/roomToken`
 * @更新时间 `2022-01-12 10:36:02`
 */
export interface ExamRoomTokenParams {
  roomId: string
}

/**
 * 接口 [加入考试房间↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2661) 的 **返回类型**
 *
 * @分类 [在线考试接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_386)
 * @标签 `v1`
 * @请求头 `GET /v1/exam/roomToken`
 * @更新时间 `2022-01-12 10:36:02`
 */
export interface ExamRoomTokenResult {
  roomToken: string
}

/**
 * 接口 [考场学生列表↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2670) 的 **请求类型**
 *
 * @分类 [在线考试接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_386)
 * @标签 `v1`
 * @请求头 `GET /v1/exam/examinees/{examId}`
 * @更新时间 `2022-02-09 14:44:23`
 */
export interface ExamExamineesExamIdParams {
  pageNum: string
  /**
   * 默认10
   */
  pageSize?: string
  examId: string
}

/**
 * 接口 [考场学生列表↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2670) 的 **返回类型**
 *
 * @分类 [在线考试接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_386)
 * @标签 `v1`
 * @请求头 `GET /v1/exam/examinees/{examId}`
 * @更新时间 `2022-02-09 14:44:23`
 */
export interface ExamExamineesExamIdResult {
  total: number
  nextId: string
  cnt: number
  currentPageNum: number
  nextPageNum: number
  pageSize: number
  endPage: boolean
  list: {
    userId: string
    roomInfo: {
      roomId: string
    }
    userName: string
    /**
     * 1未开始 2答卷中 3已交卷
     */
    examPaperStatus: number
    rtcInfo: {
      publishUrl: string
      rtmpPlayUrl: string
      flvPlayUrl: string
      hlsPlayUrl: string
      roomToken: string
    }
  }[]
}

/**
 * 接口 [删除题目↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2679) 的 **请求类型**
 *
 * @分类 [在线考试接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_386)
 * @标签 `v1`
 * @请求头 `POST /v1/exam/question/delete`
 * @更新时间 `2022-01-14 11:20:08`
 */
export interface ExamQuestionDeleteParams {
  questionId: string
}

/**
 * 接口 [删除题目↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2679) 的 **返回类型**
 *
 * @分类 [在线考试接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_386)
 * @标签 `v1`
 * @请求头 `POST /v1/exam/question/delete`
 * @更新时间 `2022-01-14 11:20:08`
 */
export interface ExamQuestionDeleteResult {
  result?: boolean
}

/**
 * 接口 [上报作弊日志↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2688) 的 **请求类型**
 *
 * @分类 [在线考试接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_386)
 * @标签 `v1`
 * @请求头 `POST /v1/exam/eventLog`
 * @更新时间 `2022-01-25 13:56:10`
 */
export interface ExamEventLogParams {
  examId: string
  userId: string
  event: {
    action: string
    value?: string
  }
}

/**
 * 接口 [上报作弊日志↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2688) 的 **返回类型**
 *
 * @分类 [在线考试接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_386)
 * @标签 `v1`
 * @请求头 `POST /v1/exam/eventLog`
 * @更新时间 `2022-01-25 13:56:10`
 */
export interface ExamEventLogResult {
  result: boolean
}

/**
 * 接口 [轮询作弊日志↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2715) 的 **请求类型**
 *
 * @分类 [在线考试接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_386)
 * @标签 `v1`
 * @请求头 `POST /v1/exam/eventLog/more`
 * @更新时间 `2022-02-09 14:55:13`
 */
export interface ExamEventLogMoreParams {
  userList: string[]
  /**
   * 首次查询传-1
   */
  lastTimestamp: number
  examId: string
}

/**
 * 接口 [轮询作弊日志↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2715) 的 **返回类型**
 *
 * @分类 [在线考试接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_386)
 * @标签 `v1`
 * @请求头 `POST /v1/exam/eventLog/more`
 * @更新时间 `2022-02-09 14:55:13`
 */
export interface ExamEventLogMoreResult {
  timestamp: number
  list: {
    userId: string
    eventList: {
      action: string
      value: string
      timestamp: number
    }[]
  }[]
}

/**
 * 接口 [AIToken↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2724) 的 **请求类型**
 *
 * @分类 [在线考试接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_386)
 * @标签 `v1`
 * @请求头 `GET /v1/exam/aiToken`
 * @更新时间 `2022-01-26 16:55:30`
 */
export interface ExamAiTokenParams {
  /**
   * 空表示只要AiToken
   */
  url?: string
}

/**
 * 接口 [AIToken↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2724) 的 **返回类型**
 *
 * @分类 [在线考试接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_386)
 * @标签 `v1`
 * @请求头 `GET /v1/exam/aiToken`
 * @更新时间 `2022-01-26 16:55:30`
 */
export interface ExamAiTokenResult {
  /**
   * http 请求的 token
   */
  aiToken: string
  /**
   * WebSocket 语音转文字的 token
   */
  signToken?: string
}

/**
 * 接口 [PandoraToken接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2742) 的 **请求类型**
 *
 * @分类 [在线考试接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_386)
 * @标签 `v1`
 * @请求头 `GET /pandora/token`
 * @更新时间 `2022-02-15 11:20:31`
 */
export interface PandoraTokenParams {}

/**
 * 接口 [PandoraToken接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2742) 的 **返回类型**
 *
 * @分类 [在线考试接口↗](http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/cat_386)
 * @标签 `v1`
 * @请求头 `GET /pandora/token`
 * @更新时间 `2022-02-15 11:20:31`
 */
export interface PandoraTokenResult {
  token: string
}

/* prettier-ignore-end */
