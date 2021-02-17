const validate = (name, value, fields, validation, setValidation) => {
  if (!fields[name].validation) {
    return
  }
  if (validation[name] && validation[name].first) {
    delete validation[name];
  }

  const arr = validation[name] || [];
  const params = validation;

  if (fields[name].validation.uniqueness) {
    if (fields[name].validation.uniqueness.includes(value)) {
      if (!arr.includes('has already been taken')) {
        arr.push('has already been taken');
      }
    } else if (arr.includes('has already been taken')) {
      arr.splice(arr.indexOf('has already been taken'), 1);
    }
    
  }
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
  if (fields[name].validation.include) {
    const obj = fields[name].validation.include;
    const keys = Object.keys(obj);
    keys.map(key => {
      if (!obj[key].test(value)) {
        if (!arr.includes('is invalid')) {
          arr.push('is invalid');
        }
      } else if (arr.includes('is invalid')) {
        arr.splice(arr.indexOf('is invalid'), 1);
      }
    })
  }
  if (fields[name].validation.email) {
    const emailArray = value.split(/(@|.com)/g).filter(e => e);
    if (emailArray.length === 4 && emailArray[1] === '@' && emailArray[3] === '.com') {
      if (arr.includes('is invalid')) {
        arr.splice(arr.indexOf('is invalid'), 1);
        
      }
    } else if (!arr.includes('is invalid')) {
      arr.push('is invalid');
    }
  }
  if (fields[name].validation.match) {
    const test = fields[fields[name].validation.match.test].field;
    const target = fields[name].validation.match.target;
    const matchArr = !validation[target] || validation[target].first
      ? [] : validation[target];
    const error = name === target ?
      `doesn't match ${
        fields[name].validation.match.test.charAt(0).toUpperCase()
        +
        fields[name].validation.match.test.slice(1)
      }` : `doesn't match ${name.charAt(0).toUpperCase() + name.slice(1)}`;
    let matchCheck = false;

    if (value === test) {
      matchCheck = true;      
    }
    if (!matchCheck) {
      if (!matchArr.includes(error)) {
        if (name === target) {
          arr.push(error);
        } else {
          matchArr.push(error);
          if (params[target] && !params[target].first || !params[target]) {
            params[target] = matchArr;
          }
        }
      }
    } else if (matchArr.includes(error)) {
      if (name === target) {
        arr.splice(matchArr.indexOf(error), 1);
      } else {
        matchArr.splice(matchArr.indexOf(error), 1);
      }
    }
    if (params[target] && matchArr.length === 0 && !params[target].first) {
      delete params[target];
    }
  }

  if (arr.length === 0) {
    delete params[name];
  }
  else {
    params[name] = arr;
    setValidation(params);
  }
};

export default validate;
