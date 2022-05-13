import React from 'react';
import classNames from 'classnames';
import { linkConfig } from '../../../../config';
import './index.scss';

export interface AgreementTextProps extends React.HTMLAttributes<HTMLDivElement> {

}

const AgreementText: React.FC<AgreementTextProps> = (props) => {
  const { className, ...restProps } = props;
  return (
    <span className={classNames('agreement-text', className)} {...restProps}>
      <span>我已阅读并同意</span>
      <a
        href={linkConfig.userAgreement}
        target="_blank"
        rel="noreferrer"
      >
        《七牛云服务用户协议》
      </a>
      <span>和</span>
      <a
        href={linkConfig.privacyRight}
        className="blank-link"
        target="_blank"
        rel="noreferrer"
      >
        《隐私权政策》
      </a>
    </span>
  );
};

export default AgreementText;
