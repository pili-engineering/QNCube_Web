import React from 'react';

interface IconProps extends React.HTMLAttributes<HTMLDivElement>{
  type: string;
}

const Icon: React.FC<IconProps> = props => {
  const { type, ...restProps } = props;
  return <img alt={`icon-${type}`} {...restProps} src={require(`../../assets/images/${type}.svg`).default}/>
}

export default Icon;