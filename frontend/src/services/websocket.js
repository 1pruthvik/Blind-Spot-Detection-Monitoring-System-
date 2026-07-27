let socket = null;

const messageListeners = [];
const openListeners = [];
const closeListeners = [];

export function connect() {
    if (socket && socket.readyState === WebSocket.OPEN) {
        return;
    }

    socket = new WebSocket("ws://127.0.0.1:8001/ws");

    socket.onopen = () => {
        openListeners.forEach(cb => cb());
    };

    socket.onmessage = (event) => {
        messageListeners.forEach(cb => cb(event.data));
    };

    socket.onclose = () => {
        closeListeners.forEach(cb => cb());
        socket = null;
    };

    socket.onerror = (err) => {
        console.error("WebSocket Error:", err);
    };
}

export function disconnect() {
    if (socket) {
        socket.close();
        socket = null;
    }
}

export function onMessage(callback) {
    messageListeners.push(callback);
    return () => {
        const i = messageListeners.indexOf(callback);
        if (i !== -1) messageListeners.splice(i, 1);
    };
}

export function onOpen(callback) {
    openListeners.push(callback);
    return () => {
        const i = openListeners.indexOf(callback);
        if (i !== -1) openListeners.splice(i, 1);
    };
}

export function onClose(callback) {
    closeListeners.push(callback);
    return () => {
        const i = closeListeners.indexOf(callback);
        if (i !== -1) closeListeners.splice(i, 1);
    };
}