import axios from 'axios';
import React, { useState } from 'react'
import { FiCopy, FiPlus, FiTrash2 } from 'react-icons/fi';
import { CLIENT_URL, ServerUrl } from '../App';
import toast from 'react-hot-toast';

const THEMES = [
  "light",
  "dark",
  "glass",
  "neon",
];

const TONES = [
  "friendly",
  "professional",
  "sales",
];

const LANGUAGES = [
  { code: "en-US", label: "English" },
  { code: "hi-IN", label: "Hindi" },
];

function Builder({user , setUser}) {

  const [editAssistant , setEditAssistant] = useState(!user?.isSetupComplete)

  const [assistantName , setAssistantName] = useState(user?.assistantName || "");

  const [businessName , setBusinessName] = useState(user?.businessName || "")
  
  const [businessType , setBusinessType] = useState(user?.businessType || "")

  const [businessDescription , setBusinessDescription] = useState(user?.businessDescription || "")

  const [theme,setTheme] = useState(user?.theme || "dark")
  const [tone,setTone] = useState(user?.tone || "friendly")
  const [language,setLanguage] = useState(user?.language || "en-US")

  const [geminiApiKey , setGeminiApiKey] = useState(user?.geminiApiKey || "")

  const [pages, setPages] = useState(user?.pages || []);

  const [pageName, setPageName] = useState("");

  const [pagePath, setPagePath] = useState("");

  const [pageKeywords, setPageKeywords] = useState("");

  const [loading,setLoading]= useState(false)

  const addPage = ()=>{
    if(!pageName || !pagePath) return;

    const newPage = {
      name:pageName,
      path:pagePath,
      keywords:pageKeywords.split(",").map((k) => k.trim()) 
      
    
    }

    setPages([...pages,newPage])

    setPageName("")
    setPagePath("")
    setPageKeywords("")
    
  }

  const removePage = (index) =>{
    const updatePages = pages.filter((_,i)=>i !== index)

    setPages(updatePages)
  }


  const saveAssistant = async () => {
    setLoading(true)
    try {
      const data={
        assistantName,
        businessName,
        businessType,
        businessDescription,
        tone,
        theme,
        language,
        geminiApiKey,
        pages,
      }

      const res = await axios.post(ServerUrl + "/api/user/save-assistant" , data , {withCredentials:true})
      console.log(res.data)
      setUser(res.data.user)
      setEditAssistant(false)
      toast.success("Assistant Saved Successfully")
      setLoading(false)
    } catch (error) {
      toast.error("Failed to save assistant")
      console.log(error)
      setLoading(false)
    }
    
  }

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



     const embedCode = `<script src="${CLIENT_URL}/assistant.js" data-user-id="${user?._id}"></script>`;

  return (
    <div className='min-h-screen bg-[#f7f8fc] dark:bg-[#0b1020] px-4 py-8'>
      <div className='max-w-4xl mx-auto'>
        <div className='mb-8'>
          <h2 className='text-3xl font-bold text-[#081028] dark:text-white'>
            Assistant Builder
          </h2>
          <p className='text-gray-500 dark:text-gray-400 mt-1'> Customize your virtual
            assistant</p>
        </div>

        {user.isSetupComplete && !editAssistant &&(
          <div className='bg-white dark:bg-[#131a2e] rounded-3xl border border-gray-100 dark:border-white/10 shadow-sm p-6 mb-6'>

           <p className="text-sm text-gray-400 dark:text-gray-500">
                Assistant
              </p>

              <h2 className="text-3xl font-bold text-[#081028] dark:text-white mt-1">
                {user.assistantName}
              </h2>

              <p className="text-gray-500 dark:text-gray-400 mt-3 leading-7">
                Your assistant is ready
                to use on your website.
              </p>

              <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6'>


                <div className='rounded-2xl border border-gray-100 dark:border-white/10 bg-[#f8fafc] dark:bg-[#0e1424] p-4'>
                  
                  <p className='text-sm text-gray-400 dark:text-gray-500'>Current Plan</p>
                  <h2 className='text-xl font-bold text-[#081028] dark:text-white mt-1 capitalize'>{user?.plan}</h2>
                </div>


                <div className='rounded-2xl border border-gray-100 dark:border-white/10 bg-[#f8fafc] dark:bg-[#0e1424] p-4'>
                  
                  <p className='text-sm text-gray-400 dark:text-gray-500'>Gemini Status</p>
                  <h2 className={`text-xl font-bold mt-1 capitalize ${user?.geminiStatus === "active"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : user?.geminiStatus === "invalid"
                        ? "text-red-500 dark:text-red-400"
                        : "text-amber-500 dark:text-amber-400"
                    }`}>{user?.geminiStatus}</h2>
                </div>

                 <div className='rounded-2xl border border-gray-100 dark:border-white/10 bg-[#f8fafc] dark:bg-[#0e1424] p-4'>
                  
                  <p className='text-sm text-gray-400 dark:text-gray-500'>{user?.plan === "free"
                      ? "Messages Left"
                      : "Plan Expiry"}</p>
                  <h2 className='text-xl font-bold text-[#081028] dark:text-white mt-1 capitalize'>{user?.plan === "free"
                      ? remainingMessages
                      : `${remainingDays} Days`}</h2>
                </div>
              </div>

              <div className='mt-7'>

                <div className='mt-4 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 p-4'>
                  <p className='text-sm font-semibold text-amber-900 dark:text-amber-300'>
                    Where to paste this script?
                  </p>
                  <p className='text-sm text-amber-700 dark:text-amber-400 mt-2 leading-6'>
                    Paste this script before the closing
                    {" "}
                    <span className="font-semibold">
                      {"</body>"}
                    </span>
                    {" "}
                    tag of your website HTML file.
                    <br />
                    <br />
                    Example:
                  </p>

                  <pre className='mt-3 bg-[#0b1020] text-emerald-400 rounded-xl p-3 text-xs font-mono overflow-x-auto'>
                     {`<body>

  Your Website Content

  <script src="${CLIENT_URL}/assistant.js" data-user-id="${user?._id}"></script>

</body>`}
                  </pre>
                </div>

                <p className='text-sm font-medium text-[#081028] dark:text-white mb-3 mt-3'>Embed Code</p>
              </div>

              <div className='relative'>
               <textarea readOnly value={embedCode} className='w-full h-20 bg-[#0b1020] text-emerald-400 rounded-2xl p-4 text-sm font-mono resize-none outline-none border dark:border-white/10'/>
                <button onClick={()=>{
                  navigator.clipboard.writeText(embedCode);
                  toast.success("Copied")
                }} className='absolute top-4 right-4 w-10 h-10 rounded-xl bg-white dark:bg-[#1c2540] dark:text-white flex items-center justify-center'><FiCopy/></button>
              </div>


              <button onClick={()=>setEditAssistant(true)} className='mt-6 h-12 px-6 rounded-2xl bg-gradient-to-r from-purple-500 to-emerald-500 text-white font-medium'>Edit Assistant</button>


          </div>

          
        )}

        {editAssistant && <div className='space-y-6'>

          <div className='bg-white dark:bg-[#131a2e] rounded-3xl border border-gray-100 dark:border-white/10 shadow-sm p-6'>
            <h2 className='text-lg font-semibold mb-5 dark:text-white'>Basic Information</h2>

            <div className='space-y-4'>
              <input type="text" 
              onChange={(e)=>setAssistantName(e.target.value)}
              value={assistantName}
              placeholder="Assistant Name"
              className="w-full border border-gray-200 dark:border-white/10 dark:bg-[#0e1424] dark:text-white rounded-2xl px-4 py-3" />

              <input type="text" 
              onChange={(e)=>setBusinessName(e.target.value)}
              value={businessName}
              placeholder="Business Name"
              className="w-full border border-gray-200 dark:border-white/10 dark:bg-[#0e1424] dark:text-white rounded-2xl px-4 py-3" />

              <input type="text" 
              onChange={(e)=>setBusinessType(e.target.value)}
              value={businessType}
              placeholder="Business Type"
              className="w-full border border-gray-200 dark:border-white/10 dark:bg-[#0e1424] dark:text-white rounded-2xl px-4 py-3" />

              <textarea type="text" 
              rows={4}
              onChange={(e)=>setBusinessDescription(e.target.value)}
              value={businessDescription}
              placeholder="Business Description"
              className="w-full border border-gray-200 dark:border-white/10 dark:bg-[#0e1424] dark:text-white rounded-2xl px-4 py-3 resize-none" />


            </div>
          </div>

          <div className='bg-white dark:bg-[#131a2e] rounded-3xl border border-gray-100 dark:border-white/10 shadow-sm p-6'>
            <h2 className='text-lg font-semibold mb-5 dark:text-white'>
              Appearance
            </h2>

            <div>
              <label  className='text-sm text-gray-600 dark:text-gray-400 mb-3 block'>Theme</label>

              <div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
                {THEMES.map((item)=>(
                  <button key={item}
                  onClick={()=>setTheme(item)}
                   className={`py-3 rounded-2xl border-2 capitalize ${theme === item
                        ? "border-purple-500 bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300"
                        : "border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300"
                        }`}>{item}
                  </button>
                ))}
              </div>
            </div>


            <div className='mt-6'>
              <label  className='text-sm text-gray-600 dark:text-gray-400 mb-3 block'>Assistant Tone</label>

              <div className='grid grid-cols-2 sm:grid-cols-3 gap-3'>
                {TONES.map((item)=>(
                  <button key={item}
                  onClick={()=>setTone(item)}
                   className={`py-3 rounded-2xl border-2 capitalize ${tone === item
                        ? "border-purple-500 bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300"
                        : "border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300"
                        }`}>{item}
                  </button>
                ))}
              </div>
            </div>

            <div className='mt-6'>
              <label  className='text-sm text-gray-600 dark:text-gray-400 mb-3 block'>Assistant Language</label>

              <div className='grid grid-cols-2 sm:grid-cols-3 gap-3'>
                {LANGUAGES.map((item)=>(
                  <button key={item.code}
                  onClick={()=>setLanguage(item.code)}
                   className={`py-3 rounded-2xl border-2 capitalize ${language === item.code
                        ? "border-purple-500 bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300"
                        : "border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300"
                        }`}>{item.label}
                  </button>
                ))}
              </div>
            </div>

          </div>


          <div className='bg-white dark:bg-[#131a2e] rounded-3xl border border-gray-100 dark:border-white/10 shadow-sm p-6'>
            <div className='flex items-center justify-between mb-5 gap-4 flex-wrap'>
              <div>
                <h2 className='text-lg font-semibold dark:text-white'>
                  Gemini API KEY
                </h2>
                <p className='text-sm text-gray-400 dark:text-gray-500 mt-1'>
                  Add your Gemini API key to power your assistant
                </p>
              </div>

              <a href="https://aistudio.google.com/app/apikey"
              target='_blank'
              rel='noopener noreferrer'
              className='px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-emerald-500 text-white text-sm font-medium hover:scale-[1.02] transition-all cursor-pointer'>
                Get API KEY
              </a>
            </div>

            <input type="password" 
            placeholder="AIza..."
            onChange={(e)=>setGeminiApiKey(e.target.value)}
            value={geminiApiKey}
            className="w-full border border-gray-200 dark:border-white/10 dark:bg-[#0e1424] dark:text-white rounded-2xl px-4 py-3" />

            <p className='text-xs text-gray-400 dark:text-gray-500 mt-3 leading-6'>
               Your API key is securely stored and only used for generating AI responses.
            </p>
          </div>

          <div className='bg-white dark:bg-[#131a2e] rounded-3xl border border-gray-100 dark:border-white/10 shadow-sm p-6'>
            <div className='flex items-center justify-between mb-5 flex-wrap'>
              <div>
                <h2 className='text-lg font-semibold dark:text-white'>Navigation Pages</h2>
                <p className='text-sm text-gray-400 dark:text-gray-500'>
                  Assistant can redirect users
                </p>
              </div>

              <button onClick={addPage} className='flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-emerald-500 text-white text-sm'>
                <FiPlus/>Add
              </button>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
              <input type="text" placeholder='Page Name' className='border border-gray-200 dark:border-white/10 dark:bg-[#0e1424] dark:text-white rounded-2xl px-4 py-3'
              onChange={(e)=>setPageName(e.target.value)}
              value={[pageName]}/>

              <input type="text" placeholder='/pricing' className='border border-gray-200 dark:border-white/10 dark:bg-[#0e1424] dark:text-white rounded-2xl px-4 py-3'
              onChange={(e)=>setPagePath(e.target.value)}
              value={[pagePath]}/>

              <input type="text" placeholder='Pricing  Plan' className='border border-gray-200 dark:border-white/10 dark:bg-[#0e1424] dark:text-white rounded-2xl px-4 py-3'
              onChange={(e)=>setPageKeywords(e.target.value)}
              value={[pageKeywords]}/>
            </div>

            <div className='mt-5 space-y-3'>
              {
                pages.map((page,index)=>(
                  <div key={index}
                  className='flex items-center justify-between border border-gray-100 dark:border-white/10 rounded-2xl p-4'>

                    <div>
                      <p className='font-medium dark:text-white'>{page.name}</p>
                      <p className='text-sm text-gray-400 dark:text-gray-500'>{page.path}</p>
                  
                    </div>
                    <button onClick={()=>removePage(index)} className='text-red-500'>
                      <FiTrash2/>

                    </button>
                  </div>
                ))
              }
            </div>
          </div>

          <button onClick={saveAssistant} 
          disabled={loading || 
             !assistantName ||
        !businessName  ||
        !businessType ||
        !businessDescription ||
        !geminiApiKey} className='w-full h-14 rounded-2xl bg-gradient-to-r from-purple-500 to-emerald-500 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed'>
            {
              loading ? "Saving..." : user.isSetupComplete ? "Update Assistant" : "Save Assistant"
            }
          </button>

        </div>}

      </div>
      
    </div>
  )
}

export default Builder