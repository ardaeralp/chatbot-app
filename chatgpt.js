async function sendToChatGPT(userInput) {
// WARNING: Storing API keys in client-side code is insecure. Prefer a server-side proxy.
// If you still want a static key for local testing, set it below (DO NOT commit it).
const STATIC_OPENAI_KEY = '';

    const chatgptModelDropdown = document.getElementById('chatgptModel');
    const outputBox = document.getElementById('outputBox');
    const sendBtn = document.getElementById('sendBtn');
    const loading = document.getElementById('loading');
    
    // Use static key only (UI key inputs were removed)
    const apiKey = (STATIC_OPENAI_KEY && STATIC_OPENAI_KEY.trim() !== '') ? STATIC_OPENAI_KEY.trim() : '';
    // Default model: GPT-3.5 Turbo (model selection is commented out)
    const model = 'gpt-3.5-turbo';

    if (!apiKey) {
        showError('Please enter your OpenAI API key');
        return;
    }

    // Clear previous errors
    clearError();

    // Disable button and show loading
    sendBtn.disabled = true;
    loading.classList.add('active');
    outputBox.value = '';

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: model,
                messages: [
                    {
                        role: 'user',
                        content: userInput
                    }
                ],
                max_tokens: 2000,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || `API Error: ${response.status}`);
        }

        const data = await response.json();
        const botResponse = data.choices[0].message.content;
        outputBox.value = botResponse;

    } catch (error) {
        showError(`ChatGPT Error: ${error.message}`);
        outputBox.value = '';
    } finally {
        sendBtn.disabled = false;
        loading.classList.remove('active');
    }
}
