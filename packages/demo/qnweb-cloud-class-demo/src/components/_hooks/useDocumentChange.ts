import { useEffect, useState } from 'react';
import { WhiteboardDocument } from './usePageListChanged';

const log = (...args: any[]) => {
  console.log('useDocumentChange', ...args);
};

const useDocumentChange = (whiteboardClient: any, documents: WhiteboardDocument[]) => {
  const [curDocument, setCurDocument] = useState<WhiteboardDocument>();
  const [curWidgetId, setCurWidgetId] = useState<string>();

  useEffect(() => {
    /**
     * 文档发生变更
     * @param event
     * @param params-返回时string为色值
     */
    function handleDocumentChange(event: number, params: { widgetId: string }) {
      log('handleDocumentChange', params);
      log('document size:', whiteboardClient.controller.documentWidth, whiteboardClient.controller.documentHeight);
      if (typeof params === 'object' && params !== null) {
        setCurWidgetId(params.widgetId);
      }
    }

    if (whiteboardClient) {
      whiteboardClient.registerEvent(
        whiteboardClient.controller.Event.DocumentChange,
        handleDocumentChange,
      );
    }
    return () => {
      if (whiteboardClient) {
        whiteboardClient.unregisterEvent(
          whiteboardClient.controller.Event.DocumentChange,
          handleDocumentChange,
        );
      }
    };
  }, [whiteboardClient, documents]);

  useEffect(() => {
    const findDocument = documents.find((document) => document.documentId === curWidgetId);
    log('useDocumentChange documents', documents);
    log('useDocumentChange curDocument', findDocument);
    setCurDocument(findDocument || documents[0]);
  }, [documents, curWidgetId]);

  return {
    curDocument,
  };
};

export default useDocumentChange;
