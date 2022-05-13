import RtcRoom from './RtcRoom';

/**
 * TODO
 * 播放器
 */
class PlayerTool {
  public rtcRoom?: RtcRoom;
  constructor(rtcRoom: RtcRoom) {
    this.rtcRoom = rtcRoom;
  }
}

export default PlayerTool;