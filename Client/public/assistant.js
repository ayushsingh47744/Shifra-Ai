(function () {

    // userData

    const script = document.currentScript;

    const userId = script?.dataset?.userId

    // visitorId — same browser/session ke liye persist rahega
    const getVisitorId = () => {
        let vId = localStorage.getItem("shifra_visitor_id");
        if (!vId) {
            vId = "visitor_" + Date.now() + "_" + Math.random().toString(36).substring(2, 10);
            localStorage.setItem("shifra_visitor_id", vId);
        }
        return vId;
    }

    const visitorId = getVisitorId();

    const theme = "dark"

    let assistantConfig = null

    let userLanguage = "en-US"   // default, config load hone pe update hoga


    // load CSS

    const link = document.createElement("link")

    link.rel = "stylesheet"

    link.href = "https://shifra-ai-1-xral.onrender.com/assistant.css"

    document.head.appendChild(link)


    // Create PopUp

    const popup = document.createElement("div")

    popup.className = `shifra-popup theme-${theme}`

    popup.innerHTML = `
    <div class="shifra-overlay"></div>

    <div class="shifra-content">

       <div class="shifra-top">
            <div class="shifra-orb-wrap">

                <div class="shifra-orb-glow"></div>

                <div class="shifra-orb"></div>

            </div>

            <h2 class="shifra-title">
                Hello! I'm Shifra AI
            </h2>

            <p class="shifra-sub">
                Your smart voice assistant.
                <br />
                Ask anything about your website.
            </p>


            <div class="shifra-status">
                Tap button to Speak
            </div>

            <div class="shifra-wave">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>

            <!-- User Text -->
            <div class="shifra-user-text">
            </div>

            <!-- AI Text -->
            <div class="shifra-ai-text">
            </div>
  
        </div>


        <div class="shifra-bottom">
            
            <button class="shifra-mic">

               <img 
               src="https://shifra-ai-1-xral.onrender.com/mic.svg"
               alt="mic"
               class="shifra-mic-icon"/>
            </button>
        </div>
    </div>
    
    `;

    document.body.appendChild(popup);

    // floating Button

    const button = document.createElement("button")

    button.className = `shifra-btn theme-${theme}`

    button.innerHTML = `
    <img 
    src="https://shifra-ai-1-xral.onrender.com/logo.png"
    alt="logo"
    />`;
    document.body.appendChild(button)




    // toggle popup

    let open = false

    // button.onclick = () => {
    //     open = !open;
    //     popup.style.display = open ? "flex" : "none";

    //     // popup band hone par conversation end mark karo
    //     if (!open) {
    //         fetch("http://localhost:8000/api/conversation-end", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({ userId, visitorId })
    //         }).catch((err) => console.log("End conversation error:", err));
    //     }
    // }
        button.onclick = () => {
        open = !open;
        popup.style.display = open ? "flex" : "none";

        // popup band hone par conversation end mark karo
        if (!open) {
            fetch("https://shifra-ai-wcib.onrender.com/api/conversation-end", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, visitorId })
            }).catch((err) => console.log("End conversation error:", err));
        }
    }


    // load Assistant

    const loadAssistant = async () => {
        try {
            const res = await fetch(`https://shifra-ai-wcib.onrender.com/api/assistant/config/${userId}`)

            const data = await res.json()

            if (data) {
                assistantConfig = data.user
                applyConfig()
            }

        } catch (error) {
            console.log(
                "Assistant Load Error:",
                error
            );
        }
    }


    const applyConfig = () => {
        if (!assistantConfig) return;

        popup.className = `shifra-popup theme-${assistantConfig.theme}`

        button.className = `shifra-btn theme-${assistantConfig.theme}`

        const title = popup.querySelector(".shifra-title")

        title.innerHTML = `Hello! I'm ${assistantConfig.assistantName}`;

        const subTitle = popup.querySelector(".shifra-sub")
        subTitle.innerHTML = `
    Welcome to
    ${assistantConfig.businessName}.
    <br />
    Ask anything about your website.
  `;

        // language config se le
        userLanguage = assistantConfig.language || "en-US";

    }

    loadAssistant()

    // // Conversation end tracking — tab/window band hone par ya user chale jaane par
    // window.addEventListener("beforeunload", () => {
    //     navigator.sendBeacon(
    //         "http://localhost:8000/api/conversation-end",
    //         new Blob([JSON.stringify({ userId, visitorId })], { type: "application/json" })
    //     );
    // });
        // Conversation end tracking — tab/window band hone par ya user chale jaane par
    window.addEventListener("beforeunload", () => {
        navigator.sendBeacon(
            "https://shifra-ai-wcib.onrender.com/api/conversation-end",
            new Blob([JSON.stringify({ userId, visitorId })], { type: "application/json" })
        );
    });


    // Element


    const status =
        popup.querySelector(
            ".shifra-status"
        );

    const wave =
        popup.querySelector(
            ".shifra-wave"
        );

    const userText =
        popup.querySelector(
            ".shifra-user-text"
        );

    const aiText =
        popup.querySelector(
            ".shifra-ai-text"
        );

    const mic =
        popup.querySelector(
            ".shifra-mic"
        );



    // text-speech

    const speak = (text) => {
        window.speechSynthesis.cancel();

        // Show AI response
        aiText.innerText =
            text;

        status.innerText =
            "AI Speaking...";

        const speech = new SpeechSynthesisUtterance(text)

        speech.lang = userLanguage;   // hardcoded "hi-IN" hataya

        speech.rate = 1;

        speech.pitch = 1;

        speech.volume = 1;

        // Voice end
        speech.onend = () => {

            status.innerText =
                "Tap button to Speak";

            wave.style.opacity =
                "0";
        };

        // Start speaking
        window.speechSynthesis.speak(
            speech
        );
    }


    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition


    if(SpeechRecognition){

        const recognition = new SpeechRecognition();

        recognition.continuous =
      false;

    recognition.interimResults =
      false;

    let isListening = false;   // double-click bug fix


      mic.onclick=()=>{
        if (isListening) return;   // already chal raha hai to ignore

        recognition.lang = userLanguage;   // hardcoded "en-US" hataya

        wave.style.opacity =
        "1";

      status.innerText =
        "Listening...";

      userText.innerText =
        "";

      aiText.innerText =
        "";

      isListening = true;
      recognition.start();
      }


      recognition.onresult = (e)=>{
        const text = e.results[0][0].transcript

        userText.innerText = "You: " + text;

        recognition.stop();
        isListening = false;


        setTimeout( async () => {
            try {
                status.innerText = "Thinking...";
                

                const res = await fetch("https://shifra-ai-wcib.onrender.com/api/assistant/ask" , {
                    method:"POST",
                    headers:{
                        "Content-Type":
                      "application/json",
                    } ,
                    body:JSON.stringify({
                        message:text,
                        userId,
                        visitorId
                    })
                })

                const data = await res.json()
                console.log(data)

                if(data.success){

                    if(data.action === "navigate"){
                        speak(data.response)

                        setTimeout(()=>{
                            window.location.href = data.path

                        },1500)

                    }else{
                        speak(data.aiResponse)
                    }

                }else{
                    speak("Response Error please Check your plan")

                }



            } catch (error) {
                console.log(error)
                speak("AI Server Error")
                
            }
        },600)
      };

      recognition.onerror = ()=>{
        status.innerText =
          "Tap button to Speak";

        wave.style.opacity =
          "0";

        isListening = false;  
      }

      recognition.onend = ()=>{
        isListening = false;   
      }


    }
    else{
        status.innerText =
      "Speech Recognition not supported";
    }


})();
