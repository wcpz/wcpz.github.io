import { writable } from 'svelte/store';

const store = () => {
    const state = []
    const {subscribe, set, update} = writable(state);
    const methods = {
        createNote(data) {
            console.log("data: ", data);
            update(state => {
                state = state.concat(data);
                console.log("store data: ",state);
                return state;
            });
        },
        modify() {
             update(state => {
              console.log('state in store: ',state);
              return state;
             });
        },
        delete(id) {
            console.log(id);
            update(state => state.filter(state => state.id != id))
        }
    }

    return {
        subscribe,
        set,
        update,
        ...methods
    }
}
export const notesStore = store();
