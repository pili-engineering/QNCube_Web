import React, {
  FC, useContext, useRef, useState,
} from 'react';
import { message, Modal, TooltipProps } from 'antd';
import classNames from 'classnames';
import { InputMode, PenType, GeometryMode } from 'qnweb-whiteboard';

import {
  CloudClassIconFont,
  IconGeometry,
  IconGesture,
  IconMouse,
  IconPenMark,
  IconPenPencil,
  IconRubber,
  IconUpload,
  ToolbarProps,
  IconType,
  QNWhiteBoardStoreContext,
  CircleBarConfig
} from '@/components';

import { useCalculateSwitchValue } from './hooks';

export const BaseToolbar: FC<ToolbarProps> = (props) => {
  const {
    className,
    direction = 'horizontal',
    fixed,
    switchable,
    style,
    ...restProps
  } = props;
  const { state, dispatch } = useContext(QNWhiteBoardStoreContext);

  const [visible, setVisible] = useState(true);

  const [switchValue] = useCalculateSwitchValue(
    direction,
    'toolbarBlock',
    0,
  );

  const switchText = `${visible ? '缩起' : '展开'}工具栏`;
  const translateDirection = direction === 'vertical' ? 'X' : 'Y';
  const fixedOffsetValue = fixed === 'right' || fixed === 'bottom' ? switchValue : -switchValue;
  const offsetValue = visible ? 0 : fixedOffsetValue;

  const mapPlacement = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  };

  const placement = mapPlacement[fixed || 'bottom'] as TooltipProps['placement'];

  const [circleBarConfig, setCircleBarConfig] = useState<CircleBarConfig>();
  /**
   * circleBar 组件值更新
   * @param value
   */
  const onChangeCircleBarConfig: (value: CircleBarConfig) => void = (value) => {
    if (value.size) {
      dispatch({
        type: 'updatePenSize',
        payload: value.size,
      });
    }
    if (value.color) {
      dispatch({
        type: 'updatePenColor',
        payload: value.color,
      });
    }
    setCircleBarConfig({
      ...circleBarConfig,
      ...value,
    });
  };

  const [gesture, setGesture] = useState<IconType>();
  const [rubber, setRubber] = useState<number>();
  const [geometry, setGeometry] = useState<IconType>();

  /**
   * 修改输入模式
   * @param mode
   */
  const onModeChange = (mode: InputMode) => {
    dispatch({
      type: 'updateInputMode',
      payload: mode,
    });
  };

  const QNWhiteboardUploadInput = useRef<HTMLInputElement | null>(null);

  /**
   * 上传文件请求
   * @param file
   */
  const uploadFileRequest = (file: File) => new Promise<void>((resolve, reject) => {
    const width = state.whiteboard?.controller.documentWidth;
    const height = state.whiteboard?.controller.documentHeight;
    state.whiteboard?.uploadFile({
      file,
      left: 0,
      top: 0,
      width,
      height,
      callback(error?: Error) {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      },
    });
  });

  /**
   * 选中文件并上传
   */
  const onUploadFileChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const files = event.target.files || [];
    const { whiteboard } = state;
    if (whiteboard) {
      uploadFileRequest(files[0]).then(() => message.success('文件上传成功~')).catch((error) => {
        Modal.warning({
          title: '上传文件出错',
          content: error.message,
        });
      }).finally(() => {
        const inputElement = QNWhiteboardUploadInput.current;
        if (inputElement) {
          inputElement.value = '';
        }
      });
    }
  };

  return (
    <div
      className={classNames('toolbar', `toolbar-direction-${direction}`, className)}
      id="toolbar"
      {...restProps}
      style={{
        transform: switchable ? `translate${translateDirection}(${offsetValue}px)` : '',
        ...style,
      }}
    >
      <div
        className={classNames('toolbar-block')}
        id="toolbarBlock"
      >
        <IconMouse
          className="button"
          onClick={() => onModeChange(InputMode.Select)}
        />
        <IconPenPencil
          className="button"
          direction="horizontal"
          popover={{ placement }}
          value={circleBarConfig}
          onValueChange={(value) => {
            dispatch({
              type: 'updatePenType',
              payload: PenType.WritingPen,
            });
            onChangeCircleBarConfig(value);
          }}
          onClick={() => onModeChange(InputMode.Pencil)}
        />
        <IconPenMark
          className="button"
          direction="horizontal"
          popover={{ placement }}
          value={circleBarConfig}
          onValueChange={(value) => {
            dispatch({
              type: 'updatePenType',
              payload: PenType.HighlighterPen,
            });
            onChangeCircleBarConfig(value);
          }}
          onClick={() => onModeChange(InputMode.Mark)}
        />
        <IconGesture
          className="button"
          direction="horizontal"
          popover={{ placement }}
          value={gesture}
          onValueChange={(value) => {
            const map = {
              'icon-gesture': PenType.Pointer2,
              'icon-laser-2': PenType.Pointer1,
              'icon-laser-3': PenType.Pointer3,
              'icon-laser-4': PenType.Pointer4,
            };
            const penType = map[value as keyof typeof map];
            dispatch({
              type: 'updatePenType',
              payload: penType,
            });
            setGesture(value);
          }}
          onClick={() => onModeChange(InputMode.Laser)}
        />
        <IconRubber
          className="button"
          direction="horizontal"
          popover={{ placement }}
          value={rubber}
          onValueChange={(value) => {
            dispatch({
              type: 'updateRubberSize',
              payload: value,
            });
            setRubber(value);
          }}
          onClick={() => onModeChange(InputMode.Rubber)}
        />
        <IconGeometry
          className="button"
          direction="horizontal"
          popover={{ placement }}
          value={geometry}
          onValueChange={(value) => {
            const map = {
              'icon-solid-line': GeometryMode.Line,
              'icon-arrow-line': GeometryMode.Arrow,
              'icon-rectangle-line': GeometryMode.Rectangle,
              'icon-circle-line': GeometryMode.Circle,
            };
            const geometryMode = map[value as keyof typeof map];
            dispatch({
              type: 'updateGeometryMode',
              payload: geometryMode,
            });
            setGeometry(value);
          }}
          onClick={() => onModeChange(InputMode.Geometry)}
        />
        <CloudClassIconFont
          type="icon-lajixiang"
          style={{ fontSize: 26 }}
          className="button"
          onClick={() => {
            const documentId = state.curDocument?.documentId;
            if (documentId) {
              state.whiteboard?.clearPage({
                widgetId: documentId,
              });
            }
          }}
        />
        <IconUpload
          className="button"
          onClick={() => {
            QNWhiteboardUploadInput.current?.click();
          }}
        />
        <input
          type="file"
          ref={QNWhiteboardUploadInput}
          style={{ display: 'none' }}
          onChange={onUploadFileChange}
        />
      </div>
      {
        switchable ? (
          <div className="switch" onClick={() => setVisible(!visible)}>
            {
              switchText.split('').map((text, index) => {
                const mapText = {
                  vertical: <div key={index}>{text}</div>,
                  horizontal: text,
                };
                return mapText[direction];
              })
            }
          </div>
        ) : null
      }
    </div>
  );
};
