import validate from "./validation";

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