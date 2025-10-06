import React from 'react';
import './App.css';
import Post from './Post';
import Header from './Header';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import IndexPage from './Pages/IndexPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import CreatePostPage from './Pages/CreatePostPage';
import { UserContextProvider } from './UserContext';
import PostPage from './Pages/PostPage';
import EditPostPage from './Pages/EditPostPage';

function App() {
  return (
  <UserContextProvider>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={
            <IndexPage />
        } />
        <Route path='/login' element={
          <LoginPage />
        } />
        <Route path='/register' element={
          <RegisterPage />
        } />
        <Route path='/create' element={
          <CreatePostPage />
        } />
        <Route path='/post/:id' element={
          <PostPage />
        } />
        <Route path='/edit/:id' element={
          <EditPostPage />
        } />
      </Route>
    </Routes>
  </UserContextProvider>
  );
}

export default App;

