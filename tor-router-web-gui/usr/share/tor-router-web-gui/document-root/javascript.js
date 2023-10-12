function copyToClipboard(id) {
  var el_input = document.getElementById(id);
  el_input.select();
  el_input.setSelectionRange(0, 99999);
  navigator.clipboard
    .writeText(el_input.value)
    .then(() => {
      alert(el_input.getAttribute('data-alert-message'));
    })
    .catch(() => {
      alert("something went wrong");
    });
}

function showNotification(title, body) {
  if ("Notification" in window) {
    if (Notification.permission === "granted") {
      //var notification = new Notification(title, {body: body, icon: '/tor-router.svg'});
      navigator.serviceWorker.ready.then(function(registration) {
        registration.showNotification(title, {body: body, icon: '/tor-router.svg'});
      });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          //var notification = new Notification(title, {body: body, icon: '/tor-router.svg'});
          navigator.serviceWorker.ready.then(function(registration) {
            registration.showNotification(title, {body: body, icon: '/tor-router.svg'});
          });
        }
      });
    }
  }
}

document.addEventListener("DOMContentLoaded", function(){

  let body_element = document.querySelector("body[data-notification-title]");
  let notification_title = body_element.getAttribute('data-notification-title');
  let notification_body = body_element.getAttribute('data-notification-body');

  if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
    window.addEventListener('beforeinstallprompt', event => {
      event.preventDefault();
      var button = document.getElementById('install-button');
      button.removeAttribute('disabled');
      button.addEventListener('click', () => {
        event.prompt();
        button.setAttribute('disabled', true);
      });
    });
  }

  if(notification_title.length > 0) {
    showNotification(
      notification_title,
      notification_body
    );
  }

});

/*
** Syntax Highlight Function
**
** Copyright (C) 2023 m4dm4x1337
*/

function highlightString(str) {
  return String(str).replace(/#[^\r\n]*|"([^"\\]*|\\.)*"|'([^'\\]*|\\.)*'|\@AUTO\b|^[\t ]*\b[A-Za-z_][0-9A-Za-z_]*(?=[\=])|\b\d+\b|[\=\:\-\.\,\;]/gm, function( match ) {
    switch(match.substr(0,1)) {
      case '#': return '<span style="color:silver;">' + htmlEntities(match) + '</span>';
      case '"':
      case "'": return '<span style="color:yellow;">' + htmlEntities(match) + '</span>';
      case '@': return '<span style="color:lime;">' + htmlEntities(match) + '</span>';
      case '=':
      case ':':
      case '-':
      case ',':
      case ';': return '<span style="color:red;">' + htmlEntities(match) + '</span>';
      case '.': return '<span style="color:cyan;">' + htmlEntities(match) + '</span>';
      default:  return '<span style="color:' + ( isNaN(parseInt(match)) ? 'magenta' : 'cyan' ) + ';">' + htmlEntities(match) + '</span>';
    }
  });
}

function htmlEntities(str) {
  return String(str).replace(/&<>"'/g, function( match ) {
    switch(match) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      case "'": return '&#039;';
    }
  });
}

function initEditor() {

  let textarea_element = document.querySelector("#editing");

  let pre_element = document.createElement('pre');

  pre_element.setAttribute('id', 'highlighting');
  pre_element.setAttribute('aria-hidden', 'true');

  let code_element = document.createElement('code');

  code_element.setAttribute('id', 'highlighting-content');
  code_element.setAttribute('class', 'language-shell');

  pre_element.appendChild(code_element);

  textarea_element.parentNode.insertBefore(pre_element, textarea_element);

  textarea_element.addEventListener('input', function(){
    update(this.value); sync_scroll(this);
  });

  textarea_element.addEventListener('scroll', function(){
    sync_scroll(this);
  });

  textarea_element.addEventListener('keydown', function(){
    check_tab(this, event);
  });

  textarea_element.dispatchEvent(new CustomEvent('input'));

}

/*
** Syntax Highlight Editor
**
** Source: https://css-tricks.com/creating-an-editable-textarea-that-supports-syntax-highlighted-code/
*/

function update(text) {
  let result_element = document.querySelector("#highlighting-content");

  // Handle final newlines (see article)
  if(text[text.length-1] == "\n") {
    text += " ";
  }

  result_element.innerHTML = highlightString(text);
}

function sync_scroll(element) {
  /* Scroll result to scroll coords of event - sync with textarea */
  let result_element = document.querySelector("#highlighting");
  // Get and set x and y
  result_element.scrollTop = element.scrollTop;
  result_element.scrollLeft = element.scrollLeft;
}

function check_tab(element, event) {
  let code = element.value;
  if(event.key == "Tab") {
    /* Tab key pressed */
    event.preventDefault(); // stop normal
    let before_tab = code.slice(0, element.selectionStart); // text before tab
    let after_tab = code.slice(element.selectionEnd, element.value.length); // text after tab
    let cursor_pos = element.selectionStart + 1; // where cursor moves after tab - moving forward by 1 char to after tab
    element.value = before_tab + "\t" + after_tab; // add tab char
    // move cursor
    element.selectionStart = cursor_pos;
    element.selectionEnd = cursor_pos;
    update(element.value); // Update text to include indent
  }
}

