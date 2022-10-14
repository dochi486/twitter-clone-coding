import AppRouter from './Router';
import { useEffect, useState } from 'react';
import { authService } from 'myBase';

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: authService.currentUser.displayName
            ? authService.currentUser.displayName
            : 'Anonymous',
          uid: authService.currentUser.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: authService.currentUser.displayName
        ? authService.currentUser.displayName
        : 'Anonymous',
      uid: authService.currentUser.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };

  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        'Initializing'
      )}
      <footer> &copy; Dwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
