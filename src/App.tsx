import React from 'react';

import './App.scss'

import client from './client';

import useUser from './hooks/useUser';

import UserContext from './contexts/UserContext';

import SignInButton from './components/SignInButton';
import SignOutButton from './components/SignOutButton';
import UserDetails from './components/UserDetails';

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
