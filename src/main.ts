import { connectToServer } from './socket-client'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h3>WebSocket - client</h3>

    <input id="jwt-token" placeholder="Json Web Token" />
    <button id="btn-connect">Conectar</button>

    <br />
    <span id="server-status">offline</span>

    
    <ul id="clients-ul"></ul>

    <form id="message-form">
      <input placeholder="mensaje" id="message-input" />
    </form>

    <h3>Mensajes</h3>

    <ul id="message-ul"></ul>

  </div>
`

//setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

// connectToServer();

const jwtToken = document.querySelector<HTMLInputElement>('#jwt-token')!;
const btnConnect = document.querySelector<HTMLButtonElement>('#btn-connect')!;

btnConnect.addEventListener( 'click', () => {

  if ( jwtToken.value.trim().length <= 0 ) return;

  connectToServer( jwtToken.value.trim() );
})

