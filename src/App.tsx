import React from 'react';

import { User } from '@supabase/supabase-js';

import './App.scss'

import client from './client';

import useUser from './hooks/useUser';

const SignInButton = () => {

  const login = React.useCallback(
    async () => {

      await client.auth.signInWithOAuth({
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

      const { error } = await client.auth.signOut()

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

  const [user] = useUser(client);

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
