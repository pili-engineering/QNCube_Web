/**
 * https://github.com/ant-design/antd-dayjs-webpack-plugin/issues/23
 */
declare module 'moment' {
  import { Dayjs } from 'dayjs';
  namespace moment {
    type Moment = Dayjs
  }
  export = moment
}
