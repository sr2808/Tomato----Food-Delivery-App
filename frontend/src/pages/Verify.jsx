import axios from 'axios';
import React, { useEffect, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { StoreContext } from '../context/StoreContext';

const Verify = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const { url, token } = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        try {
            const response = await axios.post(url + "/api/order/verify", { success, orderId }, { headers: { token } });
            if (response.data.success) {
                navigate("/myorders");
            } else {
                toast.error(response.data.message);
                navigate("/");
            }
        } catch (error) {
            console.error("Error verifying payment:", error);
            toast.error("An error occurred while verifying payment. Please try again.");
            navigate("/");
        }
    };

    useEffect(() => {
        verifyPayment();
    }, []); // The empty dependency array means this effect runs only once after the initial render.

    return (
        <div className='verify min-h-[60vh] mt-[80px] grid'>
            <div className="spinner w-[100px] h-[100px] place-self-center border-4 border-[#bdbdbd] border-t-tomato rounded-full animate-spin duration-1000">
            </div>
        </div>
    );
};

export default Verify;
