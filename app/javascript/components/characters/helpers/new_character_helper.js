const validate = (value, characters, setValidation) => {
  if (characters.includes(value)) {
    setValidation(false);
  } else {
    setValidation(true);
  }
};

export default validate;