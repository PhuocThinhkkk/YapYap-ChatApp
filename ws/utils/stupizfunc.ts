
export function isRoomFriend(room: string){
    for (let i = 0; i < room.length; i++) {
        if (room[i] == "-"){
            return true
        }
    }
    return false
}
