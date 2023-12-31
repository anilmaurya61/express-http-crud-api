const yup = require('yup');

let todoSchema = yup.object({

  text: yup.string().required(),
  isCompleted: yup.boolean().required(),
}).noUnknown();

module.exports = todoSchema;

