const validate = (name, value, characters, validation, setValidation) => {
  if (!validation[name]) {
    return
  }

  if (validation[name].uniqueness) {
    if (characters.includes(value)) {
      validation[name].uniqueness = 'bad';
    } else {
      validation[name].uniqueness = 'good';
    }
  }

  if (validation[name].length) {
    let max = 20;
    if (name === 'bio') {
      max = 250;
    }if (name === 'universe') {
      max = 250;
    }
    if (value.length > max) {
      validation[name].length = 'bad';
    } else {
      validation[name].length = 'good';
    }
  }
  
  setValidation(validation);
};

const checkValidations = validation => {
  const parent = Object.keys(validation);
  for (let index = 0; index < parent.length; index++) {
    const child = Object.keys(validation[parent[index]]);
    for (let i = 0; i < child.length; i++) {
      if (validation[parent[index]][child[i]] === 'bad') {
        return false;
      }      
    }   
  }

  return true;
};

export default validate;
export {checkValidations};