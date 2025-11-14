# ChatGPT App

A simple web application that integrates with OpenAI's ChatGPT API to provide AI-powered responses.

## Project Structure

```
chatgpt-app/
├── index.html      # HTML structure
├── styles.css      # Styling and layout
├── script.js       # JavaScript functionality
└── README.md       # Project documentation
```

## Features

- **API Key Input** - Securely enter your OpenAI API key
- **Input Textbox** - Enter your questions
- **Output Textbox** - Displays ChatGPT's responses
- **Send Button** - Send messages to ChatGPT (supports Ctrl/Cmd + Enter)
- **Clear Button** - Clear input and output
- **Error Handling** - Displays validation and API errors
- **Loading State** - Shows spinner while waiting for response
- **Responsive Design** - Works on different screen sizes

## Getting Started

1. **Get an API Key**
   - Visit [OpenAI Platform](https://platform.openai.com/api-keys)
   - Create a new API key

2. **Open the App**
   - Open `index.html` in your web browser
   - Or use a local server: `python3 -m http.server 8000`
   - Navigate to `http://localhost:8000`

3. **Use the App**
   - Paste your OpenAI API key in the API Key field
   - Type your question in the input textbox
   - Click "Send" or press Ctrl/Cmd + Enter
   - View the response in the output textbox

## Usage Example

```
Input: "Explain quantum computing in simple terms"
Output: [ChatGPT's detailed explanation]
```

## Configuration

The app uses the following settings in `script.js`:
- **Model**: `gpt-3.5-turbo` (can be changed to `gpt-4` if available)
- **Max Tokens**: 2000
- **Temperature**: 0.7

## Notes

- Keep your API key private and never share it
- Be aware of API usage costs on OpenAI's platform
- The free tier may have limited requests

IMPORTANT: Static API key (insecure)

- This project optionally supports placing a static OpenAI key directly into `chatgpt-app/chatgpt.js` for local testing only. That approach is insecure because any key embedded in client-side code can be discovered by others.
- If you must use a static key for quick local tests, open `chatgpt-app/chatgpt.js` and set the `STATIC_OPENAI_KEY` constant at the top of the file. Example:

```javascript
// chatgpt-app/chatgpt.js
const STATIC_OPENAI_KEY = 'REPLACE_WITH_YOUR_KEY_HERE'; // DO NOT commit
```

- Strongly recommended alternative: run the included server proxy and store your key in a `.env` file (see README sections above for server setup). The proxy keeps the key off the client and is safer for any shared or production use.

## Browser Compatibility

- Chrome/Chromium
- Firefox
- Safari
- Edge

## License

Free to use and modify for personal projects.
