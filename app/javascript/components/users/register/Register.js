// Import Packages
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Cont, Flex } from '../../../styles/blossom';

// Import Components
import Errors from '../Errors';
import Gender from '../Gender';
import PickDate from '../PickDate';
import { getFields, submit, validationChange } from '../helpers/handler';
import validationFields from '../helpers/validationFields';
import PasswordCharacters from '../PasswordCharacters';

// Import Data
import registerStyles, { BlueBtnSwitch, Label, Span } from './registerStyles';
import registerData from './registerData';
import { BlueBorderInput, Input } from '../../../styles/global';

const Register = props => {
  const [lang] = useTranslation('register');
  const [m] = useTranslation('months');

  const [fields, setFields] = useState({});
  const [response, setResponse] = useState({});
  const [validation, setValidation] = useState({
    username: { first: true }, email: { first: true }, password: { first: true },
    password_confirmation: { first: true }
  });

  useEffect(async () => {
    if (Object.keys(fields).length === 0) {
      validationFields({ username: '', email: '', password: '',
        password_confirmation: '', day: { field: new Date().getDate() },
        month: { field: m(`${new Date().getMonth() + 1}`)},
        year: { field: new Date().getFullYear() }, gender: 'neutral',
        }, setFields
      );
    }
    if (response.status === 'SUCCESS') {
      location.reload();
    }
  });

  const passArr = arr => {
    arr.splice(arr.indexOf('is invalid'));
    return arr;
  };
  const setBirthday = () => {
    const obj = fields;
    const birthday = `${obj.year.field}-${obj.month.field}-${obj.day.field}`;
    delete obj.day;
    delete obj.month;
    delete obj.year;
    obj.birthday = { field: birthday };
    return obj;
  };

  return (
    <>{props.session.log === 'LOGGED_IN' ?
      <Redirect to='/' />
    :
      <Cont styles={registerStyles.contParent.styles}>
        <Flex params={registerStyles.headerFlex.params} styles={registerStyles.headerFlex.styles}>
          <h1>{lang('title')}</h1>
          <Span onClick={() => {props.history.push('/login')}}>{lang('buttons.login')}</Span>
        </Flex>
        <form onSubmit={e => submit(e, 'POST', '/api/v1/users/', getFields(setBirthday(), 'user'), setResponse)}>
          {registerData.map(d =>
            <React.Fragment key={d.name}>
              <BlueBorderInput styles={registerStyles.borderInput.styles}>
                <Input type={d.type} name={d.name} placeholder={lang(`placeholders.${d.name}`)}
                  onChange={e => validationChange(e, fields, setFields, validation, setValidation)} />
              </BlueBorderInput>
              {d.name === 'password' ?
                <>
                  {fields.password ?
                    <PasswordCharacters value={fields.password.field} regexes={fields.password.validation.include} />
                  : null}
                  {Object.keys(validation).length > 0 ?
                    <Errors type='password' error={Array.isArray(validation.password) ? passArr(validation.password) : null } />
                  :
                    <Errors type='password' error={response.error ? response.error.password : null} />
                  }
                </>
              :
                <>
                  {Object.keys(validation).length > 0 ?
                    <Errors type={d.name} error={Array.isArray(validation[d.name]) ?
                      validation[d.name] : null } />
                  :
                    <Errors type={d.name} error={response.error ? response.error[d.name] : null} />
                  }
                </>
              }
            </React.Fragment>
          )}
          <Label>{lang('labels.birthday')}</Label>
          <PickDate fields={fields} setFields={setFields} validation={validation} setValidation={setValidation} />
          <Label>{lang('labels.gender')}</Label>
          <Gender fields={fields} setFields={setFields} validation={validation} setValidation={setValidation} />
          {Object.keys(validation).length === 0 ?
            <BlueBtnSwitch>
              <button type="submit">
                <span>{lang('buttons.reg.secondary')}</span>
                <span>{lang('buttons.reg.main')}</span>
              </button>
            </BlueBtnSwitch>
          :
            <BlueBtnSwitch rest={true}>
              <button type="button">
                <span>{lang('buttons.reg.validation')}</span>
                <span>{lang('buttons.reg.main')}</span>
              </button>
            </BlueBtnSwitch>
          }
          </form>
        </Cont>
      }
     
    </>
  )
};

export default Register;
