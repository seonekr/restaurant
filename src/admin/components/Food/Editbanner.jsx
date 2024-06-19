import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import "./editbanner.css";

const EditBanner = ({ banner, fieldToEdit, onSave, onCancel }) => {
  const storage = JSON.parse(window.localStorage.getItem("user"));
  const [updatedBanner, setUpdatedBanner] = useState({ ...banner });
  const [imagePreview, setImagePreview] = useState(banner.logo || null);
  const [bannerImagePreview, setBannerImagePreview] = useState(
    banner.banner_image || null
  );

  useEffect(() => {
    setUpdatedBanner({ ...banner });
    setImagePreview(banner.logo || null);
    setBannerImagePreview(banner.banner_image || null);
  }, [banner]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setUpdatedBanner({ ...updatedBanner, [name]: files[0] });
      if (name === "logo") {
        setImagePreview(URL.createObjectURL(files[0]));
      } else if (name === "banner_image") {
        setBannerImagePreview(URL.createObjectURL(files[0]));
      }
    } else {
      setUpdatedBanner({ ...updatedBanner, [name]: value });
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
        <form onSubmit={handleSave}>
          {fieldToEdit === "logo" && (
            <>
              <input
                className="edit-logo"
                type="file"
                name="logo"
                accept="image/*"
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
                name="banner_image"
                accept="image/*"
                onChange={handleChange}
              />
              <div className="image-container">
                {bannerImagePreview && (
                  <img
                    src={bannerImagePreview}
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
                type="text"
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
                type="text"
                name="phone"
                value={updatedBanner.phone}
                onChange={handleChange}
              />
              <h3>Edit Time</h3>
              <input
                className="edit-time"
                type="text"
                name="time"
                value={updatedBanner.time}
                onChange={handleChange}
              />
            </>
          )}
          {fieldToEdit === "address" && (
            <textarea
              className="edit-address"
              rows="5"
              name="address"
              value={updatedBanner.address}
              onChange={handleChange}
            />
          )}
        </div>
        <div className="button-group-edit">
          <button className="btn-save-edit" onClick={handleSubmit}>
            Save
          </button>
          <button className="btn-cancel-edit" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBanner;
