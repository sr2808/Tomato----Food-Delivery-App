import React from "react";

export default function Header() {

  return (
    <div
      className="header bg-[url('/header_mobile.png')] mb-7 rounded-3xl sm:bg-[url('/header_img.png')]  h-[90vh] mx-[5px] my-auto bg-cover sm:bg-contain relative bg-no-repeat lg:h-[34vw] md:h-[40vw] sm:h-[20vw] sm:mt-2 top-16 sm:top-20 lg:top-[130px] xl:top-[100px]"
    >
      <div className="header-contents absolute flex flex-col justify-start items-start gap-[2vh] sm:gap-[1vw] left-[6vw] max-w-[70%] sm:max-w-[47%] transition duration-300 animate-fadeIn lg:bottom-[10%] md:bottom-[2vh]">

        {/* Title Tag  */}
        <h2 className="text-white font-medium text-[7vh] sm:text-[4vw] mt-4 sm:top-30">
          Order your favourite food here
        </h2>

        {/* para content  */} 
        <p className="text-white lg:text-lg sm:text-sm text-[2.4vh] ">
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with finest ingredients and culinary expertise. Our mission is
          to satisfy your craving and elevate your dining experience, one
          delicious meal at a time.
        </p>

        {/* button  */}
        <a
          href="#explore-menu"
          className=" mt-3 sm:my-none ml-[40%] sm:ml-[10%] font-bold hover:border-white hover:text-tomato sm:mt-none px-6 py-2 border border-none text-[#747474] sm:font-medium sm:px-[1.5vw] sm:py-[0.5vw] bg-white rounded-3xl"
        >
          View Menu
        </a>

      </div>
    </div>
  );
}
