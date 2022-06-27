import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { categories } from "../utils/data";
import { client } from "../client";
import Spinner from "./Spinner";
import Swal from "sweetalert2";

const Model = ({ user }) => {
  // const [title, setTitle] = useState("");
  // const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(false);
  // const [destination, setDestination] = useState();
  const [fields, setFields] = useState();
  // const [category, setCategory] = useState();
  const [imageAsset, setImageAsset] = useState();
  const [wrongImageType, setWrongImageType] = useState(false);
  const [image, setImage] = useState();

  const navigate = useNavigate();

  const uploadImage = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
    // uploading asset to sanity
    if (
      selectedFile.type === "image/png" ||
      selectedFile.type === "image/svg" ||
      selectedFile.type === "image/jpeg" ||
      selectedFile.type === "image/gif" ||
      selectedFile.type === "image/tiff"
    ) {
      setWrongImageType(false);
      setLoading(true);
      client.assets
        .upload("image", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((document) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Upload failed:", error.message);
        });
    } else {
      setLoading(false);
      setWrongImageType(true);
    }
  };

  const savePin = () => {
    // if (title && about && destination && imageAsset?._id && category) {
    if (imageAsset?._id) {
      console.log("success");
      console.log(image);
      const formData = new FormData();
      console.log(image.name);
      const options = {
        headers: {
          "Content-Type": "multipart/form-data",
          accept: "*/*",
        },
      };
      formData.append("file", image, image.name);
      axios
        .post("http://127.0.0.1:5000/upload_image", formData, options)
        .then(function (response) {
          const res = response.data.res;
          console.log(response);
          if (res == "cancer") {
            Swal.fire({
              title: "We Are Sorry!",
              text: "We wish you speed recovery",
              imageUrl:
                "https://media.istockphoto.com/photos/sad-pensive-smiley-face-picture-id1342014125?b=1&k=20&m=1342014125&s=170667a&w=0&h=4LouvL4G-HCp5lErEql5ACcf-LDFl5lg9v1v8_W8RbM=",
              imageWidth: 400,
              imageHeight: 400,
            });
          } else {
            Swal.fire({
              title: "Good News!",
              text: "You are in good health",
              imageUrl:
                "https://media.istockphoto.com/photos/child-holding-yellow-balloon-in-the-hands-picture-id1207314090?b=1&k=20&m=1207314090&s=170667a&w=0&h=-aycl8SO00aoNISaGBhyCnRm-QJU_TiGLl-BgkNPn1M=",
              imageWidth: 400,
              imageHeight: 400,
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      setFields(true);

      setTimeout(() => {
        setFields(false);
      }, 2000);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      {fields && (
        <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in ">
          Please add all fields.
        </p>
      )}
      <div className=" flex  flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5  w-full">
        <div className="bg-secondaryColor p-3 flex  w-full">
          <div className=" flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
            {loading && <Spinner />}
            {wrongImageType && <p>It&apos;s wrong file type.</p>}
            {!imageAsset ? (
              // eslint-disable-next-line jsx-a11y/label-has-associated-control
              <label>
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-2xl">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg">Click to upload</p>
                  </div>

                  <p className="mt-32 text-gray-400 text-center">
                    Recommendation: Use high-quality JPG, JPEG, SVG, PNG, GIF or
                    TIFF less than 20MB
                  </p>
                </div>
                <input
                  type="file"
                  name="upload-image"
                  onChange={uploadImage}
                  className="w-0 h-0"
                />
              </label>
            ) : (
              <div className="relative h-full">
                <img
                  src={imageAsset?.url}
                  alt="uploaded-pic"
                  className="h-full w-full"
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                  onClick={() => setImageAsset(null)}
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
          {user && (
            <div className="flex gap-2 mt-2 mb-2 items-center bg-white rounded-lg ">
              <img
                src={user.image}
                className="w-10 h-10 rounded-full"
                alt="user-profile"
              />
              <p className="font-bold">{user.userName}</p>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={savePin}
          className="ml-auto bg-red-500 text-white font-bold p-3 rounded-full w-56 outline-none"
        >
          upload image to Detect
        </button>
      </div>
    </div>
  );
};

export default Model;
