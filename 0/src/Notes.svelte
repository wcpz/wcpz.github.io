<script>
  import { notesStore } from './Store.js'; //Import store
  
  let notes = []; //Array used to iterate over number of notes
  
  let data = {  // An object to store the entered values
      title: "",
      content: "",
      id: null
  };
  
  //Subscription with store for latest changes
  const unsubscribe = notesStore.subscribe(value => {notes = value});
  
  let addNote = () => {
      const newNote = {
        id: notes.length + 1,
        title: data.title,
        content: data.content
      };
      notesStore.createNote(newNote); //trigger create functionality
      data = {
          id: null,
          title: "",
          content: ""
      };
  }
  
  let deleteNote = id => {
      notesStore.delete(id);
  };
  let isEdit = false;
  let editNote = note => {
      isEdit = true;
      data = note;
  };
  let updateNote = () => {
      isEdit = !isEdit;
      notesStore.modify(data);
      data = {
        id: null,
        title: "",
        content: ""
      };
  }
  
  </script>
  <section>
    <div class="container">
      <div class="row mt-5">
        <div class="col-md-6">
          <div class="card p-2 shadow">
            <div class="card-body">
              <h5 class="card-title mb-4">Add New Note</h5>
              <form>
                <div class="form-group">
                  <label for="title">Title</label>
                  <input
                    bind:value={data.title}
                    type="text"
                    class="form-control"
                    id="text"
                    placeholder="Note Title" />
                </div>
                <div class="form-group">
                  <label for="content">Content</label>
                  <textarea
                    class="form-control"
                    id="content"
                    bind:value={data.content}
                    rows="3"
                    placeholder="Note Content" />
                </div>
                {#if isEdit === false}
                  <button type="submit" on:click|preventDefault={addNote} class="btn btn-primary">
              Add Note</button>
                  {:else}
                  <button type="submit" on:click|preventDefault={updateNote} class="btn btn-info">
                      Edit Note</button>
              {/if} 
              </form>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          {#each notes as note}
            <div class="card ">
              <div class="card-body">
                <h5 class="card-title">{note.title}</h5>
                <p class="card-text">{note.content}</p>
                <button class="btn btn-info"  on:click={editNote(note)}>Edit</button>
                <button class="btn btn-danger" on:click={deleteNote(note.id)}>Delete</button>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </section>