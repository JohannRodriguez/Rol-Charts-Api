import api_call from '../../../api/api_call';
import validate from './validation';

export const submit = async (event, method, url, obj, setResponse) => {
  event.preventDefault();

  const fetch = await api_call(method, url, obj);
  setResponse(fetch);
};
export const change = () => {

};
export const validationChange = (event, fields, setFields, validation, setValidation) => {
  setFields({
    ...fields,
    [event.target.name]: {
      ...fields[event.target.name],
      field: event.target.value
    }
  });

  validate(event.target.name, event.target.value, fields, validation, setValidation);
};

export const getFields = (fields, type) => {
  const keys = Object.keys(fields);
  const obj = { [type]: {} }
  keys.map(key => {
    obj[type][key] = fields[key].field;
  });
  return obj;
};
