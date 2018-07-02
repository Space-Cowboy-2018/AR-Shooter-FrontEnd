const UPDATE_CURRENT_ROOM = 'UPDATE_CURRENT_ROOM';

export const updateCurrentRoom = (currentRoom) => ({type: UPDATE_CURRENT_ROOM, currentRoom});

const reducer = (state = [], action) => {
    switch (action.type) {
        case UPDATE_CURRENT_ROOM:
            return action.currentRoom;
        default:
            return state;
    }
}

export default reducer;
