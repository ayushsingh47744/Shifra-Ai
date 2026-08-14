// const Gemini_URL = "https://generativelanguage.googleapis.com/v1beta/interactions"  


// export const generateGeminiResponse = async ({
//     prompt,
//     apikey,
//     user
// }) => {
//     try {

//         if (!apikey) {
//             throw new Error("Gemini API key missing")
//         }

//         const response = await fetch(`${Gemini_URL}?key=${apikey}`, {
//             method: "POST",
//             headers: {
//                 "Content-Type":
//                     "application/json",
//             },
//             body: JSON.stringify({
//                 contents: [
//                     {
//                         parts: [
//                             {
//                                 text: prompt
//                             }
//                         ]
//                     }
//                 ]
//             })

//         })

//         if (!response.ok) {

//         // Invalid API Key
//         if (
//           response.status === 400 ||
//           response.status === 401
//         ) {

//           user.geminiStatus =
//             "invalid";

//           await user.save();
//         }

//         // Quota Exceeded
//         if (
//           response.status === 429
//         ) {

//           user.geminiStatus =
//             "quota_exceeded";

//           await user.save();
//         }

//         const err =
//           await response.text();

//         throw new Error(err);
//       }

//       // =========================
//       // SUCCESS STATUS
//       // =========================

//       user.geminiStatus =
//         "active";

//       await user.save();

//       const data = await response.json()
      

//       const text = data.candidates?.[0]
//         ?.content?.parts?.[0]
//         ?.text;

//          if (!text) {

//         throw new Error(
//           "No text returned from Gemini"
//         );
//       }

//       return text.trim();
//     } catch (error) {

//          console.error(
//         "Gemini Fetch Error:",
//         error.message
//       );

//       throw new Error(
//         "Gemini API fetch failed"
//       );

//     }
// }

const Gemini_URL =
    "https://generativelanguage.googleapis.com/v1beta/interactions";

export const generateGeminiResponse = async ({
    prompt,
    apikey,
    user
}) => {
    try {

        // =========================
        // CHECK API KEY
        // =========================

        if (!apikey) {
            throw new Error("Gemini API key missing");
        }

        // =========================
        // GEMINI API REQUEST
        // =========================

        const response = await fetch(Gemini_URL, {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "x-goog-api-key": apikey
            },

            body: JSON.stringify({
                model: "gemini-3.6-flash",
                input: prompt
            })
        });

        // =========================
        // ERROR HANDLING
        // =========================

        if (!response.ok) {

            // Invalid API Key
            if (
                response.status === 400 ||
                response.status === 401
            ) {
                user.geminiStatus = "invalid";
                await user.save();
            }

            // Quota Exceeded
            if (response.status === 429) {
                user.geminiStatus = "quota_exceeded";
                await user.save();
            }

            const err = await response.text();

            console.error(
                "Gemini API Error:",
                err
            );

            throw new Error(err);
        }

        // =========================
        // SUCCESS STATUS
        // =========================

        user.geminiStatus = "active";
        await user.save();

        // =========================
        // READ RESPONSE
        // =========================

        const data = await response.json();

        // Find model output step
        const modelOutput = data.steps?.find(
            step => step.type === "model_output"
        );

        // Find text content
        const text = modelOutput?.content
            ?.find(
                content => content.type === "text"
            )
            ?.text;

        // =========================
        // CHECK TEXT
        // =========================

        if (!text) {
            console.error(
                "Gemini Response:",
                JSON.stringify(data, null, 2)
            );

            throw new Error(
                "No text returned from Gemini"
            );
        }

        // =========================
        // RETURN RESPONSE
        // =========================

        return text.trim();

    } catch (error) {

        console.error(
            "Gemini Fetch Error:",
            error.message
        );

        throw new Error(
            "Gemini API fetch failed"
        );
    }
};