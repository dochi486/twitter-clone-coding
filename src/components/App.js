import AppRouter from './Router';
import { useEffect, useState } from 'react';
import { authService } from 'myBase';

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        setUserObj(user);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
      ) : (
        'Initializing'
      )}
      <footer> &copy; Dwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
