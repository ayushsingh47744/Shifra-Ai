import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ServerUrl } from '../App';

function Billing({ user ,setUser}) {
  const navigate = useNavigate()

  useEffect(()=>{
    if(user && !user.isSetupComplete){
      toast.error(
        "Setup your agent first"
      );


      navigate("/builder");


    }
  },[])


  const remainingMessages =
    Math.max(
      0,
      (user?.requestLimit || 0) -
      (user?.totalMessages || 0)
    );

  const remainingDays =
    user?.proExpiresAt
      ? Math.max(
        0,
        Math.ceil(
          (
            new Date(
              user.proExpiresAt
            ) - new Date()
          ) /
          (1000 * 60 * 60 * 24)
        )
      )
      : 0;


      const handlePay = async () => {
        try {
          const res = await axios.post(ServerUrl + "/api/billing/order" , {plan: "pro"} , {withCredentials:true})

          const order = res.data.order

          const options ={
            key:import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount:
          order.amount,

        currency:
          order.currency,

        name:
          "ShifraAI",

        description:
          "Pro Plan",

        order_id:
          order.id,

          handler:async(response)=>{
            const verifyRes = await axios.post(ServerUrl + "/api/billing/verify" , response , {withCredentials:true})

            if(verifyRes.data.success){
              toast.success("Payment successfully")

              setUser(verifyRes.data.user)


            }
          },
          theme: {
          color: "#7c3aed",
        },
          }



          const razorpay = new window.Razorpay(options)

          razorpay.open()
        } catch (error) {
            toast.error("Payment Failed")

      console.log(error);
        }
      }

  return (
    <div className='min-h-screen bg-[#f7f8fc] dark:bg-gray-950 px-4 py-10'>

      <div className='max-w-5xl mx-auto'>

        <div className='mb-8'>
          <h2 className='text-3xl font-bold text-[#081028] dark:text-gray-50'>
            Billing & Subscription
          </h2>
          <p className='text-gray-500 dark:text-gray-400 mt-1'>  Manage your AI agent plan and usage.</p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6'>


          <div className='bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm'>

            <p className='text-sm text-gray-400 dark:text-gray-500'>Current Plan</p>
            <h2 className='text-xl font-bold text-[#081028] dark:text-gray-50 mt-1 capitalize'>{user?.plan}</h2>
          </div>


          <div className='bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm'>

            <p className='text-sm text-gray-400 dark:text-gray-500'>Gemini Status</p>
            <h2 className={`text-xl font-bold mt-1 capitalize ${user?.geminiStatus === "active"
              ? "text-emerald-600 dark:text-emerald-400"
              : user?.geminiStatus === "invalid"
                ? "text-red-500 dark:text-red-400"
                : "text-amber-500 dark:text-amber-400"
              }`}>{user?.geminiStatus}</h2>
          </div>

          <div className='bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm'>

            <p className='text-sm text-gray-400 dark:text-gray-500'>{user?.plan === "free"
              ? "Messages Left"
              : "Plan Expiry"}</p>
            <h2 className='text-xl font-bold text-[#081028] dark:text-gray-50 mt-1 capitalize'>{user?.plan === "free"
              ? remainingMessages
              : `${remainingDays} Days`}</h2>
          </div>
        </div>


        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-10'>

          {/* free */}

          <div className='bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm'>
            <h2 className="text-2xl font-bold text-[#081028] dark:text-gray-50">
              Free Plan
            </h2>

            <h3 className="text-5xl font-bold mt-5 text-[#081028] dark:text-gray-50">
              ₹0
            </h3>

            <ul className="mt-6 space-y-4 text-gray-600 dark:text-gray-400">

              <li>200 AI messages</li>
              <li>Voice agent</li>
              <li>Navigation support</li>
              <li>Basic customization</li>

            </ul>

          </div>
{/* 
         Pro */}
          <div className='rounded-3xl p-8 bg-gradient-to-r from-purple-600 to-emerald-500 text-white shadow-lg'>

            <h2 className="text-2xl font-bold text-[#081028]">
              Pro Plan
            </h2>

            <h3 className="text-5xl font-bold mt-5 text-[#081028]">
              ₹699
            </h3>

            <p className='mt-2 opacity-80'>3 Months Access</p>

            <ul className='mt-6 space-y-4 opacity-90'>

              <li>Unlimited AI messages</li>
              <li>Advanced AI agent</li>
              <li>Priority performance</li>
              <li>Unlimited navigation</li>
              <li>Premium support</li>
            </ul>


            <button
            onClick={handlePay}

             disabled={user?.plan === "pro"} className={`mt-8 h-14 w-full rounded-2xl font-semibold transition ${user?.plan === "pro"
                  ? "bg-emerald-200 text-black cursor-default"
                  : "bg-white text-[#081028] cursor-pointer"
                }`}>
                  {user?.plan === "pro" ? "Active Plan" : "Upgrade Now"}

                </button>




          </div>
        </div>


      </div>

    </div>
  )
}

export default Billing