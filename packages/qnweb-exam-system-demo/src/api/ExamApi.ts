import {
  ExamAnswerDetailsExamIdUserIdParams,
  ExamAnswerDetailsExamIdUserIdResult,
  ExamAnswerParams,
  ExamAnswerResult,
  ExamCreateParams,
  ExamCreateResult,
  ExamDeleteParams,
  ExamDeleteResult,
  ExamEventLogMoreParams, ExamEventLogMoreResult, ExamEventLogParams, ExamEventLogResult,
  ExamExamineesExamIdParams,
  ExamExamineesExamIdResult,
  ExamInfoExamIdParams,
  ExamInfoExamIdResult,
  ExamJoinParams,
  ExamJoinResult,
  ExamLeaveParams,
  ExamLeaveResult,
  ExamListStudentParams,
  ExamListStudentResult,
  ExamListTeacherParams,
  ExamListTeacherResult,
  ExamPaperExamIdParams,
  ExamPaperExamIdResult,
  ExamQuestionListTypeParams,
  ExamQuestionListTypeResult,
  ExamRoomTokenParams,
  ExamRoomTokenResult,
  ExamUpdateParams,
  ExamUpdateResult
} from './types';
import { httpRequestUtil } from './request';

const getAuthorization = () => `Bearer ${localStorage.getItem('authorization')}`;

class ExamApi {
  /**
   * 获取考试列表(学生端)
   */
  getListStudent(data: ExamListStudentParams) {
    return httpRequestUtil.getInstance().get<ExamListStudentResult, ExamListStudentResult>(
      '/v1/exam/list/student',
      {
        headers: {
          Authorization: getAuthorization(),
        },
        params: data,
      },
    );
  }

  /**
   * 试题列表
   */
  getQuestionList(data: Partial<ExamQuestionListTypeParams>) {
    const { type = 'all', ...rest } = data;
    return httpRequestUtil.getInstance().get<ExamQuestionListTypeResult, ExamQuestionListTypeResult>(
      `/v1/exam/questionList/${type}`,
      {
        headers: {
          Authorization: getAuthorization(),
        },
        params: rest
      },
    );
  }

  /**
   * 参加考试
   * @param data
   * @constructor
   */
  join(data: ExamJoinParams) {
    return httpRequestUtil.getInstance().post<ExamJoinResult, ExamJoinResult>(
      '/v1/exam/join',
      data,
      {
        headers: {
          Authorization: getAuthorization(),
        },
      },
    );
  }

  /**
   * 获取试卷
   * @param data
   */
  getPaper(data: ExamPaperExamIdParams) {
    return httpRequestUtil.getInstance().get<ExamPaperExamIdResult, ExamPaperExamIdResult>(
      `/v1/exam/paper/${data.examId}`,
      {
        headers: {
          Authorization: getAuthorization(),
        },
      },
    );
  }

  /**
   * 退出考试
   */
  leave(data: ExamLeaveParams) {
    return httpRequestUtil.getInstance().post<ExamLeaveResult, ExamLeaveResult>(
      '/v1/exam/leave',
      data,
      {
        headers: {
          Authorization: getAuthorization(),
        },
      },
    );
  }

  /**
   * 提交答案
   * @param data
   */
  submitAnswer(data: ExamAnswerParams) {
    return httpRequestUtil.getInstance().post<ExamAnswerResult, ExamAnswerResult>(
      '/v1/exam/answer',
      data,
      {
        headers: {
          Authorization: getAuthorization(),
        },
      },
    );
  }

  /**
   * 作答详情
   * @param data
   */
  getAnswerDetail(data: ExamAnswerDetailsExamIdUserIdParams) {
    return httpRequestUtil.getInstance().get<
      ExamAnswerDetailsExamIdUserIdResult,
      ExamAnswerDetailsExamIdUserIdResult
      >(
      `/v1/exam/answer/details/${data.examId}/${data.userId}}`,
      {
        headers: {
          Authorization: getAuthorization(),
        },
      },
    );
  }

  /**
   * 获取考试列表(教师端)
   */
  getListTeacher(data: ExamListTeacherParams) {
    return httpRequestUtil.getInstance().get<ExamListTeacherResult, ExamListTeacherResult>(
      '/v1/exam/list/teacher',
      {
        headers: {
          Authorization: getAuthorization(),
        },
        params: data,
      },
    );
  }

  /**
   * 创建考试
   * @param data
   */
  create(data: ExamCreateParams) {
    return httpRequestUtil.getInstance().post<ExamCreateResult, ExamCreateResult>(
      '/v1/exam/create',
      data,
      {
        headers: {
          Authorization: getAuthorization(),
        },
      },
    );
  }

  /**
   * 考场信息
   * @param data
   */
  getInfo(data: ExamInfoExamIdParams) {
    return httpRequestUtil.getInstance().get<ExamInfoExamIdResult, ExamInfoExamIdResult>(
      `/v1/exam/info/${data.examId}`,
      {
        headers: {
          Authorization: getAuthorization(),
        },
      },
    );
  }

  /**
   * 加入考试房间
   * @param data
   */
  examRoomToken(data: ExamRoomTokenParams) {
    return httpRequestUtil.getInstance().get<ExamRoomTokenResult, ExamRoomTokenResult>(
      `/v1/exam/roomToken`,
      {
        params: data
      }
    )
  }

  /**
   * 删除考试
   * @param data
   */
  delete(data: ExamDeleteParams) {
    return httpRequestUtil.getInstance().post<ExamDeleteResult, ExamDeleteResult>(
      `/v1/exam/delete`,
      data,
      {
        headers: {
          Authorization: getAuthorization(),
        },
      }
    )
  }

  /**
   * 考场学生列表
   * @param data
   */
  getExaminees(data: ExamExamineesExamIdParams) {
    const { examId, ...restData } = data;
    return httpRequestUtil.getInstance().get<ExamExamineesExamIdResult, ExamExamineesExamIdResult>(
      `/v1/exam/examinees/${examId}`,
      {
        params: restData,
        headers: {
          Authorization: getAuthorization(),
        },
      },
    )
  }

  /**
   * 更新考试
   * @param data
   */
  update(data: ExamUpdateParams) {
    return httpRequestUtil.getInstance().post<ExamUpdateResult, ExamUpdateResult>(
      `/v1/exam/update`,
      data,
      {
        headers: {
          Authorization: getAuthorization(),
        },
      }
    )
  }

  /**
   * 轮询作弊日志
   * @param data
   */
  pollCheating(data: ExamEventLogMoreParams) {
    return httpRequestUtil.getInstance().post<ExamEventLogMoreResult, ExamEventLogMoreResult>(
      '/v1/exam/eventLog/more',
      data,
      {
        headers: {
          Authorization: getAuthorization(),
        },
      },
    )
  }

  /**
   * 上报作弊日志
   * @param data
   */
  reportCheating(data: ExamEventLogParams) {
    return httpRequestUtil.getInstance().post<ExamEventLogResult, ExamEventLogResult>(
      '/v1/exam/eventLog',
      data,
      {
        headers: {
          Authorization: getAuthorization(),
        },
      },
    )
  }
}

export default new ExamApi();