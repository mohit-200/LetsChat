const socket = io()
let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
do {
    name = prompt('Please enter your name: ')
} while (!name)

textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        if(textarea.innerHTML!=="<div><br></div><div><br></div>"){
            sendMessage(textarea.innerHTML.slice(0,-15))
        }
        else if(textarea.innerHTML!=="<div><br></div>"){
            textarea.innerHTML=""
            $('#textarea div').empty()
        }
    }
})

function sendMessage(message) {
    let msg = {
            user: name,
            message: message
        }
        // Append 
    appendMessage(msg, 'outgoing')
    textarea.innerHTML=""
    $('#textarea div').empty()
    scrollToBottom()

    // Send to server 
    socket.emit('message', msg)

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Recieve messages 
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}

$('.embolden').click(function(){
    var highlight = window.getSelection(); 
    var span = '<b>' + highlight + '</b>';
    var text = $('#textarea').html();
    $('#textarea').html(text.replace(highlight, span));
});

$('.italics').click(function(){
    var highlight = window.getSelection(); 
    var span = '<i>' + highlight + '</i>';
    var text = $('#textarea').html();
    $('#textarea').html(text.replace(highlight, span));
});

$('.strike').click(function(){
    var highlight = window.getSelection(); 
    var span = '<s>' + highlight + '</s>';
    var text = $('#textarea').html();
    $('#textarea').html(text.replace(highlight, span));
});

$('.link').click(function(){
    var highlight = window.getSelection(); 
    var span = '<a href="'+highlight+'">' + highlight + '</a>';
    var text = $('#textarea').html();
    $('#textarea').html(text.replace(highlight, span));
});

$('.blist').click(function(){
    var highlight = window.getSelection(); 
    var span = '<ul><li>' + highlight + '</li></ul>';
    var text = $('#textarea').html();
    $('#textarea').html(text.replace(highlight, span));
});

$('.nlist').click(function(){
    var highlight = window.getSelection(); 
    var span = '<ol><li>' + highlight + '</li></ol>';
    var text = $('#textarea').html();
    $('#textarea').html(text.replace(highlight, span));
});

$('.bq').click(function(){
    var highlight = window.getSelection(); 
    var span = '<blockquote>' + highlight + '</blockqoute>';
    var text = $('#textarea').html();
    $('#textarea').html(text.replace(highlight, span));
});

$("textarea").focusout(function(){
    var element = $(this);        
    if (!element.text().replace(" ", "").length) {
        element.empty();
    }
});