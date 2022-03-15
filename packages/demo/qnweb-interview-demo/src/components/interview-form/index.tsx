import React from 'react';
import { Button, DatePicker, Form, FormProps, Input, Radio } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import { Callbacks, FieldData } from 'rc-field-form/lib/interface';
import { limitNumberUtil, phoneNumberUtil } from '../../utils';
import { Moment } from 'moment';
import './index.scss';
import { buildRandomStr } from '../../utils';

dayjs.extend(weekday);
dayjs.extend(localeData);

export type FormAction = 'create' | 'update' | 'disabled';

interface InterviewFormProps extends FormProps {
  onCancel: () => void;
  action: FormAction;
  onFinish?: Callbacks['onFinish'];
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
};

export function normalize(value: number): Dayjs {
  const curMinute = dayjs(value).minute();
  const showMinute = curMinute === 0 ?
    0 :
    curMinute <= 30 ? 30 : 60;
  return dayjs(value).minute(showMinute);
}

const InterviewForm: React.FC<InterviewFormProps> = props => {
  const {
    onCancel, action, initialValues, onFinish, ...restProps
  } = props;
  const disabled = action === 'disabled';

  const [form] = Form.useForm();

  /**
   * 跟随开始时间，自动更改为开始时间的一小时后
   * @param changedFields
   */
  function onFieldsChange(changedFields: FieldData[]) {
    const [curField] = changedFields;
    const fieldName = curField.name;
    if (!Array.isArray(fieldName)) return;
    const field = fieldName[0];
    /**
     * 当前时间后的固定时间点（半点或整点）
     * @link https://cf.qiniu.io/pages/viewpage.action?pageId=62952333
     */
    if (field === 'startTime') {
      form.setFieldsValue({
        endTime: dayjs(curField.value).hour(dayjs(curField.value).hour() + 1)
      });
    }
    // 对手机号输入进行限制处理
    if (
      field === 'candidatePhone' || field === 'interviewerPhone'
    ) {
      form.setFieldsValue({
        [field]: phoneNumberUtil(curField.value)
      });
    }
    // 标题与应聘者姓名联动
    if (field === 'candidateName') {
      form.setFieldsValue({
        title: curField.value ? `${curField.value}的面试` : ''
      });
    }
    // 开启密码自动生成一个随机4位数字
    if (field === 'isAuth' && curField.value && !initialValues?.authCode) {
      form.setFieldsValue({
        authCode: buildRandomStr(4)
      })
    }
    if (field === 'authCode') {
      form.setFieldsValue({
        authCode: limitNumberUtil(curField.value, 4)
      })
    }
  }

  return <Form
    form={form}
    onFieldsChange={onFieldsChange}
    {...restProps}
    className="interview-form"
    {...layout}
    initialValues={{
      ...initialValues,
      startTime: initialValues?.startTime ? dayjs(initialValues.startTime * 1000) : null,
      endTime: initialValues?.endTime ? dayjs(initialValues.endTime * 1000) : null,
      isAuth: !!initialValues?.isAuth,
      isRecorded: !!initialValues?.isRecorded
    }}
    onFinish={value => onFinish && onFinish({
      ...value,
      startTime: dayjs(value.startTime).unix(), // 单位秒
      endTime: dayjs(value.endTime).unix() // 单位秒
    })}
  >
    <Form.Item
      label="面试标题"
      name="title"
      rules={[{ required: true, message: '请输入面试标题' }]}
    >
      <Input disabled={disabled}/>
    </Form.Item>
    <Form.Item
      label="开始时间"
      name="startTime"
      rules={[{ required: true, message: '请输入开始时间' }]}
      normalize={normalize}
    >
      <DatePicker
        style={{ width: '100%' }}
        showTime
        format="YYYY-MM-DD HH:mm"
        disabled={disabled}
        allowClear={false}
        disabledDate={(currentDate: Moment) => dayjs(currentDate).unix() < dayjs().unix()}
        showNow={false}
      />
    </Form.Item>
    <Form.Item
      shouldUpdate={(prevValues, currentValues) => prevValues.startTime !== currentValues.startTime || prevValues.endTime !== currentValues.endTime}
      noStyle
    >
      {
        ({ getFieldValue }) => {
          const startTime = getFieldValue('startTime') && getFieldValue('startTime').unix();
          const disabledDate = (currentDate: Moment) => dayjs(currentDate).unix() < startTime;
          return <Form.Item
            label="结束时间"
            name="endTime"
            normalize={normalize}
            rules={[{ required: true, message: '请输入结束时间' }]}
          >
            <DatePicker
              showNow={false}
              style={{ width: '100%' }}
              showTime
              format="YYYY-MM-DD HH:mm"
              disabled={disabled}
              allowClear={false}
              disabledDate={disabledDate}
            />
          </Form.Item>;
        }
      }
    </Form.Item>
    <Form.Item
      label="公司/部门"
      name="goverment"
      rules={[{ required: true, message: '请输入公司/部门' }]}
    >
      <Input disabled={disabled}/>
    </Form.Item>
    <Form.Item
      label="职位名称"
      name="career"
      rules={[{ required: true, message: '请输入职位名称' }]}
    >
      <Input disabled={disabled}/>
    </Form.Item>
    <Form.Item
      label="应聘者姓名"
      name="candidateName"
      rules={[{ required: true, message: '请输入应聘者姓名' }]}
    >
      <Input disabled={disabled}/>
    </Form.Item>
    <Form.Item
      label="应聘者手机"
      name="candidatePhone"
      rules={[{ required: true, message: '请输入应聘者手机' }]}
    >
      <Input disabled={disabled}/>
    </Form.Item>
    <Form.Item
      label="面试官姓名"
      name="interviewerName"
    >
      <Input placeholder="可选 (不填则默认当前用户为面试官)" disabled={disabled}/>
    </Form.Item>
    <Form.Item
      label="面试官手机"
      name="interviewerPhone"
    >
      <Input placeholder="可选 (不填则默认当前用户为面试官)" disabled={disabled}/>
    </Form.Item>
    <Form.Item
      label="入会密码"
      name="isAuth"
    >
      <Radio.Group disabled={disabled}>
        <Radio value={true}>开启</Radio>
        <Radio value={false}>关闭</Radio>
      </Radio.Group>
    </Form.Item>
    <Form.Item
      noStyle
      shouldUpdate={(prevValues, currentValues) => prevValues.isAuth !== currentValues.isAuth}
    >
      {
        ({ getFieldValue }) => getFieldValue('isAuth') ? <Form.Item label="密码" name="authCode">
          <Input disabled={disabled}/>
        </Form.Item> : null
      }
    </Form.Item>

    <Form.Item
      label="是否开启录制"
      name="isRecorded"
    >
      <Radio.Group disabled={disabled}>
        <Radio value={true}>开启</Radio>
        <Radio value={false}>关闭</Radio>
      </Radio.Group>
    </Form.Item>

    <Form.Item {...tailLayout}>
      <div className="button-wrap">
        <Button htmlType="submit" className="button" disabled={disabled}>确定</Button>
        <Button className="button" onClick={onCancel}>
          取消
        </Button>
      </div>
    </Form.Item>
  </Form>;
};

export default InterviewForm;