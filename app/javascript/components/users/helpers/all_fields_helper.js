const validateField = (name, value, field, validation, setValidation) => {
  
  if (!validation[name]) {
    return;
  }

  if (validation[name].length) {
    if (value.length === 0) {
      validation[name].length.verify = 'bad';
    } else if (value.length < validation[name].length.min) {
      validation[name].length.verify = 'short';
    } else if (value.length > validation[name].length.max) {
      validation[name].length.verify = 'long';
    } else {
      validation[name].length.verify = 'good';
    }
  }

  if (validation[name].characters) {
    const array = Object.keys(validation[name].characters);
    for (let index = 1; index < array.length; index++) {
      const format = validation[name].characters[array[index]].regex;
      const response = validation[name].characters[array[index]].response;

      if (value.length > 0 && format.test(value)) {
        validation[name].characters[array[index]].verify = response;
      } else {
        validation[name].characters[array[index]].verify = response === 'good' ? 'bad' : 'good';
      }
    }
    const checkObj = { 
      check: { ...validation[name].characters, },
    };
    delete checkObj.check.verify;

    if (value.length > 0 && checkValidations(checkObj)) {
      validation[name].characters.verify = 'good';
    } else {
      validation[name].characters.verify = 'bad';
    }
  }

  if (validation[name].match) {
    const compare = validation[name].match.compare;
    const match = field[compare];
    if (match.length > 0 && value === match) {
      validation[name].match.verify = 'good';
      validation[compare].match.verify = 'good'
    } else {
      validation[name].match.verify = 'bad';
      validation[compare].match.verify = 'bad'
    }
  }


  setValidation(validation);
};

const checkValidations = (object) => {
  const array  = Object.keys(object);

  for (let index = 0; index < array.length; index++) {
    const arr_child = Object.keys(object[array[index]]);
    for (let child = 0; child < arr_child.length; child++) {
      if (object[array[index]][arr_child[child]].verify != 'good') {
        return false;
      }
    }
  }
  return true;
};

const createStates = (show, display, setValidation, setField) => {
  const data ={
    username: {
      length: {
        verify: null,
        min: 3,
        max: 16,
      },
      characters: {
        verify: null,
        special: {
          verify: null,
          regex: /[¿¡`!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/,
          response: 'bad',
        },
      },
    },
    password: {
      length: {
        verify: null,
        min: 8,
        max: 28,
      },
      match: {
        verify: null,
        compare: 'password_confirmation',
      },
      characters: {
        verify: null,
        lower_case: {
          verify: null,
          regex: /[a-z]/,
          response: 'good',
        },
        upper_case: {
          verify: null,
          regex: /[A-Z]/,
          response: 'good',
        },
        special: {
          verify: null,
          regex: /[¿¡`!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/,
          response: 'good',
        },
        number: {
          verify: null,
          regex: /[0-9]/,
          response: 'good',
        },
      },
    },
    password_confirmation: { match: { verify: null, compare: 'password', } },
  }

  const validation = {}
  const field = {}

  const data_keys = (Object.keys(data));
  const show_keys = (Object.keys(show));

  for (let index = 0; index < show_keys.length; index++) {
    for (let key = 0; key < data_keys.length; key++) {
      if(show_keys[index] === data_keys[key]){
        validation[data_keys[key]] = data[data_keys[key]];
        field[data_keys[key]] = display[data_keys[key]] || '';
      }
    }    
  }

  setValidation(validation)
  setField(field);
};

const defaultFields = (field, validation, setValidation) => {
  const keys = Object.keys(field);

  for (let index = 0; index < keys.length; index++) {
    if (field[keys[index]].length > 0) {
      validateField(keys[index], field[keys[index]], field, validation, setValidation);
    }    
  }
};


export default validateField;
export { checkValidations, createStates, defaultFields };