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

      client.auth.onAuthStateChange((event, session) => {

        switch(event) {

          case `SIGNED_OUT`:
            setUser(null)
            break;

          case `USER_UPDATED`:
            setUser(session ? session.user : null)
            break;

          default:
            // Do nothing
            break;

        }

      })

    },
    [client]
  )

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

  return [user, setUser] as const

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

  const logout = React.useCallback(
    async () => {

      const { error } = await sb.auth.signOut()

      if(error) {
        console.error(error)
      }

    },
    []
  )

  return (
    <button id="signOutBtn" className="btn btn-primary" onClick={(e) => logout()}>
      Sign Out
    </button>
  )

}

const UserContext = React.createContext<User|null>(null)

const UserDetails = () => {

  const user = React.useContext<User|null>(UserContext);

  if(!user) {
    return <></>
  }

  return (
    <div id="userDetails">
      <h3>Hi, {user.user_metadata.full_name}</h3>
      <img src={user.user_metadata.avatar_url} alt="User avatar" />
      <p>UID: {user.id}</p>
    </div>
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

      <UserContext.Provider value={user}>
        {
          isSignedIn() ?

            // Signed in
            <>
              <section id="whenSignedIn" className='py-4'>

                <UserDetails />

                <SignOutButton />

              </section>

              <section id="myThings" className='py-4' hidden={true}>

                <h2>My Things</h2>

                <div id="myThingsList">

                </div>

                <button id="createThing" className="btn btn-success">
                  Create a Thing
                </button>

              </section>

            </> :

            // Signed out
            <section id="whenSignedOut" className='py-4'>

              <SignInButton />

            </section>
        }
      </UserContext.Provider>

      <section id="allThings" className='py-4'>

        <h2>All Things</h2>

        <div id="allThingsList"></div>

      </section>

    </div>
  )

}

export default App
