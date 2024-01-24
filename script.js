const input = document.querySelector('.message-input');
const btn = document.getElementById('send');
const chatBody = document.querySelector('.chat-body');
let startingMessage = "Hi there👋 <br> How can I help you today?"


const botMessageHTML = (botMessageText) => {
    const botDiv = document.createElement('div');
    botDiv.classList.add('bot');
    botDiv.innerHTML = `
    <img src="./images/chatbot_img.png" alt="Bot">
    <div class="box box1">
        <p>${botMessageText}</p>
    </div>`;
    chatBody.appendChild(botDiv);
}

const writeMessageHTML = (writeMessageText) => {
    const userDiv = document.createElement('div');
    userDiv.classList.add('user');
    userDiv.innerHTML = `
    <div class="box box2">
    <p>${writeMessageText}</p>
    </div>`;
    chatBody.appendChild(userDiv);
}

const apiURL = `https://api.openai.com/v1/chat/completions`;
const apiKey = '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';

const getResponce = function (usermessage,bot_MessageHTML){
// POST Operation for the API
const options = {
    method:'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
        'model': 'gpt-3.5-turbo',
        'messages':[
            {
                role: "system",
                content: usermessage
            }
        ]
    })
}
//Get Responce from the API
fetch(apiURL,options)
.then(responce => responce.json())
.then(data => {
    console.log(data.choices[0].message.content);
    bot_MessageHTML(data.choices[0].message.content);
})
.catch(err => console.warn(err))
}
// getResponce('what can you do')
const startChat = function () {
    botMessageHTML(startingMessage);

    function sendMessage() {
        let inputValue = input.value;
        if (inputValue.trim() !== '') {
            writeMessageHTML(inputValue);
            input.value = '';
            getResponce(inputValue, botMessageHTML);
        }
    }

    btn.onclick = sendMessage;

    input.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });
}

startChat();