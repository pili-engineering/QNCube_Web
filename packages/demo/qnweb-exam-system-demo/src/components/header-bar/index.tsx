import React, { useContext } from 'react';
import classNames from 'classnames';
import './index.scss';
import { userStoreContext } from '@/store/UserStore';

export interface HeaderBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: string | null;
  username?: string | null;
  onExit?: React.MouseEventHandler<HTMLDivElement>;
  fixedTop?: boolean;
  showExit?: boolean;
  onTitleClick?: React.MouseEventHandler<HTMLDivElement>;
}

const isNull = (value: unknown): value is null => value === null;

const HeaderBar: React.FC<HeaderBarProps> = (props) => {
  const {
    className, children, title,
    username, fixedTop = true, onExit, showExit = true,
    onTitleClick, ...restProps
  } = props;
  const useStore = useContext(userStoreContext);
  return (
    <>
      <div
        className={classNames('header-bar', {
          'header-bar-fixed-top': fixedTop,
        }, className)}
        {...restProps}
      >
        {!isNull(title) && <div className="title" onClick={onTitleClick}>{title || '我的考试'}</div>}
        <div className="body">{children}</div>
        {
          !isNull(username) && (
            <div className="prompt">
              欢迎您，
              {username || useStore.state.userInfo?.nickname}
            </div>
          )
        }
        {showExit && <div className="exit-button" onClick={onExit}>退出</div>}
      </div>
      {fixedTop && <div className="header-bar-placeholder" />}
    </>
  );
};

export default HeaderBar;
