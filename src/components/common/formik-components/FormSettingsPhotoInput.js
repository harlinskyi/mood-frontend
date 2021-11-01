import { useState } from "react";
import t from "../../../utils/translations";
import default_photo from '../../../images/default_photo.jpg'
import customFunc from "../../../utils/customFunc";

const FormSettingsPhotoInput = ({
  field,
  formikRef,
  src
}) => {
  const [image, setPhoto] = useState(default_photo);
  
  const selectImage = (event) => {
    const file = event.currentTarget.files[0];
    setPhoto(URL.createObjectURL(file));
    formikRef.current.setFieldValue(field, file);
  }

  return (
    <>
      <div className="mb-2 imgUser">
        <label htmlFor={field}>
          <img alt={image} src={image} />
        </label>
      </div>
      <div className="mb-2">
        <input
          type="file"
          className="form-control"
          id={field}
          name={field}
          onChange={selectImage} />
      </div>
    </>
  );

}
export default FormSettingsPhotoInput;