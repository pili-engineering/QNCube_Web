# 监考系统 High Level SDK

## DOM树

```ts
|-- QNDevice
  |-- QNTrack
|-- QNDetector
|-- QNExamClient
```

## API

### 通用类型

```ts
interface QNNumberRange {
  max?: number; // 最大值
  min?: number; // 最小值
  exact?: number; // 希望能取到exact的值，如果失败就抛出错误
  ideal?: number; // 优先取ideal的值, 其次取min-max范围内一个支持的值, 否则就抛出错误
}

type QNOptimizationMode = 'motion' | 'detail'; // 传输优化模式, motion: 流畅优先, detail: 清晰优先, 默认浏览器根据自身算法确定模式
```

### 配置类型

```ts
interface QNCameraConfig {
  cameraId?: string, // 选择摄像头id
  elementId?: string, // 绑定元素的id
  bitrate?: number, // 传输的码率，单位 kbps
  frameRate?: number, // 帧率
  height?: number | QNNumberRange, // 视频高度
  width?: number | QNNumberRange, // 视频宽度
  optimizationMode?: QNOptimizationMode; // 传输优化模式
}

interface QNMicrophoneConfig {
  microphoneId?: string, // 选择麦克风id
  elementId?: string, // 绑定元素的id
  bitrate?: number, // 传输的码率，单位 kbps
  // 以下建议不要更改，浏览器会根据设备自动适配
  sampleRate?: number, // 采样率
  sampleSize?: number, // 采样大小
  channelCount?: number, // 声道数
  isAutoGainControlEnabled?: boolean, // 是否打开自动增益
  isEchoCancellationEnabled?: boolean, // 是否打开回声消除
  isNoiseSuppressionEnabled?: boolean, // 是否打开噪声抑制
}

interface QNScreenConfig {
  elementId?: string, // 绑定元素的id
  bitrate?: number, // 传输的码率，单位 kbps
  width?: number | QNNumberRange, // 输出画面的宽度
  height?: number | QNNumberRange, // 输出画面的高度
  optimizationMode?: QNOptimizationMode; // 传输优化模式
}

interface QNAIDetectorConfig {
  interval: number; // 检测时间间隔, 单位毫秒(ms), 默认5000毫秒(ms)
}
```

### 响应类型

```ts
interface QNTestResult {
  isCameraEnabled?: boolean, // 摄像头是否正常开启
  isMicrophoneEnabled?: boolean, // 麦克风是否正常开启
  isScreenEnabled?: boolean, // 屏幕共享是否正常开启
  isSDKSupport?: boolean; // SDK 是否支持
}

interface QNDetectorResult<T> {
  code: number, // 0: 成功, 其他: 失败
  timestamp: number, // 触发时间
  id: string, // 响应id
  data?: T, // 响应数据结果
  message: string, // 成功/错误消息提示
}

type QNAIDetectorResult = QNDetectorResult<{score: number}>; // score: 检测结果得分

type QNKeyboardDetectorResult = QNDetectorResult<{text: string}>; // text: 文本内容

type QNBrowserTabDetectorResult = QNDetectorResult<{visible: boolean}>; // visible: tab是否可见
```

### 内置设备(QNDevice)

```ts
abstract class QNDevice {
  static create: (config: QNCameraConfig | QNMicrophoneConfig | QNScreenConfig) => QNDevice; // 创建设备
  start(): Promise<void>; // 开启设备
  stop(): Promise<void>; // 关闭设备
}

class QNCamera implements QNDevice {
  static create(config: QNCameraConfig): QNCamera; // 创建摄像头
  static getCameras(): MediaDeviceInfo[]; // 枚举可用的摄像头输入设备
  cameraVideoTrack: QNCameraVideoTrack; // 当前Track对象
  start(): Promise<void>; // 开启摄像头
  stop(): Promise<void>; // 关闭摄像头
}

class QNMicrophone implements QNDevice {
  static create(config: QNMicrophoneConfig): QNMicrophone; // 创建麦克风
  static getMicrophones(): MediaDeviceInfo[]; // 枚举可用的麦克风输入设备
  microphoneAudioTrack: QNMicrophoneAudioTrack; // 当前Track对象
  start(): Promise<void>; // 开启麦克风
  stop(): Promise<void>; // 关闭麦克风
}

class QNScreen implements QNDevice {
  static create(config: QNScreenConfig): QNScreen; // 创建屏幕共享
  screenVideoTrack: QNScreenVideoTrack; // 当前Track对象
  start(): Promise<void>; // 开启屏幕共享
  stop(): Promise<void>; // 关闭屏幕共享
}
```

