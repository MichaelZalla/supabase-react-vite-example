import './App.scss'

import { SupabaseClient, createClient } from '@supabase/supabase-js';

const sb: SupabaseClient = createClient(
  `https://jwfqaqhtkbqzafkhyygk.supabase.com`,
  `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3ZnFhcWh0a2JxemFma2h5eWdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzkzNjMxNzUsImV4cCI6MTk5NDkzOTE3NX0.xITh6qh7KE7sP9wz1xYWQ5UsTIOtm9uvxpvpJ_A0Sc8`
)

function App() {

  return (
    <div className="App container py-4 px-3">

      <h1>Supaship.io</h1>

      <section id="whenSignedOut">
        <button id="signInBtn" className="btn btn-primary">
          Sign In with Google
        </button>
      </section>

      <section id="whenSignedOut" hidden={true}>

        <div id="userDetails"></div>

        <button id="signOutBtn" className="btn btn-primary">
          Sign Out
        </button>

      </section>

      <section id="myThings" hidden={true}>

        <h2>My Things</h2>

        <div id="myThingsList">

        </div>

        <button id="createThing" className="btn btn-success">
          Create a Thing
        </button>

      </section>

      <section id="allThings">

        <h2>All Things</h2>

        <div id="allThingsList"></div>

      </section>

    </div>
  )

}

export default App
