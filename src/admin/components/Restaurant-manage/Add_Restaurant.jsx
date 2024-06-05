import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import Swal from "sweetalert2";
import OwnerMenu from "../ownerMenu/OwnerMenu";
import "./css/add_restaurant.css";

const Add_Restaurant = () => {
  const [addHotelData, setAddHotelData] = useState({
    name: "",
    phone: "",
    address: "",
    time: "",
    description: "",
    logo: null,
    bannerimage: [],
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddHotelData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setAddHotelData((prevState) => ({
        ...prevState,
        logo: file,
      }));
    }
  };

  const handleMultipleImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const previewsArray = filesArray.map((file) => URL.createObjectURL(file));

      setImagePreviews((prevPreviews) => prevPreviews.concat(previewsArray));
      setAddHotelData((prevState) => ({
        ...prevState,
        bannerimage: prevState.bannerimage.concat(filesArray),
      }));

      e.target.value = null;
    }
  };

  const removeImage = (index) => {
    const newImages = addHotelData.bannerimage.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);

    setAddHotelData((prevState) => ({
      ...prevState,
      bannerimage: newImages,
    }));
    setImagePreviews(newPreviews);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("time", time);
    formData.append("description", description);
    formData.append("logo", addHotelData.logo);
    addHotelData.bannerimage.forEach((img, i) => {
      formData.append(`images[${i}]`, img);
    });

    const config = {
      method: "post",
      url: import.meta.env.VITE_API + `/tourapi/hotel/create/`,

      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));

        setAddHotelData({
          name: "",
          phone: "",
          address: "",
          time: "",
          description: "",
          logo: null,
          bannerimage: [],
        });
        setSelectedImage(null);
        setImagePreviews([]);
        // Show success message
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Hotel added successfully!",
        });
      })
      .catch((error) => {
        console.error(error);
        // Show error message
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to add hotel. Please try again later.",
        });
      });
  };
  return (
    <>
      <OwnerMenu />
      <section id="post">
        <div className="box_container_add_res">
          <h2>Add Restaurant</h2>
          <div className="submit1">
            <button type="submit">Post</button>
          </div>
          <form className="edit-res-forms" onSubmit={handleSubmit}>
            <div className="input-imggg">
              <div className="box_description2">
                <h3>Image</h3>
                <div className="images_logo">
                  <img src={selectedImage} alt="img" />
                  <div
                    className="box_chooses_imageee"
                    onClick={() => document.getElementById("fileInput").click()}
                  >
                    Choose image
                  </div>
                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                </div>
              </div>

              <div className="gallery2">
                <h3>BannerImage</h3>
                <div className="gallery-box2">
                  {imagePreviews.map((image, index) => (
                    <div className="gallery-box-view" key={index}>
                      <img src={image} alt="" />
                      <div
                        className="button"
                        onClick={() => removeImage(index)}
                      >
                        <AiOutlineDelete />
                      </div>
                    </div>
                  ))}
                  <div
                    className="add-more"
                    onClick={() =>
                      document.getElementById("fileInputMultiple").click()
                    }
                  >
                    +
                  </div>
                  {/* Hidden file input for triggering the file selection dialog */}
                  <input
                    type="file"
                    id="fileInputMultiple"
                    style={{ display: "none" }}
                    onChange={handleMultipleImageChange}
                    multiple // Allow multiple file selection
                  />
                </div>
              </div>
            </div>

            <div className="form_input_box">
              <div className="input">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name..."
                  value={addHotelData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone..."
                  value={addHotelData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Address..."
                  value={addHotelData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input">
                <label htmlFor="time">Time</label>
                <input
                  type="time"
                  name="time"
                  placeholder="Time..."
                  value={addHotelData.time}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input">
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  rows="10"
                  placeholder="Description..."
                  value={addHotelData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Add_Restaurant;
