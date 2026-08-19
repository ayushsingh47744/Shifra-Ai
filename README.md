# 🤖 Shifra AI — Custom AI Agent Platform

<p align="center">
  <strong>Build, customize, and embed your own AI-powered agent into any website.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/Gemini-AI-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Gemini"/>
  <img src="https://img.shields.io/badge/Razorpay-Payments-02042B?style=for-the-badge" alt="Razorpay"/>
</p>

---

## 🔗 Live Demo

**Deployment Link:** [https://shifra-ai-1-xral.onrender.com/](https://shifra-ai-1-xral.onrender.com/)

---

## 🌐 Overview

**Shifra AI** is a full-stack AI agent platform that allows businesses and website owners to create a customized AI agent and embed it directly into their websites.

Instead of building a separate chatbot for every website, Shifra provides a configurable agent where users can define:

* Agent name
* Business name
* Business type
* Business description
* Agent tone
* Language
* Website pages
* Navigation keywords
* Gemini API configuration

The generated agent can then be embedded into a website using a lightweight JavaScript snippet.

Shifra combines **generative AI, conversational history, website navigation, voice-oriented responses, subscription billing, and an embeddable widget** into one platform.

---

# ✨ Key Features

## 🤖 AI-Powered Agent

Shifra uses the **Google Gemini API** to generate contextual responses.

Each agent can be personalized using business-specific information such as:

* Business name
* Business type
* Business description
* Agent name
* Communication tone
* Preferred language
* Previous conversation context

The backend constructs a contextual prompt before sending the request to Gemini, allowing each agent to behave differently depending on its configuration.

---

## 🎨 Custom Agent Builder

The **Agent Builder** allows users to configure their AI agent without changing the source code.

Users can customize:

| Setting              | Available Options               |
| --------------------- | -------------------------------- |
| Agent Name       | Custom                          |
| Tone                 | Friendly / Professional / Sales |
| Language             | English / Hindi                 |
| Theme                | Light / Dark / Glass / Neon     |
| Business Name        | Custom                          |
| Business Type        | Custom                          |
| Business Description | Custom                          |
| Website Pages        | Custom                          |
| Navigation Keywords  | Custom                          |

These settings are persisted in MongoDB through the user model.

---

# 🌍 Website Embedding

One of Shifra's core features is its **embeddable AI agent**.

After configuring an agent, the platform generates a JavaScript snippet:

```html
<script
  src="YOUR_SHIFRA_CLIENT_URL/agent.js"
  data-user-id="YOUR_AGENT_ID">
</script>
```

The script can be placed before the closing `</body>` tag of another website.

This allows the AI agent to be integrated without requiring the host website to use React, Node.js, or any specific framework.

### Integration Flow

```text
Business creates agent
          ↓
Configure agent
          ↓
Add website pages & keywords
          ↓
Generate embed script
          ↓
Paste script into website
          ↓
Shifra widget loads
          ↓
Visitor interacts with AI
          ↓
Backend processes request
          ↓
Gemini generates response
```

---

# 🧭 AI-Powered Website Navigation

Shifra is not limited to answering questions.

The agent can also understand navigation commands such as:

```text
"Open pricing"

"Go to contact page"

"Show me the products"

"Navigate to about"
```

The system checks whether navigation is enabled and matches the user's request against configured page keywords.

If a matching page is found, the backend returns a structured navigation response:

```json
{
  "success": true,
  "action": "navigate",
  "path": "/pricing",
  "response": "Opening Pricing"
}
```

This allows the agent to actively interact with the website instead of functioning only as a text chatbot.

---

# 🗣️ Multilingual Agent

Shifra currently supports:

* 🇺🇸 English (`en-US`)
* 🇮🇳 Hindi (`hi-IN`)

The selected language is included in the AI prompt so that responses are generated in the configured language.

---

# 🎙️ Voice-Oriented AI

The agent is designed for short, natural responses suitable for voice interaction.

The Gemini prompt instructs the model to:

* Keep responses short
* Respond naturally
* Use conversational context
* Avoid long explanations
* Provide direct answers
* Respond in the configured language

The client also includes microphone-related assets for the agent experience.

---

# 💬 Conversation History

Shifra persists conversations in MongoDB.

Each conversation stores:

* User ID
* Visitor ID
* Messages
* Message role
* Message text
* Conversation status
* Timestamps

Messages are represented as either:

```text
user
agent
```

This allows conversations to be retrieved later through the history interface.

### Conversation Flow

```text
Visitor sends message
        ↓
AI generates response
        ↓
User message saved
        ↓
Agent response saved
        ↓
Conversation remains ongoing
        ↓
History available later
```

The backend intentionally saves conversation history separately from the AI response path so that a conversation-save failure does not prevent the user from receiving the AI response.

---

# 📊 Conversation History Dashboard

Authenticated users can access:

* Conversation history
* Individual conversation details
* Previous messages
* Conversation status

The frontend provides dedicated pages for:

```text
/history
/history/:id
```

and corresponding backend routes/controllers handle conversation retrieval.

---

# 🔐 Authentication

Shifra uses JWT-based authentication.

The platform supports Google-based authentication where:

1. User submits name and email
2. Existing account is checked
3. New user is created if necessary
4. JWT is generated
5. Authentication token is stored in a cookie
6. User receives access to protected features

The frontend uses a `ProtectedRoute` component to restrict application pages to authenticated users.

---

# 💳 Free & Pro Plans

Shifra includes a subscription-style usage model.

### Free Plan

The free plan has a configurable message limit.

The user model tracks:

```text
totalMessages
requestLimit
```

The default request limit is **200 messages**.

### Pro Plan

The Pro plan provides an extended subscription period and removes the free-plan message restriction.

The current billing implementation creates a Razorpay order for the Pro plan and, after successful signature verification, updates the user to:

```text
plan = "pro"
```

with a **90-day expiry period**.

---

# 💰 Razorpay Payment Integration

Shifra uses **Razorpay** for subscription payments.

### Payment Flow

```text
User selects Pro Plan
        ↓
Backend creates Razorpay order
        ↓
Order stored in MongoDB
        ↓
User completes payment
        ↓
Razorpay returns payment details
        ↓
Backend verifies signature
        ↓
Billing record marked as paid
        ↓
User upgraded to Pro
        ↓
Pro expiry date calculated
```

The backend verifies the payment signature using HMAC-SHA256 before upgrading the account.

---

# 🧠 Gemini Integration

Gemini communication is isolated inside:

```text
Server/Configs/gemini.js
```

The application sends the generated prompt to Google's Gemini endpoint and extracts the model output from the response.

The integration also tracks Gemini API status:

```text
active
invalid
quota_exceeded
```

This status is persisted against the user account, allowing the application to distinguish API-key and quota-related failures.

---

# 🏗️ Architecture

```text
                         ┌──────────────────────┐
                         │       Visitor        │
                         │      / Customer      │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │  Shifra Widget       │
                         │  agent.js        │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │ Node.js + Express    │
                         │                      │
                         │ Auth                 │
                         │ Agent            │
                         │ Conversation         │
                         │ Billing              │
                         │ User Management      │
                         └───────┬───────┬──────┘
                                 │       │
                       ┌─────────┘       └──────────┐
                       ▼                            ▼
              ┌─────────────────┐         ┌─────────────────┐
              │    MongoDB      │         │  External APIs  │
              │                 │         │                 │
              │ Users           │         │ Gemini          │
              │ Conversations  │         │ Razorpay        │
              │ Billing         │         └─────────────────┘
              └─────────────────┘
```

---

# 🛠️ Tech Stack

## Frontend

| Technology      | Purpose                    |
| ---------------- | ---------------------------- |
| React 19        | UI development             |
| Vite            | Build tooling               |
| React Router    | Client-side routing        |
| Tailwind CSS 4  | Styling                    |
| Axios           | API communication          |
| Firebase        | Authentication integration |
| React Icons     | Icons                      |
| React Hot Toast | Notifications              |

The frontend dependency configuration confirms React, Vite, Tailwind CSS 4, Axios, Firebase, React Router, React Icons, and React Hot Toast.

---

## Backend

| Technology    | Purpose                        |
| -------------- | -------------------------------- |
| Node.js       | Runtime                        |
| Express 5     | REST API                       |
| MongoDB       | Database                       |
| Mongoose      | ODM                             |
| JWT           | Authentication                 |
| Cookie Parser | Authentication cookies         |
| CORS          | Cross-origin communication     |
| Razorpay      | Subscription payments          |
| Crypto        | Payment signature verification |
| Dotenv        | Environment configuration      |
| Nodemon       | Development server             |

The backend package configuration confirms Express, Mongoose, JWT, Razorpay, CORS, cookie-parser, crypto, dotenv, and Nodemon.

---

# 📁 Project Structure

```text
Shifra-Ai/
│
├── Client/
│   │
│   ├── public/
│   │   ├── agent.js
│   │   ├── agent.css
│   │   ├── logo.png
│   │   └── mic.svg
│   │
│   ├── src/
│   │   ├── Components/
│   │   │   ├── AgentPreview.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── ThemeToggle.jsx
│   │   │
│   │   ├── api/
│   │   ├── assets/
│   │   ├── context/
│   │   ├── pages/
│   │   │   ├── Billing.jsx
│   │   │   ├── Builder.jsx
│   │   │   ├── ConversationDetail.jsx
│   │   │   ├── History.jsx
│   │   │   ├── Home.jsx
│   │   │   └── Login.jsx
│   │   │
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
└── Server/
    │
    ├── Configs/
    │   ├── db.js
    │   ├── gemini.js
    │   ├── razorpay.js
    │   └── token.js
    │
    ├── Controllers/
    │   ├── agent.controller.js
    │   ├── auth.controller.js
    │   ├── billing.controller.js
    │   ├── conversation.controller.js
    │   └── user.controller.js
    │
    ├── Middleware/
    │   └── auth.middleware.js
    │
    ├── Models/
    │   ├── billing.model.js
    │   ├── conversation.model.js
    │   └── user.model.js
    │
    ├── Routes/
    │   ├── agent.route.js
    │   ├── auth.route.js
    │   ├── billing.route.js
    │   ├── conversation.route.js
    │   └── user.route.js
    │
    ├── index.js
    └── package.json
```

The repository follows a clean separation between the React client and Express server, with the server further divided into configuration, controllers, middleware, models, and routes.

---

# 🔌 Backend API Structure

The server is organized around separate route modules:

```text
Authentication
      │
      ├── auth.route.js
      │
      ▼
User Management
      │
      ├── user.route.js
      │
      ▼
AI Agent
      │
      ├── agent.route.js
      │
      ▼
Conversations
      │
      ├── conversation.route.js
      │
      ▼
Billing
      │
      └── billing.route.js
```

This keeps authentication, AI processing, conversations, user configuration, and payments separated into independent modules.

---

# 🔄 Core Agent Request Flow

```text
User Message
     ↓
Authentication / User Lookup
     ↓
Check Gemini API Key
     ↓
Check Plan & Message Limit
     ↓
Check Navigation Intent
     │
     ├── Navigation Request
     │       ↓
     │   Match Page Keywords
     │       ↓
     │   Return Navigation Action
     │
     └── Normal Question
             ↓
        Build Contextual Prompt
             ↓
        Gemini API
             ↓
        AI Response
             ↓
        Update Usage
             ↓
        Save Conversation
             ↓
        Return Response
```

This logic is implemented in the agent controller, including plan checks, navigation detection, language selection, prompt construction, Gemini calls, usage tracking, and conversation persistence.

---

# 🧩 Agent Configuration Model

Each agent stores its configuration as part of the user profile.

Example:

```json
{
  "agentName": "Shifra",
  "businessName": "Example Business",
  "businessType": "E-commerce",
  "businessDescription": "Online fashion store",
  "tone": "friendly",
  "theme": "dark",
  "language": "en-US",
  "enableVoice": true,
  "enableNavigation": true
}
```

Website navigation pages are stored with:

```json
{
  "name": "Pricing",
  "path": "/pricing",
  "keywords": [
    "pricing",
    "plans",
    "cost"
  ]
}
```

This configuration-driven architecture allows the same agent engine to support different businesses without changing the core AI implementation.

---

# 📊 Usage & Plan Management

The user model tracks:

```text
plan
totalMessages
requestLimit
proExpiresAt
geminiStatus
isSetupComplete
```

This allows Shifra to implement usage-based access control and subscription management at the application level.

---

# ⚙️ Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/ayushsingh47744/Shifra-Ai.git

cd Shifra-Ai
```

---

# 🖥️ Client Setup

```bash
cd Client
npm install
```

Create the required environment/configuration values according to your local deployment.

Start the development server:

```bash
npm run dev
```

Build the production application:

```bash
npm run build
```

The frontend uses Vite for development and production builds.

---

# 🖥️ Server Setup

Open another terminal:

```bash
cd Server
npm install
```

Create a `.env` file with your credentials:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

Add the Gemini configuration required by the application.

Start the development server:

```bash
npm run dev
```

The backend uses Nodemon for development.

---

# 🔑 Required Services

To run the complete application, configure:

* MongoDB
* Google Gemini API
* Razorpay
* Google/Firebase authentication configuration

---

# 🚀 Deployment Architecture

The project is designed as two separately deployable applications:

```text
                 Internet
                    │
          ┌─────────┴─────────┐
          │                   │
          ▼                   ▼
   React/Vite Client     Express Server
          │                   │
          │                   ├── MongoDB
          │                   ├── Gemini
          │                   └── Razorpay
          │
          └──── agent.js
                 Widget
```

The current application configuration uses separate deployed client and server URLs, with the frontend communicating with the Express API and loading the agent widget from the deployed client.

---

# 💡 Why Shifra AI?

Traditional website chatbots usually require developers to build and configure a new chatbot for each website.

Shifra takes a **configuration-driven approach**.

Instead of:

```text
New Website
   ↓
Write New Chatbot
   ↓
Write New Backend
   ↓
Deploy
```

Shifra provides:

```text
New Business
    ↓
Configure Agent
    ↓
Add Website Pages
    ↓
Generate Embed Code
    ↓
Paste Script
    ↓
AI Agent Ready
```

This makes the system much closer to an **AI SaaS platform** than a simple chatbot project.

---

# 🧠 Technical Highlights

### Full-Stack Architecture

* React frontend
* Express REST API
* MongoDB database
* Modular backend structure

### AI Engineering

* Gemini API integration
* Context-aware prompting
* Business-specific agent personalities
* Multilingual responses
* Conversation context
* AI-powered website navigation

### SaaS Architecture

* User-specific agent configuration
* Free/pro plans
* Usage tracking
* Subscription expiry
* Payment integration

### Integration Architecture

* Embeddable JavaScript widget
* Website-independent agent
* Configurable page navigation
* Client-server separation

### Backend Engineering

* Controllers
* Routes
* Models
* Middleware
* JWT authentication
* Payment verification
* Persistent conversation storage

---

# 🔐 Security Considerations

The application uses several security-related mechanisms:

* JWT authentication
* Protected routes
* HTTP authentication cookies
* Environment-based secrets
* Server-side Razorpay signature verification
* API-key exclusion from agent configuration responses
* Auth middleware for protected endpoints

The agent configuration endpoint explicitly excludes the stored Gemini API key when returning user configuration.

---

# 📚 Learning Outcomes

Building Shifra AI provides hands-on experience with:

* MERN stack development
* REST API architecture
* MongoDB schema design
* Mongoose
* JWT authentication
* Protected routes
* Generative AI APIs
* Prompt engineering
* Context-aware AI
* AI-powered navigation
* Conversation persistence
* SaaS architecture
* Usage-based limits
* Subscription management
* Razorpay integration
* Embeddable JavaScript widgets
* React routing
* Tailwind CSS
* Full-stack deployment

---

# 🔮 Future Improvements

Potential improvements include:

* Streaming AI responses
* Voice input and output using dedicated speech APIs
* More AI providers besides Gemini
* Advanced intent classification
* Website crawling for automatic knowledge ingestion
* RAG-based business knowledge
* Custom knowledge bases
* Analytics dashboard
* Visitor analytics
* Team/workspace support
* Rate limiting
* Webhook-based payment confirmation
* Automated testing
* API documentation
* Agent performance metrics
* More granular subscription plans

---

# 📸 Screenshots

Add screenshots of the following before publishing the README:

```text
1. Home Dashboard
2. Agent Builder
3. Agent Preview
4. Embedded Website Agent
5. Conversation History
6. Conversation Details
7. Billing / Pro Plan
8. Dark & Light Themes
```

Example:

```md
## 📸 Screenshots

### Agent Builder

![Agent Builder](./screenshots/builder.png)

### AI Agent

![AI Agent](./screenshots/agent.png)

### Conversation History

![Conversation History](./screenshots/history.png)

### Billing

![Billing](./screenshots/billing.png)
```

---

# 👨‍💻 Project Highlights

```text
✔ Full-Stack MERN Application
✔ Custom AI Agent Builder
✔ Google Gemini Integration
✔ Business-Specific AI Context
✔ Configurable Agent Personality
✔ English & Hindi Support
✔ AI-Powered Website Navigation
✔ Embeddable JavaScript Widget
✔ Conversation History
✔ Visitor-Based Conversation Tracking
✔ JWT Authentication
✔ Protected Routes
✔ Free & Pro Plans
✔ Usage-Based Message Limits
✔ Razorpay Subscription Payments
✔ Payment Signature Verification
✔ MongoDB Persistence
✔ Responsive React UI
✔ Dark / Light / Glass / Neon Themes
```

---

# 📄 License

This project is intended for educational and portfolio purposes.

---

# ⭐ Support

If you find Shifra AI useful, consider giving the repository a ⭐ on GitHub.

---

<p align="center">
  Built with ❤️ using React, Node.js, MongoDB & Gemini AI
</p>
