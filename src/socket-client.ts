import { Manager, Socket } from 'socket.io-client';

let socket: Socket;

export const connectToServer = ( jwtToken: string ) => {

    console.log({ jwtToken });
    const manager = new Manager( 'http://localhost:3000/socket.io/socker.io.js', {
        extraHeaders: {
            hola: 'mundo',
            Authentication: jwtToken,
        }
    });

    socket?.removeAllListeners();
    socket = manager.socket( '/' );

    addListeners();


}

const addListeners = () => {

    const serverStatusLabel = document.querySelector('#server-status')!;
    const clientsConectedList = document.querySelector('#clients-ul')!;


    const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;
    const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
    const messageUl = document.querySelector<HTMLUListElement>('#message-ul')!;
    

    // Escuchar los eventos que vienen del servidor
    socket.on('connect', () => {
        serverStatusLabel.innerHTML = 'Conectado';
    });

    socket.on('disconnect', () => {
        serverStatusLabel.innerHTML = 'Desconectado';
    });

    socket.on( 'clients-updated', ( clients: string[] ) => {
        const list: string[] = [];
        
        clients.forEach(client => {
            list.push(`<li>${ client }</li>`);
        });
        
        clientsConectedList.innerHTML = list.join(' ');            
    });

    messageForm.addEventListener( 'submit', (event) => {
        event.preventDefault();

        if ( messageInput.value.trim().length <= 0 ) return;

        socket.emit('message-from-client', { 
            id: 'yo!!',
            message: messageInput.value
        });

        messageInput.value = '';
        
    });

    socket.on('message-from-server', ( payload: { fullName: string, message: string }) => {

        const newMessage = `
            <li>
                <strong>${ payload.fullName }</strong>
                <span>${ payload.message }</span>
            </li>
        `;

        const li = document.createElement('li');
        li.innerHTML = newMessage;
        messageUl.append( li );

    })
}