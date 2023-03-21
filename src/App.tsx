import React from 'react';

import client from './client';

import { Thing } from './types/collections/thing';

import useUser from './hooks/useUser';
import useThings from './hooks/useThings';

import UserContext from './contexts/UserContext';
import ThingsContext from './contexts/ThingsContext';

import SignInButton from './components/SignInButton';
import SignOutButton from './components/SignOutButton';
import UserDetails from './components/UserDetails';

import ThingsTable from './components/ThingsTable';

import { makeRandomThing } from './utils';

import './App.scss'

function App() {

  const [user] = useUser(client);

  const [things, setThings] = useThings(client);

  const myThings = things.filter(thing => thing.owner === user?.id)

  const isSignedIn = React.useCallback(
    () => user !== null,
    [user]
  )

  const createThing = React.useCallback(
    async () => {

      if(!user) {
        console.error('You must be authenticated to create a new Thing!');
        return
      }

      const newPartialThing = makeRandomThing(user)

      const { data, error } = await client.from(`things`)
        .insert([newPartialThing])
        .select();

      if(!data) {
        console.error(error)
        return
      }

      const newThing = data[0] as Thing

      setThings(things => {
        return [
          ...things,
          newThing
        ]
      })

    },
    [user, things, setThings]
  )

  return (
    <div className="App container py-4 px-3">

      <h1>Supabase+React+Vite Example</h1>

      <UserContext.Provider value={user}>
        <ThingsContext.Provider value={[things, setThings]}>
          {
            isSignedIn() ?

              // Signed in
              <>
                <section id="whenSignedIn" className='py-4'>

                  <UserDetails />

                  <SignOutButton />

                </section>

                <section id="myThings" className='py-4'>

                  <h2>My Things</h2>

                  {
                    myThings.length ?
                      <ThingsTable things={myThings} user={user!}/> :
                      <p>You haven't created any Things yet!</p>
                  }

                  <button id="createThing" className="btn btn-success"
                    onClick={e => createThing()}>
                    Create a Thing
                  </button>

                </section>

              </> :

              // Signed out
              <section id="whenSignedOut" className='py-4'>

                <SignInButton />

              </section>
          }
        </ThingsContext.Provider>
      </UserContext.Provider>

      <section id="allThings" className='py-4'>

        <h2>All Things</h2>

        {
          things.length ?
            <ThingsTable things={things} /> :
            <p>Looks like no one has created a Thing yet! Maybe you could be first!!</p>
        }

      </section>

    </div>
  )

}

export default App
