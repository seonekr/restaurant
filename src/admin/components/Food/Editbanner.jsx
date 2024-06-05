import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./editbanner.css";
export const EditBanner = ({ banner, fieldToEdit, onSave, onCancel }) => {
  const [updatedBanner, setUpdatedBanner] = useState({ ...banner });
  const [imagePreview, setImagePreview] = useState(banner.logo);
  const [imagePrev, setImagePre] = useState(banner.bannerimage);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setUpdatedBanner({ ...updatedBanner, [name]: files[0] });
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setUpdatedBanner({ ...updatedBanner, [name]: value });
    }
  };
  const handleChangeBanner = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setUpdatedBanner({ ...updatedBanner, [name]: files[0] });
      setImagePre(URL.createObjectURL(files[0]));
    } else {
      setImagePre({ ...updatedBanner, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(updatedBanner);
  };

  return (
    <div className="popup-overlay-edit">
      <div className="modal-content-edit">
        <h3>Edit {fieldToEdit}</h3>
        <div>
          {fieldToEdit === "logo" && (
            <>
              <input
                className="edit-logo"
                type="file"
                name="logo"
                onChange={handleChange}
              />
              <div className="image-container">
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="image-preview"
                  />
                )}
              </div>
            </>
          )}
          {fieldToEdit === "bannerimage" && (
            <>
              <input
                className="edit-banner-image"
                type="file"
                name="image"
                onChange={handleChangeBanner}
              />
              <div className="image-container">
                {imagePrev && (
                  <img
                    src={imagePrev}
                    alt="Preview"
                    className="image-preview"
                  />
                )}
              </div>
            </>
          )}
          {(fieldToEdit === "name" || fieldToEdit === "description") && (
            <>
              <input
                className="edit-name"
                // type="text"
                name="name"
                value={updatedBanner.name}
                onChange={handleChange}
              />
              <h3>Edit Description</h3>
              <textarea
                className="edit-description"
                rows="5"
                name="description"
                value={updatedBanner.description}
                onChange={handleChange}
              />
            </>
          )}

          {(fieldToEdit === "phone" || fieldToEdit === "time") && (
            <>
              <input
                className="edit-phone"
                // type="text"
                name="phone"
                value={updatedBanner.phone}
                onChange={handleChange}
              />
              <h3>Edit Time</h3>
              <input
                className="edit-time"
                // type="text"
                name="time"
                value={updatedBanner.time}
                onChange={handleChange}
              />
            </>
          )}

          {fieldToEdit === "address" && (
            <textarea
              className="edit-address"
              rows="10"
              type="text"
              name="address"
              value={updatedBanner.address}
              onChange={handleChange}
            />
          )}
           <div className="button-group-edit">
      <button className="btn-save-edit" onClick={handleSubmit}>
        Save
      </button>
      <button className="btn-cancel-edit" type="button" onClick={onCancel}>
        Cancel
      </button>
    </div>
        </div>
      </div>
    </div>
  );
};
export default EditBanner;
