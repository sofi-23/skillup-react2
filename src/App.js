//Styles
import './styles/main.css';

//Hooks
import { lazy, Suspense } from 'react';

//Components
import { Login } from './components/views/auth/Login/Login.jsx';
import { SignIn }  from './components/views/auth/Register/SignIn.jsx';
import Tasks from './components/views/Tasks/Tasks.jsx';
import { Donate } from './components/views/Donate/Donate.jsx';
import Registered from '././components/views/auth/Registered/Registered.jsx';

//Libraries
import { Route, Routes, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion';

//Lazy imports
const Error404  = lazy(() => import('./components/views/Error404/Error404.jsx'));

//Components
const RequireAuth = ({ children }) => {
  if (localStorage.getItem('token')) {
    return children
  }else {
    return <Navigate to="/login" replace={true} /> //Normally a call to navigate will push a new entry into the history stack so the user can click the back button to get back to the page. If you pass replace: true to navigate then the current entry in the history stack will be replaced with the new one.
  }
}
const pageTransition = {
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
}

function App() {
  const location = useLocation();
  return (
    <>
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <RequireAuth >
              <motion.div className="page" initial="out" animate="in" exit="out" variants={pageTransition}>
                <Tasks />
              </motion.div>
            </RequireAuth>
          } />
          <Route 
            path="/login" 
            element={
              <motion.div className="page" initial="out" animate="in" exit="out" variants={pageTransition}>
                <Login />
              </motion.div>} />
          <Route 
            path="/signin" 
            element={
            <motion.div className="page" initial="out" animate="in" exit="out" variants={pageTransition}>
              <SignIn />
              </motion.div>} />
              <Route 
            path="/donate" 
            element={
            <motion.div className="page" initial="out" animate="in" exit="out" variants={pageTransition}>
              <Donate />
              </motion.div>} />
              <Route 
            path="/registered/:teamId" 
            element={
            <motion.div className="page" initial="out" animate="in" exit="out" variants={pageTransition}>
              <Registered />
              </motion.div>} />
          <Route 
            path="*" 
            element={
            <motion.div className="page" initial="out" animate="in" exit="out" variants={pageTransition}>
              <Suspense fallback={<div>Loading...</div>}>
                <Error404 />
              </Suspense>
            </motion.div>} />
        </Routes>
      </AnimatePresence>
    </>
  );

}

export default App;
