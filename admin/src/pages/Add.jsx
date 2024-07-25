import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = () => {
  const URL = "http://localhost:4000"; // Base URL
  const [image, setImage] = useState(null); // State for image
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "Salad",
    price: ""
  });


  // Function to handle input changes
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value // Update the corresponding field in state
    }));
  };

  // Function to handle form submission
  const onSubmitHandler = async (event) => {
    event.preventDefault(); // Prevent page reload on form submit

    // Create FormData object to send as multipart/form-data
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description); // Fixed typo here
    formData.append("category", data.category);
    formData.append("image", image); // Append image file
    formData.append("price", Number(data.price));

    try {
      // Send POST request to backend
      const response = await axios.post(`${URL}/api/food/add`, formData);

      if (response.data.success) {
        // Reset form and image state on success
        toast.success(response.data.message)
        setImage(null);
        setData({
          name: "",
          description: "",
          category: "Salad",
          price: ""
        });
      } else {
        toast.error(response.data.message)
        console.log(response.data.error); // Log any errors from backend
      }
    } catch (error) {
      console.error("Error:", error); // Handle any network or server errors
    }
  };

  return (
    <div className="add w-[70vw] ml-[max(5vw,20px)] mt-[20px] sm:mt-[50px] text-[#6d6d6d] font-medium text-base sm:text-lg">
      <form className="flex flex-col gap-6" onSubmit={onSubmitHandler}>
        <div className="add-image-upload flex-col gap-2 w-[200px]">
          <p>Upload Image</p>
          <label htmlFor="image" className="cursor-pointer w-[100px]">
            <img
              src={image ? globalThis.URL.createObjectURL(image) : assets.upload_area}
              alt=""
              className="w-[200px] h-[130px]"
            />
          </label>
          <input
            type="file"
            id="image"
            required
            onChange={(e) => setImage(e.target.files[0])}
            hidden
          />
        </div>
        <div className="add-product-name w-[max(40%, 200px)]">
          <div className="flex-col gap-2 my-2 sm:my-4">
            <p>Product name</p>
            <input
              type="text"
              name="name"
              placeholder="Type Here..."
              className="p-1 md:p-2 w-[200px] sm:w-[30vw] border border-black"
              onChange={onChangeHandler}
              value={data.name}
            />
          </div>
          <div className="add-product-description w-[max(40%, 280px)]">
            <div className="flex-col gap-2">
              <p>Product Description</p>
              <textarea
                name="description"
                rows={6}
                placeholder="Write Content here"
                required
                className="p-1 sm:p-2 w-[200px] h-auto sm:w-[30vw] border border-black"
                onChange={onChangeHandler}
                value={data.description}
              ></textarea>
            </div>
            <div className="add-category-price flex-col items-center gap-8 my-2 mb-4">
              <div className="add-category flex flex-col gap-1 my-1 sm:my-4">
                <p>Product category</p>
                <select
                  className="py-1 px-2 max-w-[200px] border border-black"
                  name="category"
                  onChange={onChangeHandler}
                  value={data.category}
                >
                  <option value="Salad">Salad</option>
                  <option value="Rolls">Rolls</option>
                  <option value="Deserts">Deserts</option>
                  <option value="Sandwich">Sandwich</option>
                  <option value="Cake">Cake</option>
                  <option value="Pure Veg">Pure Veg</option>
                  <option value="Pasta">Pasta</option>
                  <option value="Noodles">Noodles</option>
                </select>
              </div>
              <div className="add-price flex-col gap-2 my-1 sm:my-4">
                <p>Product Price</p>
                <input
                  type="number"
                  name="price"
                  placeholder="$20"
                  className="w-[max(40%, 200px)] py-1 px-2 border border-black"
                  onChange={onChangeHandler}
                  value={data.price}
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="add-btn border sm:my-6 border-black w-[100px] text-outfit bg-black text-white py-1 px-2"
          >
            ADD
          </button>
        </div>
      </form>
     </div>
  );
};

export default Add;
