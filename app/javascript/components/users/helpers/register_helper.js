const validateField = (target, value, validation, setValidation, field) => {
  const format = /[¿¡`!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;

  switch (target) {
    case 'username':
      let username_length = null;
      let characters = null;
      if (value.length === 0) {
        username_length = null;
      } else if (value.length < 5) {
        username_length = 'short';
      } else if (value.length > 16) {
        username_length = 'long';
      } else {
        username_length = 'correct';
      }

      if (format.test(value)) {
        characters = 'special';
      }
      else {
        characters = 'correct';
      }

      setValidation({
        ...validation,
        username: {
          length: username_length,
          characters: characters,
        },
      });
      break;
    case 'password':
      let min = null;
      let cap = null;
      let s_char = null;
      let number = null;
      let password_length = null;
      if (/[a-z]/.test(value)) {
        min = 'correct';
      }
      if (/[A-Z]/.test(value)) {
        cap = 'correct';
      }
      if (format.test(value)) {
        s_char = 'correct';
      }
      if (/[0-9]/.test(value)) {
        number = 'correct';
      }
      if (value.length < 8) {
        password_length = 'short';
      } else if (value.length > 28) {
        password_length = 'long';
      } else {
        password_length = 'correct';
      }
      const password_match = password_confirmation(value, field.password_confirmation);

      setValidation({
        ...validation,
        password: {
          min: min,
          cap: cap,
          s_char: s_char,
          number: number,
          length: password_length,
        },
        password_confirmation: {
          match: password_match
        },
      });
      break;
    case 'password_confirmation':
      const confirmation_match = password_confirmation(field.password, value);

      setValidation({
        ...validation,
        password_confirmation: {
          match: confirmation_match
        },
      });
    break;
    default:
      break;
  }
};

const password_confirmation = (password, confirmation) => {
  if (password === confirmation) {
    return 'correct';
  } else {
    return 'match';
  }
}
export default validateField;