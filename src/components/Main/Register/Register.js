import './Register.css'
import React, { useRef, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import accountService from '../../../services/account.service';
import FormTextInput from '../../common/formik-components/FormTextInput';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import EclipseWidget from '../../common/eclipse/eclipse';
import { useHistory } from 'react-router';
import { Link, withRouter } from 'react-router-dom';
import t from '../../../utils/translations';


const Register = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  const formikRef = useRef();
  const titleRef = useRef();
  const [invalid, setInvalid] = useState("");
  const [success, setSuccess] = useState("");

  return (
    <>
      <div className="col-12 m-auto pt-5">

        <Formik
          innerRef={formikRef}
          initialValues={{
            email: "",
            password: "",
            errors: {}
          }}

          validationSchema={Yup.object({
            email: Yup.string()
              .email('Email incorrectly specified.')
              .required('Email is required field to fill.'),
            password: Yup.string()
              .required('Password is required field to fill.')
              .min(8, 'Password length must be min 8 chars.')
              .matches(/[0-9]/, 'Password must contain numbers.')
              .matches(/[A-Z]/, 'Password must contain uppercase letters.')
              .matches(/[a-z]/, 'Password must contain lowercase letters.')
          })}

          onSubmit={ async (values, { setSubmitting }) => {
            try {
              setSubmitting(true);
              const model = {
                email: values.email,
                password: values.password,
              };
              await accountService.register(model);
              setSuccess(values.email)
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
          <Form className="form-register p-4 mb-5 bg-body rounded-c shadow">
            <h1 className="h3 mb-3 fw-normal text-center fw-bold">{t('Registration')}</h1>
            <FormTextInput
              type="email"
              name="email"
              id="email"
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

            <button type="submit" className="w-100 btn btn-lg btn-primary mb-2">{t('Register')}</button>
            {invalid &&
              <div ref={titleRef} className="alert alert-danger">
                {t(invalid)}
              </div>
            }
            {success &&
              <div className="alert alert-success m-0" role="alert">
                {t('Registration with email')} <span>{success}</span> {t('was successful, please')} <Link to="/login" email={success} className="login-msg" >{t('log in')}</Link>!
              </div>
            }
            {isSubmitting && <EclipseWidget />}
          </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default connect(null)(withRouter(Register));