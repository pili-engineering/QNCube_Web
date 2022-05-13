/**
 * 表单校验方法
 * @param {值} values 
 * @param {字段及规则} fields 
 */
export const validateForm = (values, fields) => {
  const errors = [];
  fields.forEach(field => {
    const { name } = field;
    field.rules.forEach(rule => {
      if (rule.required && !values[name]) errors.push(rule.message);
      if (rule.checked && !values[name]) errors.push(rule.message);
    })
  });
  return {
    errors
  };
}