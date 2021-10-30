import { useField } from "formik";
import classnames from "classnames";
import t from "../../../utils/translations";

const FormTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="form-floating mb-2">
      <input
        name={props.id || props.name}
        className={classnames("form-control",
                  { "is-invalid": meta.touched && meta.error },
                                              { "is-valid": meta.touched && !meta.error })} {...field} {...props} />
      <label htmlFor={props.id || props.name}>{t(label)}</label>
      {meta.touched && meta.error ? (
        <div className="invalid-feedback">
          <li>{t(meta.error)}</li>
        </div>
      ) : null}
    </div>
  );
};
export default FormTextInput;
