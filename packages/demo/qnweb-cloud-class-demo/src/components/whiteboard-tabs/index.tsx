import React, { FC, useContext } from 'react';
import { Tabs } from 'antd';
import { TabsProps } from 'antd/lib/tabs';
import classNames from 'classnames';
import { QNWhiteBoardStoreContext } from '../_store';
import './index.scss';

export interface WhiteBoardTabsProps extends TabsProps {

}

const WhiteBoardTabs: FC<WhiteBoardTabsProps> = (props) => {
  const { className } = props;
  const { state } = useContext(QNWhiteBoardStoreContext);
  /**
   * 切换 TabPane
   */
  const onChange = (targetKey: string) => {
    if (targetKey === 'add') {
      // 新增 TabPane
      state.whiteboard?.newDocument();
    } else {
      state.whiteboard?.cutDocument(targetKey);
    }
  };
  /**
   * 关闭 TabPane
   * @param targetKey
   */
  const remove = (targetKey: string) => {
    state.whiteboard?.deleteDocument(targetKey);
  };
  /**
   * 编辑 TabPane
   * @param targetKey
   * @param action
   */
  const onEdit: TabsProps['onEdit'] = (
    targetKey, action,
  ) => {
    if (action === 'remove') return remove(targetKey as string);
    return null;
  };
  return (
    <div
      className={classNames('wb-tabs', className)}
    >
      <Tabs
        type="editable-card"
        onChange={onChange}
        activeKey={state.curDocument?.documentId}
        onEdit={onEdit}
        hideAdd
      >
        {
          state.documents.sort(
            (prev, next) => prev.documentNo - next.documentNo,
          ).map((pane) => (
            <Tabs.TabPane
              tab={`白板${pane.documentNo}`}
              key={pane.documentId}
              closable={pane.documentNo !== 1}
            />
          ))
        }
        <Tabs.TabPane
          tab="+新建白板"
          key="add"
          closable={false}
        />
      </Tabs>
    </div>
  );
};

export default WhiteBoardTabs;
