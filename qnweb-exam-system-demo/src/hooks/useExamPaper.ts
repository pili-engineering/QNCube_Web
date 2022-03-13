import { useEffect, useState } from 'react';
import { ExamPaperExamIdResult } from '@/api/types';
import ExamApi from '@/api/ExamApi';

export type QuestionList = ExamPaperExamIdResult['questionList'];

const useExamPaper = (examId: string) => {
  const [questions, setQuestions] = useState<QuestionList>([]);
  const [paperName, setPaperName] = useState<string>();
  const [totalScore, setTotalScore] = useState<number>();
  useEffect(() => {
    if (examId) {
      ExamApi.getPaper({
        examId,
      }).then((res) => {
        setQuestions(res.questionList);
        setPaperName(res.paperName);
        setTotalScore(res.totalScore);
      });
    }
  }, [examId]);
  return {
    questions,
    paperName,
    totalScore,
  };
};

export default useExamPaper;