### 内置检测器(QNDetector)

```ts
abstract class QNDetector {
  static create(config?): Detector; // 创建检测器
  abstract on(callback: Function): void; // 监听回调
}

// 用户出框检测器
class QNOutOfScreenDetector implements QNDetector {
  static create(config: QNAIDetectorConfig): QNOutOfScreenDetector;
  on(result: QNAIDetectorResult): void;
}
// 多人同框检测器
class QNMultiplePeopleDetector implements QNDetector {
  static create(config: QNAIDetectorConfig): QNMultiplePeopleDetector;
  on(result: QNAIDetectorResult): void;
}
// 用户替考检测器
class QNUserTakerDetector implements QNDetector {
  static create(config: QNAIDetectorConfig): QNUserTakerDetector;
  on(result: QNAIDetectorResult): void;
}
// 声音异常检测器
class QNAbnormalSoundDetector implements QNDetector {
  static create(config: QNAIDetectorConfig): QNAbnormalSoundDetector;
  on(result: QNAIDetectorResult): void;
}

// 复制检测器
class QNKeyboardCopyDetector implements QNDetector {
  static create(): QNKeyboardCopyDetector;
  on(result: QNKeyboardDetectorResult): void;
}
// 粘贴检测器
class QNKeyboardPasteDetector implements QNDetector {
  static create(): QNKeyboardPasteDetector;
  on(result: QNKeyboardDetectorResult): void;
}
// 剪切检测器
class QNKeyboardCutDetector implements QNDetector {
  static create(): QNKeyboardCutDetector;
  on(result: QNKeyboardDetectorResult): void;
}

// 浏览器tab检测器
class QNBrowserTabDetector implements QNDetector {
  static create(): QNBrowserTabDetector;
  on: (result: QNBrowserTabDetectorResult) => void;
}
```

### 核心类(QNExamClient)

```ts
class QNExamClient {
  static create(): QNExamClient; // 创建 client
  
  registerDevice(deviceId: string, device: QNDevice): void; // 注册设备
  unregisterDevice(device: QNDevice): void; // 取消注册设备
  
  enable(detector: QNDetector, deviceId?: string): void; // 开启检测 
  disable(detector: QNDetector): void; // 关闭检测
  
  identify(headImgPath: string): Promise<QNAIDetectorResult>; // 身份识别 
  
  test(): Promise<QNTestResult>; // 设备调试

  start(token: string): Promise<void>; // 开始监考
  stop(): Promise<void>; // 结束监考
}
```

## 如何使用

```ts
const client = QNExamClient.create(); // 创建监考系统

const camera = QNCamera.create({
  widht: 480,
  height: 720
}); // 创建摄像头设备

client.registerDevice('1000', camera); // 注册设备

const outOfScreenDetector = QNOutOfScreenDetector.create({
  interval: 4000
}); // 创建出框检测, 检测间隔4000毫秒(ms)

// 设置出框检测结果回调方法
outOfScreenDetector.on(result => {
  // 得到出框检测结果
  console.log('result', result);
});

client.enable(outOfScreenDetector, '1000'); // 将设备id为'1000'的设备开启出框检测

client.start(); // 开始监考
client.stop(); // 结束监考
```
