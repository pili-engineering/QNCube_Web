import React from 'react';
import classNames from 'classnames';
import teacherPNG from './images/teacher.png';
import studentPNG from './images/student.png';
import { Button } from 'antd';
import './index.scss';

export interface RoleSelectPanelProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  title?: string;
  tipTitle?: string;
  value?: string;
  onChange?: (value: RoleValue) => void;
  onSubmit?: () => void;
}

const prefixClassName = 'role-select-panel';

const roles = [
  { img: teacherPNG, value: 'teacher', label: '老师' },
  { img: studentPNG, value: 'student', label: '学生' },
] as const;

export type Role = typeof roles[number];
export type RoleValue = Role['value'];
export type RoleLabel = Role['label'];

const RoleSelectPanel: React.FC<RoleSelectPanelProps> = (props) => {
  const { className, title, tipTitle, onChange, value, onSubmit, ...restProps } = props;
  return <div className={classNames(prefixClassName, className)} {...restProps}>
    {title && <div className="title">{title}</div>}
    {tipTitle && <div className="tip-title">{tipTitle}</div>}
    <div className="role">
      {
        roles.map((role) => {
          return <div
            key={role.value}
            className={classNames('role-ctx', {
              ['role-ctx-selected']: value === role.value
            })}
            onClick={() => onChange?.(role.value)}
          >
            <img className="role-img" src={role.img} alt={role.value}/>
            <div className="role-label">{role.label}</div>
          </div>;
        })
      }
    </div>
    {value && <Button type='primary' shape='round' className='button' onClick={onSubmit}>确认</Button>}
  </div>;
};

export default RoleSelectPanel;
