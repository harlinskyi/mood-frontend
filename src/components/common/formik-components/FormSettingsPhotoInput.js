import { useEffect, useState } from "react";
import t from "../../../utils/translations";
import default_photo from '../../../images/default_photo.jpg'
import customFunc from "../../../utils/customFunc";

const FormSettingsPhotoInput = ({
  field,
  formikRef,
  src
}) => {
  const [image, setPhoto] = useState(default_photo);

  useEffect(() => {
    if (src && src !== image) {
      console.log(src)
      const userPhoto = customFunc.getBaseUrl() + src
      setPhoto(userPhoto);
    }
  }, [src]);

  const selectImage = (event) => {
    const file = event.currentTarget.files[0];
    console.log(event.currentTarget.value);
    var blob = file;
    var fileReader = new FileReader();
    fileReader.onloadend = function (e) {
      var arr = (new Uint8Array(e.target.result)).subarray(0, 4);
      var header = "";
      for (var i = 0; i < arr.length; i++) {
        header += arr[i].toString(16);
      }
      const allowedExt = ["89504e47", "47494638", "ffd8ffe0", "ffd8ffe1" , "ffd8ffe2" , "ffd8ffe8" ]
      if (allowedExt.includes(header)) {
        setPhoto(URL.createObjectURL(file));
        formikRef.current.setFieldValue(field, file);
      }
      else {
        alert(t("File is does not valid image"));
        document.getElementById("image").value = "";
        setPhoto(default_photo);  
      }
    };
    fileReader.readAsArrayBuffer(blob);
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
          onChange={selectImage}
          accept=".jpg,.png,.gif,.jpeg"
          />
      </div>
    </>
  );

}
export default FormSettingsPhotoInput;