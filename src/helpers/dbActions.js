import db from '@/db'
import { ref,push, set, onValue } from 'firebase/database'

const dbRef =  ref (db, 'messages');

const writeMesage = ( message = null ) => {

    if ( message === null || Object.is(message, {})) return;

    const newPostRef = push(dbRef);

    set(  newPostRef, message )
    .catch(console.error)
    
}

export const readMessages = ( state ) => {
    
    

    onValue(dbRef, snapshot => {
        let messages = []

        snapshot.forEach( snap => {
            const key = snap.key;
            const data = snap.val();

            messages.push({
                id: key,
                username: data.username,
                content: data.content
            })
        })
        
     state.messages = messages

    }, {
        onlyOnce:false
    })


};


export default writeMesage;

