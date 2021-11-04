import "./Settings.css";
import React, { useRef, useState, useEffect } from "react";
import { Formik, Form, Field, useFormik } from "formik";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useStore } from "react-redux";
import http from "../../../http-common";
import store from "../../../store";
import * as Yup from "yup";
import EclipseWidget from "../../common/eclipse/eclipse";
import accountService from "../../../services/account.service";
import customFunc from "../../../utils/customFunc";
import t from "../../../utils/translations";
import { push } from "connected-react-router";
import FormSettingsPhotoInput from "../../common/formik-components/FormSettingsPhotoInput";
import FormSettingsInput from "../../common/formik-components/FormSettingsInput";
import FormSettingsTextarea from "../../common/formik-components/FormSettingsTextarea";
import FormSettingsSelect from "../../common/formik-components/FormSettingsSelect";
import { changeUserPhoto } from "../../../actions/auth";

const Settings = (props) => {
    const dispatch = useDispatch();

    const formikRef = useRef();
    const titleRef = useRef();
    const [invalid, setInvalid] = useState("");
    const [success, setSuccess] = useState("");
    const SUPPORTED_FORMATS = ["png", "jpg"];
    const [user, setUser] = useState({
        image: "",
        email: "",
        firstName: "",
        lastName: "",
        nickName: "",
        quote: "",
        birthDay: "",
        sex: "",
        link: "",
        location: ""
    });


    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect( async () => {
        try {
            const response = await http.post(`get-user-profile?id=${store.getState().auth.userId}`);
            const data = response.data;
            console.log("Response", data);
            setUser({...user, ...data});
        } catch (badresponse) {
            console.log("problem", badresponse);
        }
    }, []);

    useEffect(() => {
    }, [user]);

    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value })
    }

    return (
        <div className="col-10 m-auto pt-2">
            <Formik
                innerRef={formikRef}
                initialValues={user}
                enableReinitialize={true}
                validationSchema={Yup.object({
                email: Yup.string()
                    .required(t('That filed is required!')),
                firstName: Yup.string()
                    .required(t('That filed is required!'))
                    .matches(/^[a-zA-Zа-яА-ЯІіЇїЄє]+$/, 'Only alphabets are allowed for this field'),
                lastName: Yup.string()
                    .required(t('That filed is required!'))
                    .matches(/^[a-zA-Zа-яА-ЯІіЇїЄє]+$/, t('Only alphabets are allowed for this field')),
                nickName: Yup.string()
                    .required(t('That filed is required!'))
                    .max(10, t('Maximum value of the field is ') + 10)
                    .min(3, t('Maximum value of the field is ') + 3)
                    .matches(/^[0-9a-zA-Zа-я_]+$/, t('Only numbers, letters and underscore!'))
                    .lowercase(),
                birthDay: Yup.date()
                    .required(t('That filed is required!'))
                    .max(new Date(Date.now()), t('Date of birth cannot be more than the flow date!'))
                    .min(new Date('1920-01-01'), t('Date of birth cannot be less than ') + '1920-01-01!'),
                quote: Yup.string()
                    .max(150, t('Maximum value of the field is ') + 150)
                    .min(10, t('Maximum value of the field is ') + 10),
                link: Yup.string()
                    .url(t('Invalid field value!'))
                })}
                onSubmit={async (values, { setSubmitting }) => {
                    const formValues = values
                    console.log(formValues)
                    try {
                        setSubmitting(true);
                        var formData = new FormData();
                        Object.entries(formValues).forEach(([key, value]) => formData.append(key, value));
                        const res = await accountService.updateSettings(formData, store.getState().auth.userId);
                        const response = await http.post(`get-user-profile?id=${store.getState().auth.userId}`);
                        changeUserPhoto(response.data.image, dispatch);
                        setSuccess(true)

                    } catch (badresponse) {
                        setSuccess(false)
                        if (badresponse.response !== undefined) {
                            setInvalid(badresponse.response.data.invalid);
                            titleRef.current.scrollIntoView({ behavior: 'smooth' });
                        } else {
                            alert(`[Problems]\n${badresponse}`);
                        }
                    }
                }}

            >
                {({ isSubmitting }) => (
                    <Form
                        className="form-edit p-4 mb-3 bg-body rounded-c shadow"
                        id="formUserSettings"
                    >
                        <h1 className="h3 mb-3 fw-normal text-center fw-bold">
                            {t("Settings")}
                        </h1>
                        
                        <FormSettingsPhotoInput
                            name="image"
                            field="image"
                            formikRef={formikRef}
                            src={user.image}
                        />
                        <FormSettingsInput
                            label="Email"
                            type="email"
                            id="emailInput"
                            name="email"
                            cursornotallowed="true"
                            disabled
                            readOnly
                            required
                            value={user.email}
                            onChange={handleChange}
                        />
                        <FormSettingsInput
                            label="First Name"
                            type="text"
                            name="firstName"
                            id="firstnameInput"
                            placeholder="FirstName"
                            value={user.firstName}
                            required
                            onChange={handleChange}
                        />
                        <FormSettingsInput
                            label="Last Name"
                            type="text"
                            id="lastnameInput"
                            placeholder="LastName"
                            name="lastName"
                            value={user.lastName}
                            onChange={handleChange}
                            required
                        />

                        <FormSettingsInput
                            label="Nickname"
                            type="text"
                            name="nickName"
                            value={user.nickName}
                            id="nicknameInput"
                            placeholder="LastName"
                            onChange={handleChange}
                            required
                        />
                        <FormSettingsTextarea
                            label="Quote"
                            name="quote"
                            id="quoteInput"
                            placeholder="Quote"
                            onChange={handleChange}
                            value={user.quote}

                        />
                        <FormSettingsInput
                            label="Birthday"
                            type="date"
                            name="birthDay"
                            value={!!user.birthDay && user.birthDay.substr(0, 10)}
                            id="datebirthInput"
                            placeholder="BirthDay"
                            onChange={handleChange}
                            required
                        />
                        <FormSettingsSelect
                            label="Gender"
                            as="select"
                            name="sex"
                            value={user.sex}
                            id="sexInput"
                            aria-label="Default select example"
                            onChange={handleChange}
                            required
                        >
                            <option defaultValue="">{t("Please, select from list")}</option>
                            {["Female", "Male"].map((i) => (<option key={i} value={i}>{t(i)}</option>))}
                        </FormSettingsSelect>
                        <FormSettingsInput
                            label="Site"
                            type="url"
                            name="link"
                            value={user.link}
                            onChange={handleChange}
                            id="siteInput"
                            placeholder="Site"
                        />
                        <FormSettingsSelect
                            label="Country"
                            as="select"
                            name="location"
                            value={user.location}
                            onChange={handleChange}
                            id="locationInput"
                            aria-label="Default select example"
                        >
                            <option defaultValue="">{t("Please, select from list")}</option>
                            {["Ukraine", "Poland", "Kanada", "USA", "Moldova", "England"].map((i) => (<option key={i} value={i}>{t(i)}</option>))}
                        </FormSettingsSelect>
                        {success && <div className="alert alert-success" role="alert"><i className="fa fa-check-circle me-1" aria-hidden="true"></i>{t('All changes have been saved successfully!')}</div>}

                        <div className="col-12">
                            <button
                                className="d-block m-auto w-50 btn btn-lg btn-primary mb-2"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {t("Save settings")}
                            </button>
                        </div>
                        {isSubmitting && <EclipseWidget />}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Settings;
