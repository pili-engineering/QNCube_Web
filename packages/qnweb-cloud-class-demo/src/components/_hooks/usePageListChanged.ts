import { useEffect, useState } from 'react';
import QNWhiteboard from 'qnweb-whiteboard';

export interface WhiteboardPage {
  meetingId: string;
  bucketId: string;
  documents: WhiteboardDocument[];
}

export interface WhiteboardDocument {
  documentId: string;
  documentNo: number;
  bgColor: string;
  lastTime: number;
  url: string;
}

const log = (...args: any[]) => {
  console.log('usePageListChanged', ...args);
};

export const usePageListChanged = (whiteboardClient: QNWhiteboard) => {
  const [documents, setDocuments] = useState<WhiteboardDocument[]>([]);

  useEffect(() => {
    /**
     * 页面列表变更，例如有人新建或者删除页面
     * @param event
     * @param params
     */
    function handlePageListChanged(event: number, params: WhiteboardPage[]) {
      const newDocuments = params[0]?.documents || [];
      log('usePageListChanged documents', newDocuments);
      setDocuments(newDocuments);
    }

    if (whiteboardClient) {
      whiteboardClient.registerEvent(
        whiteboardClient.controller.Event.PageListChanged,
        handlePageListChanged,
      );
    }
    log('usePageListChanged whiteboardClient', whiteboardClient);
    return () => {
      if (whiteboardClient) {
        whiteboardClient.unregisterEvent(
          whiteboardClient.controller.Event.PageListChanged,
          handlePageListChanged,
        );
      }
    };
  }, [whiteboardClient]);

  return {
    documents,
  };
};

