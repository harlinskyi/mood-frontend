import './LoginPage.css'
import React, { useRef, useState } from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import accountService from '../../../services/account.service';
import FormTextInput from '../../common/formik-components/FormTextInput';
import { useDispatch } from 'react-redux';
import { authUser } from '../../../actions/auth';
import { push } from "connected-react-router";
import EclipseWidget from '../../common/eclipse/eclipse';

// And now we can use these
const LoginPage = () => {

  const dispatch = useDispatch();
  //const history = useHistory();

  const formikRef = useRef();
  const titleRef = useRef();
  const [invalid, setInvalid] = useState("");
  // const { email, password, loading, errors } = this.state;
  return (
    <>
      <div className="col-12 m-auto pt-5">
        {invalid &&
          <div ref={titleRef} className="alert alert-danger">
            {invalid}
          </div>
        }

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
              .email('Не коректно вказана пошта')
              .required('Вкажіть пошту'),
            password: Yup.string()
              .required('Вкажіть пароль')
          })}

          onSubmit={async (values, { setSubmitting }) => {
            try {
              var formData = new FormData();
              Object.entries(values).forEach(([key, value]) => formData.append(key, value));
              const result = await accountService.login(formData);
              const { token } = result.data;
              localStorage.authToken = token;
              dispatch(authUser(token));
              //history.push("/");
              dispatch(push("/"));
            } catch (badresponse) {
              setInvalid(badresponse.response.data.invalid);
              titleRef.current.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
            <Form className="form-signin p-4 mb-5 bg-body rounded-c shadow">
              <h1 className="h3 mb-3 fw-normal text-center fw-bold">Sign In</h1>

              <FormTextInput
                type="email"
                name="email"
                id="floatingInput"
                placeholder="name@example.com"
                data-tempmail="0"
              />

              <FormTextInput
                type="password"
                name="password"
                id="floatingPassword"
                placeholder="Password"
              />

              <button type="submit" className="w-100 btn btn-lg btn-primary mb-2">Sign in</button>
            </Form>
        </Formik>
        
      </div>
    </>
  );
};

export default LoginPage;