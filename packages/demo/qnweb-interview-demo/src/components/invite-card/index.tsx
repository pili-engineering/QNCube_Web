import React  from 'react';
import { Card } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import Icon from '../icon';
import { linkConfig } from '../../config';
import './index.scss';

interface InviteCardProps {
  name?: string;
  jobs?: string;
  date?: number;
  onAgree?: React.MouseEventHandler<HTMLElement>;
  checked: boolean;
  onCheck: () => void;
}

/**
 * 邀请参加面试卡片组件
 * @param props
 * @constructor
 */
const InviteCard: React.FC<InviteCardProps> = props => {
  const { name, jobs, date, onAgree, children, checked, onCheck } = props;
  return <Card bodyStyle={{ padding: 0 }} className="invite-card" bordered={false}>
    <div className="info">
      {/*<div className="info-side">面试场景</div>*/}
      <div className="info-panel">
        <h2 className="info-panel-title">欢迎参加面试</h2>
        <div className="info-panel-ctx">
          <div className="info-panel-label">面试者</div>
          <div className="info-panel-dtl">{name}</div>
        </div>
        <div className="info-panel-ctx">
          <div className="info-panel-label">面试岗位</div>
          <div className="info-panel-dtl">{jobs}</div>
        </div>
        <div className="date-box">
          <div className="time-box">
            <div className="time">
              {date && dayjs(date * 1000).format('HH:mm')}
            </div>
          </div>
          <div className="date">
            {date && dayjs(date * 1000).locale('zh-cn').format('YYYY年MM月DD日(ddd)')}
          </div>
        </div>
        {/*<div className="privacy">*/}
        {/*  我已阅读并同意<a className="privacy-text" target="_blank"> 《用户隐私政策》 </a>*/}
        {/*</div>*/}
        <div className='agreement-check' onClick={onCheck}>
          <Icon type={checked ? 'icon-pitch-on' : 'icon-pitch-on-off'}/>
          <span className='agreement'>
            我已阅读并同意
            <a
              target='_blank'
              href={linkConfig.userAgreement}
              className='blank-link'
              rel="noreferrer"
            >《七牛云服务用户协议》</a>
            和
            <a
              className='blank-link'
              target='_blank'
              href={linkConfig.privacyRight}
              rel="noreferrer"
            >《隐私权政策》</a></span>
        </div>
        <div className='agree-btn' onClick={onAgree}>同意并加入</div>
      </div>
    </div>
    {children}
  </Card>;
};

export default InviteCard;