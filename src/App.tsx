import './App.scss'

import { SupabaseClient, createClient } from '@supabase/supabase-js';

const SupabaseProjectUrl: string = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const SupabaseAnonKey: string = import.meta.env.VITE_SUPABASE_ANON_KEY;

const sb: SupabaseClient = createClient(
  SupabaseProjectUrl,
  SupabaseAnonKey
)

const login = async () => {

  await sb.auth.signInWithOAuth({
    provider: 'google',
  })

}

function App() {

  return (
    <div className="App container py-4 px-3">

      <h1>Supaship.io</h1>

      <section id="whenSignedOut">
        <button id="signInBtn" className="btn btn-primary" onClick={(e) => login()}>
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
