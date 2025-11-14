const providerSelect = document.getElementById('provider');
const inputBox = document.getElementById('inputBox');
const outputBox = document.getElementById('outputBox');
const sendBtn = document.getElementById('sendBtn');
const clearBtn = document.getElementById('clearBtn');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('errorMessage');

function updateApiKeyField() {
    const provider = providerSelect.value;
    if (provider === 'chatgpt') {
        document.getElementById('chatgptModelGroup').style.display = 'block';
        document.getElementById('geminiModelGroup').style.display = 'none';
    } else {
        document.getElementById('chatgptModelGroup').style.display = 'none';
        document.getElementById('geminiModelGroup').style.display = 'block';
    }
}

async function sendMessage() {
    const provider = providerSelect.value;
    const userInput = inputBox.value.trim();

    // Validation
    if (!userInput) {
        showError('Please enter a question');
        return;
    }

    if (provider === 'chatgpt') {
        await sendToChatGPT(userInput);
    } else if (provider === 'gemini') {
        await sendToGemini(userInput);
    }
}

function clearAll() {
    inputBox.value = '';
    outputBox.value = '';
    clearError();
    inputBox.focus();
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
}

function clearError() {
    errorMessage.textContent = '';
    errorMessage.classList.remove('show');
}

function showSuccess(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('show');
    errorMessage.style.backgroundColor = '#d4edda';
    errorMessage.style.borderLeftColor = '#28a745';
    errorMessage.style.color = '#155724';
    errorMessage.classList.add('show');
    setTimeout(() => {
        clearError();
        errorMessage.style.backgroundColor = '';
        errorMessage.style.borderLeftColor = '';
        errorMessage.style.color = '';
    }, 3000);
}

// Allow sending with Enter key (Ctrl/Cmd + Enter)
inputBox.addEventListener('keydown', function(event) {
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        sendMessage();
    }
});

// Focus on input box on load
window.addEventListener('load', function() {
    inputBox.focus();
});

