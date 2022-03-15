import React from "react";
import classNames from "classnames";
import './index.scss';

interface Props extends React.HTMLAttributes<HTMLDivElement> {

}

const UserPlayer = (props: Props) => {
  const {className, ...restProps} = props;
  return <div className={classNames('user-player', className)} {...restProps}>
    <div className='user-player-username'>吴亦凡</div>
  </div>
}

export default UserPlayer;