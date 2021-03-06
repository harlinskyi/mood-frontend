import './LoginPage.css'
import React, { useRef, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import accountService from '../../../services/account.service';
import FormTextInput from '../../common/formik-components/FormTextInput';
import { useDispatch } from 'react-redux';
import { authUser } from '../../../actions/auth';
import EclipseWidget from '../../common/eclipse/eclipse';
import { useHistory } from 'react-router';
import t from '../../../utils/translations';
import { Link } from 'react-router-dom';


const LoginPage = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  const formikRef = useRef();
  const titleRef = useRef();
  const [invalid, setInvalid] = useState("");
  return (
    <>
      <div className="col-12 m-auto pt-5">

        <Formik
          innerRef={formikRef}
          initialValues={{
            email: '',
            password: '',
            errors: {},
            loading: false
          }}

          validationSchema={Yup.object({
            email: Yup.string()
              .email(t('Email incorrectly specified.'))
              .required(t('Email is required field to fill.')),
            password: Yup.string()
              .required(t('Password is required field to fill.'))
              .min(8, t('Password length must be min 8 chars.'))
            // .matches(/[A-Z]/, 'Password must contain uppercase letters.')
            // .matches(/[a-z]/, 'Password must contain lowercase letters.')
          })}

          onSubmit={async (values, { setSubmitting }) => {
            try {
              setSubmitting(true);
              const model = {
                email: values.email,
                password: values.password,
              };
              const result = await accountService.login(model);
              const token = result.data;
              localStorage.setItem("authToken", token);
              const userId = authUser(token, dispatch);
              history.push(`/profile/${userId}`)
              window.location.reload();
            } catch (badresponse) {
              if (badresponse.response !== undefined) {
                setInvalid(badresponse.response.data.ErrorDescription);
                titleRef.current.scrollIntoView({ behavior: 'smooth' });
              }
              else {
                alert(`[Problems]\n${badresponse}`)
              }
            }
          }}
        >
          {({ isSubmitting }) => (
          <Form className="form-signin p-4 mb-5 bg-body rounded-c shadow">
            <h1 className="h3 mb-3 fw-normal text-center fw-bold">{t('Login')}</h1>
            <FormTextInput
              type="email"
              name="email"
              id="floatingInput"
              placeholder="name@example.com"
              data-tempmail="0"
              autoComplete="username"
              label="Email"
              required
            />

            <FormTextInput
              type="password"
              name="password"
              id="floatingPassword"
              placeholder="Password"
              autoComplete="current-password"
              label="Password"
              required
            />
            <label className="d-flex justify-content-center mb-2 login-links">
              <Link to={'/register'}>{t('Not registered?')}</Link>
              <Link to={'/'}>{t('Forgot your password?')}</Link> {/* TODO: need create form for change password */}
            </label>
            <button type="submit" className="w-100 btn btn-lg btn-primary mb-2">{t('Log in')}</button>
            {invalid &&
              <div ref={titleRef} className="alert alert-danger">
                <i className="fa fa-window-close me-1" aria-hidden="true"></i>{t(invalid)}
              </div>}
            {isSubmitting && <EclipseWidget />}
          </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default LoginPage;