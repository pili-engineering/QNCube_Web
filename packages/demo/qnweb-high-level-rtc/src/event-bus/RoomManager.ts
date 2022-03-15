import { RoomEntity } from '../types';

class RoomManager {
  public roomEntity: RoomEntity | null = null;
  constructor() {
  }

  setRoomEntity(roomEntity: RoomEntity) {
    this.roomEntity = roomEntity;
  }

  getRoomEntity() {
    return this.roomEntity;
  }
}

export default new RoomManager();