// Import commands.js
import './commands';

// Hide fetch/XHR requests in command log
const app = window.top;
if (app && !app.document.head.querySelector('[data-hide-command-log-request]')) {
  const style = app.document.createElement('style');
  style.innerHTML = '.command-name-request, .command-name-xhr { display: none }\\n';
  style.setAttribute('data-hide-command-log-request', '');
  app.document.head.appendChild(style);
}