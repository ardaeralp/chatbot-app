async function loadGeminiModels() {
// WARNING: Storing API keys in client-side code is insecure. Prefer a server-side proxy.
// If you still want a static key for local testing, set it below (DO NOT commit it).
const STATIC_GEMINI_KEY = '';

    //const geminiKeyInput = document.getElementById('geminiKey');
    const geminiModelDropdown = document.getElementById('geminiModel');
    const geminiModelGroup = document.getElementById('geminiModelGroup');
    const loadModelsBtn = document.getElementById('loadModelsBtn');
    
    // Use static key if provided, otherwise use value from the UI
    const apiKey = STATIC_GEMINI_KEY.trim();

    if (!apiKey) {
        showError('Please enter your Google Gemini API key first');
        return;
    }

    // Disable button and show loading
    loadModelsBtn.disabled = true;
    loadModelsBtn.textContent = 'Loading models...';

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || `API Error: ${response.status}`);
        }

        const data = await response.json();
        const models = data.models || [];
        
        // Filter models that support generateContent method
        const generateContentModels = models.filter(model => 
            model.supportedGenerationMethods && 
            model.supportedGenerationMethods.includes('generateContent')
        );

        if (generateContentModels.length === 0) {
            throw new Error('No models available with generateContent support');
        }

        // Clear existing options and populate with new models
        geminiModelDropdown.innerHTML = '';
        generateContentModels.forEach(model => {
            const option = document.createElement('option');
            option.value = model.name.split('/')[1]; // Extract model ID
            option.textContent = `${model.displayName} (${model.name.split('/')[1]})`;
            geminiModelDropdown.appendChild(option);
        });

        // Show model dropdown and hide load button
        geminiModelGroup.style.display = 'block';
        loadModelsBtn.style.display = 'none';
        clearError();
        showSuccess(`Loaded ${generateContentModels.length} available models`);

    } catch (error) {
        showError(`Failed to load models: ${error.message}`);
    } finally {
        loadModelsBtn.disabled = false;
        loadModelsBtn.textContent = 'Load Available Models';
    }
}

async function sendToGemini(userInput) {
// WARNING: Storing API keys in client-side code is insecure. Prefer a server-side proxy.
const STATIC_GEMINI_KEY = '';

    const outputBox = document.getElementById('outputBox');
    const sendBtn = document.getElementById('sendBtn');
    const loading = document.getElementById('loading');
    
    // Use static key only (UI key inputs were removed)
    const apiKey = (STATIC_GEMINI_KEY && STATIC_GEMINI_KEY.trim() !== '') ? STATIC_GEMINI_KEY.trim() : '';
    // Default model: Gemini 2.5 Flash (model selection is commented out)
    const modelId = 'gemini-2.5-flash';

    if (!apiKey) {
        showError('Please enter your Google Gemini API key');
        return;
    }

    // Clear previous errors
    clearError();

    // Disable button and show loading
    sendBtn.disabled = true;
    loading.classList.add('active');
    outputBox.value = '';

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: userInput
                            }
                        ]
                    }
                ],
                generationConfig: {
                    maxOutputTokens: 2000,
                    temperature: 0.7
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || `API Error: ${response.status}`);
        }

        const data = await response.json();
        const botResponse = data.candidates[0].content.parts[0].text;
        outputBox.value = botResponse;

    } catch (error) {
        showError(`Gemini Error: ${error.message}`);
        outputBox.value = '';
    } finally {
        sendBtn.disabled = false;
        loading.classList.remove('active');
    }
}
