import "./Settings.css";
import React, { useRef, useState } from "react";
import { Formik, Form, Field } from "formik";
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

const Settings = () => {
    const dispatch = useDispatch();

    const formikRef = useRef();
    const titleRef = useRef();
    const [invalid, setInvalid] = useState("");
    const [success, setSuccess] = useState("");
    const SUPPORTED_FORMATS = ["png"];
    return (
        <div className="col-10 m-auto pt-2">
            <Formik
                innerRef={formikRef}
                initialValues={{
                    user: {
                        Image: "",
                        Email: "",
                        FirstName: "",
                        LastName: "",
                        NickName: "",
                        Quote: "",
                        BirthDay: "",
                        Sex: "",
                        Link: "",
                        Location: ""
                    },
                    userId: store.getState().auth.userId,
                    errors: "",
                    success: false
                }}
                // validationSchema={Yup.object({
                //   Email: Yup.string()
                //     .email("Не коректно вказана пошта")
                //     .required("Вкажіть пошту"),
                // })}
                onSubmit={async (values, { setSubmitting }) => {
                    const formValues = values.user
                    console.log(formValues)
                    try {
                        var formData = new FormData();
                        Object.entries(formValues).forEach(([key, value]) => formData.append(key, value));
                        const res = await accountService.updateSettings(formData, store.getState().auth.userId);
                        console.log(res.status);
                        setSubmitting(true);
                    } catch (badresponse) {
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
                            name="user.Image"
                            field="Image"
                            formikRef={formikRef}
                        />
                        <FormSettingsInput
                            label="Email"
                            type="email"
                            id="emailInput"
                            name="user.Email"
                            cursornotallowed="true"
                            disabled
                            readOnly
                            required
                        />
                        <FormSettingsInput
                            label="First Name"
                            type="text"
                            name="user.FirstName"
                            id="firstnameInput"
                            placeholder="FirstName"
                            required
                        />
                        <FormSettingsInput
                            label="Last Name"
                            type="text"
                            id="lastnameInput"
                            placeholder="LastName"
                            name="user.LastName"
                            required
                        />

                        <FormSettingsInput
                            label="Nickname"
                            type="text"
                            name="user.NickName"
                            id="nicknameInput"
                            placeholder="LastName"
                            required
                        />
                        <FormSettingsTextarea
                            label="Quote"
                            name="user.Quote"
                            id="quoteInput"
                            placeholder="Quote"

                        />
                        <FormSettingsInput
                            label="Birthday"
                            type="date"
                            name="user.BirthDay"
                            id="datebirthInput"
                            placeholder="BirthDay"
                            required
                        />
                        <FormSettingsSelect
                            label="Gender"
                            as="select"
                            name="user.Sex"
                            id="sexInput"
                            aria-label="Default select example"
                            required
                        >
                            <option defaultValue="">{t("Please, select from list")}</option>
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                        </FormSettingsSelect>
                        <FormSettingsInput
                            label="Site"
                            type="url"
                            name="user.Link"
                            id="siteInput"
                            placeholder="Site"
                        />
                        <FormSettingsSelect
                            label="Country"
                            as="select"
                            name="user.Location"
                            id="locationInput"
                            aria-label="Default select example"
                        >
                            <option defaultValue="">{t("Please, select from list")}</option>
                            <option value="Ukraine">Ukraine</option>
                            <option value="Poland">Poland</option>
                            <option value="Russia">Russia</option>
                            <option value="USA">USA</option>
                            <option value="Moldova">Moldova</option>
                        </FormSettingsSelect>

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
