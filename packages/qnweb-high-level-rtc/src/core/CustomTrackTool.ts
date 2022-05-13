import RtcRoom from "./RtcRoom";
import { QNCustomAudioTrack, QNCustomVideoTrack } from 'qnweb-rtc';

/**
 * TODO
 * 自定义track
 */
class CustomTrackTool {
  public rtcRoom?: RtcRoom;
  public customTracks: (QNCustomAudioTrack | QNCustomVideoTrack)[] = [];
  constructor(rtcRoom: RtcRoom) {
    this.rtcRoom = rtcRoom;
  }
}

export default CustomTrackTool;