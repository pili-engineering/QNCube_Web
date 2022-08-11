import React, { useEffect, useReducer } from 'react';
import QNWhiteboard, { GeometryMode, InputMode, PenType } from 'qnweb-whiteboard';

import { useDocumentChange, usePageListChanged, WhiteboardDocument } from '../_hooks';

export type QNWhiteBoardStoreProps = React.HTMLAttributes<HTMLDivElement>;

export interface QNWhiteBoardState {
  penColor: string; // 画笔颜色
  penSize: number; // 画笔大小
  penType: PenType; // 画笔类型
  whiteboard: QNWhiteboard | null;
  rubberSize: number; // 橡皮大小
  geometryMode: GeometryMode; // 图形模式
  inputMode: InputMode; // 白板输入模式
  isDebug: boolean; // 是否开启 debug 调试
  webassemblyReady: boolean; // 白板 webassembly 资源加载
  documentLoaded: boolean; // 白板文档加载
  documents: WhiteboardDocument[]; // 白板文档列表
  curDocument?: WhiteboardDocument; // 当前白板文档
}

export interface QNWhiteBoardAction {
  type: 'updatePenColor' | 'updatePenSize' |
    'updatePenType' | 'updateWhiteboard' |
    'updateRubberSize' | 'updateGeometryMode' |
    'updateInputMode' | 'updateIsDebug' |
    'updateWebassemblyReady' | 'updateDocumentLoaded' |
    'updateDocuments' | 'updateCurDocument';
  payload: any;
}

export interface IQNWhiteBoardStoreContext {
  state: QNWhiteBoardState;
  dispatch: (action: QNWhiteBoardAction) => void;
}

export const QNWhiteBoardDefaultState = {
  penColor: '#000000',
  penSize: 10,
  penType: PenType.WritingPen,
  whiteboard: null,
  rubberSize: 30,
  geometryMode: GeometryMode.Line,
  inputMode: InputMode.Pencil,
  isDebug: false,
  webassemblyReady: false,
  documentLoaded: false,
  documents: [],
};

export const QNWhiteBoardStoreContext = React.createContext<IQNWhiteBoardStoreContext>({
  state: QNWhiteBoardDefaultState,
  dispatch: (action: QNWhiteBoardAction) => {
    console.log(action);
  },
});

export function reducer(state: QNWhiteBoardState, action: QNWhiteBoardAction) {
  const { type, payload } = action;
  switch (type) {
    case 'updateWhiteboard':
      return {
        ...state,
        whiteboard: payload,
      };
    case 'updatePenType':
      return {
        ...state,
        penType: payload,
      };
    case 'updatePenColor':
      return {
        ...state,
        penColor: payload,
      };
    case 'updatePenSize':
      return {
        ...state,
        penSize: payload,
      };
    case 'updateRubberSize':
      return {
        ...state,
        rubberSize: payload,
      };
    case 'updateGeometryMode':
      return {
        ...state,
        geometryMode: payload,
      };
    case 'updateInputMode':
      return {
        ...state,
        inputMode: payload,
      };
    case 'updateIsDebug':
      return {
        ...state,
        isDebug: payload,
      };
    case 'updateWebassemblyReady':
      return {
        ...state,
        webassemblyReady: payload,
      };
    case 'updateDocumentLoaded':
      return {
        ...state,
        documentLoaded: payload,
      };
    case 'updateDocuments':
      return {
        ...state,
        documents: payload,
      };
    case 'updateCurDocument':
      return {
        ...state,
        curDocument: payload,
      };
    default:
      return state;
  }
}

export const QNWhiteBoardStore = (props: QNWhiteBoardStoreProps) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, QNWhiteBoardDefaultState);
  const {
    penType, penSize, penColor,
    whiteboard, rubberSize, inputMode,
    geometryMode, documentLoaded,
  } = state;

  const { documents } = usePageListChanged(state.whiteboard);
  const { curDocument } = useDocumentChange(state.whiteboard, documents);

  /**
   * update document
   */
  useEffect(() => {
    console.log('documents', documents);
    console.log('curDocument', curDocument);
    dispatch({
      type: 'updateDocuments',
      payload: documents,
    });
    dispatch({
      type: 'updateCurDocument',
      payload: curDocument,
    });
  }, [documents, curDocument]);

  /**
   * 设置画笔
   */
  useEffect(() => {
    const style = {
      type: penType,
      size: penSize,
      color: penType === 1 ? `#ff${penColor.replace('#', '')}` : `#ff${penColor.replace('#', '')}`,
    };
    if (whiteboard && documentLoaded) {
      whiteboard.setPenStyle(style);
    }
  }, [whiteboard, penColor, penSize, penType, documentLoaded]);

  /**
   * 设置橡皮大小
   */
  useEffect(() => {
    if (whiteboard && inputMode === InputMode.Rubber && documentLoaded) {
      whiteboard.setEraseSize(rubberSize);
    }
  }, [whiteboard, rubberSize, inputMode, documentLoaded]);

  /**
   * 设置图形模式
   */
  useEffect(() => {
    if (whiteboard && inputMode === InputMode.Geometry && documentLoaded) {
      whiteboard.setGeometryMode(geometryMode);
    }
  }, [whiteboard, inputMode, geometryMode, documentLoaded]);

  /**
   * 切换白板输入模式
   */
  useEffect(() => {
    if (whiteboard && documentLoaded) {
      whiteboard.setInputMode(inputMode);
    }
  }, [whiteboard, inputMode, documentLoaded]);

  return (
    <QNWhiteBoardStoreContext.Provider value={{ state, dispatch }}>
      {children}
    </QNWhiteBoardStoreContext.Provider>
  );
};
