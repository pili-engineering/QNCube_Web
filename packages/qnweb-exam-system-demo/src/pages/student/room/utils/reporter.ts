import { pandora } from '@/utils';
import ExamApi from '@/api/ExamApi';

/**
 * 提交试卷数据上报
 * @param examId
 */
export function commitExamPaperReport(examId: string) {
  return pandora.report({
    action: 'commit_exam_paper',
    value: {
      userId: pandora.getCacheValue('userId'),
      role: pandora.getCacheValue('role'),
      pathname: pandora.getCacheValue('pathname'),
      examId
    },
  });
}

/**
 * 退出答题数据上报
 * @param examId
 */
export function quitAnswerQuestionsReport(examId: string) {
  return pandora.report({
    action: 'quit_answer_questions',
    value: {
      userId: pandora.getCacheValue('userId'),
      role: pandora.getCacheValue('role'),
      pathname: pandora.getCacheValue('pathname'),
      examId
    },
  });
}

/**
 * 开始考试数据上报
 * @param examId
 */
export function startExamReport(examId: string) {
  return pandora.report({
    action: 'start_exam',
    value: {
      userId: pandora.getCacheValue('userId'),
      role: pandora.getCacheValue('role'),
      pathname: pandora.getCacheValue('pathname'),
      examId
    },
  });
}
