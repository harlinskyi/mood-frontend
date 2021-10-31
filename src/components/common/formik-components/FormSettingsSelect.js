import { useField } from "formik";
import t from "../../../utils/translations";

const FormSettingsSelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="form-floating mb-2">
      <select
        name={props.name}
        id={props.id}
        placeholder={props.placeholder}
        className="form-select" {...field} {...props}
        aria-label={t("Please, select from list")}
        >
      </select>
      <label htmlFor={props.id}>{t(label)}</label>
      {meta.touched && meta.error ? (
        <div className="invalid-feedback">
          <li>{t(meta.error)}</li>
        </div>
      ) : null}
    </div>
  );
};
export default FormSettingsSelect;
