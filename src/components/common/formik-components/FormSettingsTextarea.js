import classnames from "classnames";
import { useField } from "formik";
import t from "../../../utils/translations";

const FormSettingsTextarea = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="form-floating mb-2">
      <textarea
        name={props.name}
        id={props.id}
        placeholder={props.placeholder}
        className={classnames("form-control", { "is-invalid": meta.touched && meta.error })} {...field} {...props} />
      <label htmlFor={props.id}>{t(label)}</label>
      {meta.touched && meta.error ? (
        <div className="invalid-feedback">
          <li>{t(meta.error)}</li>
        </div>
      ) : null}
    </div>
  );
};
export default FormSettingsTextarea;
