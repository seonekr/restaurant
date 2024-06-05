import React, { useState, useEffect } from "react";
import OwnerMenu from "../ownerMenu/OwnerMenu";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import "./css/edit_restaurant.css";
const Edit_restaurant = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [logo, setLogo] = useState(null); // URL for the existing main image
  const [newImageFile, setNewImageFile] = useState(null); // File for the new main image
  const [bannerimage, setBannerimage] = useState([]); // URLs for the existing images
  const [newImageFiles, setNewImageFiles] = useState([]); // Files for the new images

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_API + `/tourapi/hotel/detail/${id}/`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        setName(response.data.name);
        setAddress(response.data.address);
        setPhone(response.data.phone);
        setTime(response.data.time);
        setDescription(response.data.description);
        setLogo(response.data.logo);
        setBannerimage(response.data.bannerimage);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImageFile(file); // Set the file for new image
      setImage(URL.createObjectURL(file)); // Set the preview for the new image
    }
  };

  const handleMultipleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setNewImageFiles((prevFiles) => [...prevFiles, ...files]); // Add files of new images
    setImages((prevImages) => [...prevImages, ...newImages]); // Add previews of new images
  };

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setNewImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index)); // Remove the file from the list
  };

  const updateHotel = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("time", time);
    formData.append("description", description);

    if (newImageFile) {
      formData.append("logo", newImageFile); // Append new main image if it exists
    }

    if (newImageFiles) {
      newImageFiles.forEach((file, i) => formData.append(`bannerimage`, file)); // Append new images
    }

    try {
      await axios.patch(
        import.meta.env.VITE_API + `/tourapi/hotel/update/${id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      Swal.fire({
        title: "Success!",
        text: "Hotel updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        // Clear the form data
        setName("");
        setPhone("");
        setDescription("");
        setTime("");
        setAddress("");
        setLogo(null);
        setNewImageFile(null);
        setBannerimage([]);
        setNewImageFiles([]);
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "There was an error updating the hotel.",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error(
        "There was an error updating the hotel:",
        error.response.data
      );
    }
  };
  return (
    <>
      <OwnerMenu />
      <section id="post">
        <div className="box_container_product">
          <h2>EditHotel</h2>
          <div className="submit1">
            <button type="submit">Update</button>
          </div>
          <form className="edit-product-forms" onSubmit={updateHotel}>
            <div className="input-img">
              <div className="box_description">
                <h3>Image</h3>
                <div className="images">
                  <img src={logo} alt="Selected" />

                  <div
                    className="box_chooses_image"
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

              <div className="gallery">
                <h3>BannerImage</h3>
                <div className="gallery-box">
                  <img src={bannerimage} alt="Selected" />
                  <div
                    className="box_chooses_image2"
                    onClick={() => document.getElementById("fileInput").click()}
                  >
                    Choose image
                  </div>
                  <input
                    type="file"
                    id="fileInputMultiple"
                    style={{ display: "none" }}
                    onChange={handleMultipleImagesChange}
                    multiple
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="input">
                <label htmlFor="phone">Phone</label>
                <input
                  type="number"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhonr(e.target.value)}
                  placeholder="Phone..."
                />
              </div>
              <div className="input">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Address..."
                />
              </div>
              <div className="input">
                <label htmlFor="time">Time</label>
                <input
                  type="time"
                  name="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="time..."
                ></input>
              </div>

              <div className="input">
                <label htmlFor="description">Description</label>
                <textarea
                  type="text"
                  rows="10"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description..."
                ></textarea>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Edit_restaurant;
