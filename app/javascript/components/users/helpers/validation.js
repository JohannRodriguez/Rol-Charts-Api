const validate = (name, value, fields, validation, setValidation) => {
  if (!fields[name].validation) {
    return
  }
  if (validation.first) {
    delete validation.first;
  }

  const arr = validation.username || [];

  if (fields[name].validation.presence) {
    if (value.length === 0) {
      if (!arr.includes("can't be blank")) {
        arr.push("can't be blank");
      }
    } else if (arr.includes("can't be blank")) {
      arr.splice(arr.indexOf("can't be blank"), 1);
    }
  }
  if (fields[name].validation.min) {
    if (value.length < fields[name].validation.min) {
      if (!arr.includes('is too short')) {
        arr.push('is too short');
      }
    } else if (arr.includes('is too short')) {
      arr.splice(arr.indexOf('is too short'), 1);
    }
  }
  if (fields[name].validation.max) {
    if (value.length > fields[name].validation.max) {
      if (!arr.includes('is too long')) {
        arr.push('is too long');
      }
    } else if (arr.includes('is too long')) {
      arr.splice(arr.indexOf('is too long'), 1);
    }
  }
  if (fields[name].validation.exclude) {
    const obj = fields[name].validation.exclude;
    const keys = Object.keys(obj);
    keys.map(key => {
      if (obj[key].test(value)) {
        if (!arr.includes('is invalid')) {
          arr.push('is invalid');
        }
      } else if (arr.includes('is invalid')) {
        arr.splice(arr.indexOf('is invalid'), 1);
      }
    })
  }

  if (arr.length === 0) {
    delete validation[name];
  }
  else {
    setValidation({
      ...validation,
      username: arr,
    });
  }
};

export default validate;
