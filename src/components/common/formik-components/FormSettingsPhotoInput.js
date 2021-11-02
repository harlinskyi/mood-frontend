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
    var blob = file; // See step 1 above
    var fileReader = new FileReader();
    fileReader.onloadend = function (e) {
      var arr = (new Uint8Array(e.target.result)).subarray(0, 4);
      var header = "";
      for (var i = 0; i < arr.length; i++) {
        header += arr[i].toString(16);
      }
      console.log(header);

      switch (header) {
        case "89504e47":
        case "47494638":
        case "ffd8ffe0":
        case "ffd8ffe1":
        case "ffd8ffe2":
        case "ffd8ffe3":
        case "ffd8ffe8":
          setPhoto(URL.createObjectURL(file));
          formikRef.current.setFieldValue(field, file);
          break;
        default:
          console.log("File is does not valid");
          document.getElementById("image").value="";
          setPhoto(default_photo);    
          break;
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