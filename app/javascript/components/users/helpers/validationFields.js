import api_call from "../../../api/api_call";

const data = {
  username: {
    field: '',
    validation: {
      min: 3,
      max: 16,
      presence: true,
      exclude: {
        special: /[¿¡`!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/,
      },
      uniqueness: true,
    },
  },
  email: {
    field: '',
    validation: {
      email: true,
      presence: true,
      uniqueness: true,
    },
  },
  password: {
    field: '',
    validation: {
      min: 8,
      max: 26,
      presence: true,
      match: {
        test: 'password_confirmation',
        target: 'password_confirmation',
      },
      include: {
        special: /[¿¡`!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/,
        low_case: /[a-z]/,
        up_case: /[A-Z]/,
        number: /[0-9]/,
      },
    },
  },
  password_confirmation: {
    field: '',
    validation: {
      presence: true,
      match: {
        test: 'password',
        target: 'password_confirmation',
      },
    },
  },
  day: { field: '' },
  month: { field: '' },
  year: { field: '' },
  gender: { field: '' },
}

const validationFields = (population, setFields, owner = false) => {
  const keys = Object.keys(population);
  const obj = {}
  keys.map(async key => {
    obj[key] = data[key];
    obj[key].field = population[key];
    if (obj[key].validation && obj[key].validation.uniqueness) {
      let array = await api_call('GET', `/api/v1/users?list=${key}`);
      if (owner) {
        array = array.splice(array.indexOf(population[key], 1));
      }
      obj[key].validation.uniqueness = array;
    }
  });
  setFields(obj);
};

export default validationFields;
