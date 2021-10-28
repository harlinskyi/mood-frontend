import { useField } from 'formik';
import classnames from "classnames";


const FormTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div className="form-floating mb-2">
            <input className={classnames("form-control",
                { "is-invalid": meta.touched && meta.error },
                { "is-valid": meta.touched && !meta.error })} {...field} {...props} />
            <label htmlFor={props.id || props.name}>{label}</label>
            {meta.touched && meta.error ? (
                <div className="invalid-feedback">
                    <li>{meta.error}</li>
                </div>
            ) : null}
        </div>
    );
};
export default FormTextInput;