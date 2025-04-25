# 🚀 CAPTION-GENERATOR

A powerful AI-driven web application leveraging the **Gemini API** to provide intelligent, context-aware features. This project is deployed live on **Netlify** and can be accessed below.

## 🌐 Live Demo

👉 [Check out the Live Site](https://LIVE_LINK.netlify.app)

---

## 📦 Features

- 🔮 Powered by Gemini API
- ⚡ Real-time interactions
- 💬 Smart responses based on user prompts
- 🌍 Deployed with Netlify
- 🧠 AI-enhanced user experience

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Suyash2304/caption-generator.git
```

### 2. Install Dependencies

Make sure you have **Node.js** installed, then run:

```bash
npm install
```

or

```bash
yarn
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add your Gemini API key:

```env
VITE_GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

### 4. Run the App Locally

```bash
npm run dev
```

or

```bash
yarn dev
```

Visit `http://localhost:5173` (or whatever port is specified in the console) to view it locally.

---

## 🤖 How the Gemini API is Used

This project integrates with the **Gemini API by Google** to handle natural language prompts and provide intelligent outputs.

### Usage Flow:

1. **User Input:** User types a query or prompt.
2. **API Call:** The input is sent to the Gemini API using a secure fetch request.
3. **Response Handling:** The response is parsed and displayed in the frontend UI.

### Sample API Integration Code:

```ts
const fetchResponse = async (prompt: string) => {
  const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + import.meta.env.VITE_GEMINI_API_KEY, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });

  const result = await response.json();
  return result?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response.';
};
```

> Ensure you have the proper API access enabled through your [Google AI Developer Console](https://makersuite.google.com/app).

---

## 🚀 Deployment

This project is automatically deployed using **Netlify**.

### To Deploy:

1. Push your project to GitHub.
2. Log in to [Netlify](https://netlify.com) and click **"New site from Git"**.
3. Connect your GitHub repository.
4. Add the `VITE_GEMINI_API_KEY` environment variable in Netlify's **Site Settings > Environment Variables**.
5. Hit **Deploy**.

---

## 📄 License

MIT License. Feel free to fork, improve, and share!

---

## 🙌 Acknowledgements

- [Gemini API (Google AI)](https://ai.google.dev)
- [Netlify](https://www.netlify.com/)
- [Vite](https://vitejs.dev/) – for frontend tooling

