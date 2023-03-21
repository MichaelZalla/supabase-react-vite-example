import React from 'react';

import { SupabaseClient, User, createClient } from '@supabase/supabase-js';

import './App.scss'

const SupabaseProjectUrl: string = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const SupabaseAnonKey: string = import.meta.env.VITE_SUPABASE_ANON_KEY;

const sb: SupabaseClient = createClient(
  SupabaseProjectUrl,
  SupabaseAnonKey
)

const useUser = (
  client: SupabaseClient) =>
{

  const [user, setUser] = React.useState<User|null>(null)

  React.useEffect(
    () => {

      const fetchUser = async () => {
        return await sb.auth.getUser();
      }

      fetchUser()
        .then(res => {

          const {
            data: {
              user
            },
            error,
          } = res

          if(
            error ||
            !user
          )
          {
            setUser(null)

            return
          }

          setUser(user)

        })
        .catch(e => {

          console.error(e)

          setUser(null)

        })

    },
    [client]
  );

  return [user, setUser]

}

const SignInButton = () => {

  const login = React.useCallback(
    async () => {

      await sb.auth.signInWithOAuth({
        provider: 'google',
      })

    },
    []
  )

  return (
    <button id="signInBtn" className="btn btn-primary" onClick={(e) => login()}>
      Sign In with Google
    </button>
  )

}

const SignOutButton = () => {

  return (
    <button id="signOutBtn" className="btn btn-primary">
      Sign Out
    </button>
  )

}

function App() {

  const [user] = useUser(sb);

  const isSignedIn = React.useCallback(
    () => {
      return user !== null
    },
    [user]
  )

  return (
    <div className="App container py-4 px-3">

      <h1>Supaship.io</h1>

      {
        isSignedIn() ?

          // Signed in
          <>
            <section id="whenSignedIn">

              <div id="userDetails"></div>

              <SignOutButton />

            </section>

            <section id="myThings" hidden={true}>

              <h2>My Things</h2>

              <div id="myThingsList">

              </div>

              <button id="createThing" className="btn btn-success">
                Create a Thing
              </button>

            </section>

          </> :

          // Signed out
          <section id="whenSignedOut">
            <SignInButton />
          </section>
      }

      <section id="allThings">

        <h2>All Things</h2>

        <div id="allThingsList"></div>

      </section>

    </div>
  )

}

export default App
