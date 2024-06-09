// NotificationListener.js
import React, {useEffect} from 'react';


import {Client} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {showInformation} from "./utilis";
import Button from "@mui/material/Button";


const NotificationListener = () => {
    const socket = new SockJS(process.env.NEXT_PUBLIC_ONLINE_WS_URI + "/ws");
    const stompClient = new Client({
        webSocketFactory: () => socket,
        onConnect: () => {
            showInformation('conncted');
            stompClient.subscribe('/topic/notification', (message) => {
                showInformation(message.body);
            });
        },
        onWebSocketError: (s) => {
            showInformation(s.toString());
        },
        onDisconnect: () => {
            showInformation('Disconnected');
        },

    });

    useEffect(() => {

        stompClient.activate();


        return () => {
            stompClient.deactivate();
        };
    }, []);
    return <Button style={{display: 'none'}} onClick={() => {
        stompClient.publish({
            destination: "/app/aaa",
            body: JSON.stringify({'name': "ayoub"})
        });

    }}>send</Button>;

};

export default NotificationListener;
