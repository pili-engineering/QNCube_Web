import dayjs from 'dayjs';

/**
 * 格式化选中的时间
 * 当前时间后的固定时间点（半点或整点）
 * @param {*} value 
 */
export const normalize = value => {
  const curMinute = dayjs(value).minute();
  const showMinute = curMinute === 0 ?
    0 :
    curMinute <= 30 ? 30 : 60;
  return dayjs(value).minute(showMinute).valueOf();
}

// 延迟xx时间
export const delayTime = (cur, time = 0) => normalize(cur) + time;

// 格式化为YYYY年MM月DD日HH:mm时间
export const formatText = (cur, time = 0) => dayjs(delayTime(cur, time)).format('YYYY年MM月DD日HH:mm')