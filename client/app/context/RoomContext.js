import React, { createContext } from 'react';
import { roomCreate } from '../api/RoomApi';
import { Alert } from 'react-native';

export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {

    const createRoom = async ({ data }) => {
        const res = await roomCreate({ data: data });

        if (res.status === 200) {
            Alert.alert('Room created successfully');
        } else {
            Alert.alert('Failed to create room');
        }
    };

    const joinRoom = async ({ data }) => {
        const res = await roomJoin({ data: data });

        if (res.status === 200) {
            Alert.alert('Room joined successfully');
        } else {
            Alert.alert('Failed to join room');
        }
    };

    const leaveRoom = async ({ data }) => {
        const res = await roomLeave({ data: data });

        if (res.status === 200) {
            Alert.alert('Room left successfully');
        } else {
            Alert.alert('Failed to leave room');
        }
    };

    const startGame = async ({ data }) => {
        const res = await gameStart({ data: data });

        if (res.status === 200) {
            Alert.alert('Game started successfully');
        } else {
            Alert.alert('Failed to start game');
        }
    };

    const endGame = async ({ data }) => {
        const res = await gameEnd({ data: data });

        if (res.status === 200) {
            Alert.alert('Game ended successfully');
        } else {
            Alert.alert('Failed to end game');
        }
    };

    const getRoom = async ({ data }) => {
        const res = await roomGet({ data: data });

        if (res.status === 200) {
            Alert.alert('Room retrieved successfully');
        } else {
            Alert.alert('Failed to retrieve room');
        }
    };

    const getRooms = async ({ data }) => {
        const res = await roomsGet({ data: data });

        if (res.status === 200) {
            Alert.alert('Rooms retrieved successfully');
        } else {
            Alert.alert('Failed to retrieve rooms');
        }
    };

    const getRoomActiveGames = async ({ data }) => {
        const res = await roomActiveGamesGet({ data: data });

        if (res.status === 200) {
            Alert.alert('Room active games retrieved successfully');
        }
        else {
            Alert.alert('Failed to retrieve room active games');
        }
    };

    const getPlayers = async ({ data }) => {
        const res = await playersGet({ data: data });

        if (res.status === 200) {
            Alert.alert('Players retrieved successfully');
        } else {
            Alert.alert('Failed to retrieve players');
        }
    };

    const getGames = async ({ data }) => {
        const res = await gamesGet({ data: data });

        if (res.status === 200) {
            Alert.alert('Games retrieved successfully');
        } else {
            Alert.alert('Failed to retrieve games');
        }
    };

    const getGame = async ({ data }) => {
        const res = await gameGet({ data: data });

        if (res.status === 200) {
            Alert.alert('Game retrieved successfully');
        } else {
            Alert.alert('Failed to retrieve game');
        }
    }

    const getGamePlayers = async ({ data }) => {
        const res = await gamePlayersGet({ data: data });

        if (res.status === 200) {
            Alert.alert('Game players retrieved successfully');
        } else {
            Alert.alert('Failed to retrieve game players');
        }
    };

    const getGamePlayer = async ({ data }) => {
        const res = await gamePlayerGet({ data: data });

        if (res.status === 200) {
            Alert.alert('Game player retrieved successfully');
        } else {
            Alert.alert('Failed to retrieve game player');
        }
    };

    return (
        <RoomContext.Provider
            value={{
                createRoom,
            }}>
            {children}
        </RoomContext.Provider>
    );
};