import React, { useState } from 'react';
import './App.css';
import { HomePage } from './Layouts/HomePage/HomePage';
import { Navbar } from './Layouts/NavbarAndFooter/Navbar';
import { Footer } from './Layouts/NavbarAndFooter/Footer';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SearchCrewPage } from './Layouts/SearchCrewPage/SearchCrewPage';
import { CrewDetailsPage } from './Layouts/CrewDetailsPage/CrewDetaisPage';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { oktaConfig } from './Lib/oktaConfig';
import { Security, LoginCallback} from '@okta/okta-react'
import LoginWidget from './Auth/LoginWidget';
import { CommentListPage } from './Layouts/CrewDetailsPage/CommentsListPage/CommentsListPage';
import { MessagesPage } from './Layouts/MessagesPage/MessagesPage';
import { AdminPage } from './Layouts/AdminPage/AdminPage';
import { RequiredAuth } from './Layouts/utils/RequiredAuth';

const oktaAuth = new OktaAuth(oktaConfig);

export const App = () => {

  const customAuthHandler = () => {
    <Navigate to={'/login'} />;
  }

  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    <Navigate to={toRelativeUrl(originalUri || '/', window.location.origin)} replace />;
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}>
      <div className='d-flex flex-column min-vh-100'>
        <Navbar />
        <div className='flex-grow-1'>
          <Routes>
            <Route path="/" element={<HomePage />} ></Route>
            <Route path="/home" element={<HomePage />}></Route>
            <Route path="/search" element={<SearchCrewPage />}></Route>
            <Route path="/details/:crewId" element={<CrewDetailsPage />}></Route>
            <Route path='/login' element={<LoginWidget config={oktaConfig} />} />
            <Route path='/login/callback' element={<LoginCallback />} />
            <Route path="/commentslist/:crewId" element={<CommentListPage />}></Route>
            <Route path="/messages" element={<RequiredAuth />}>
              <Route path='' element={<MessagesPage />} />
            </Route>
            <Route path="/admin" element={<RequiredAuth />}>
              <Route path='' element={<AdminPage />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </Security>
  );
}

export default App;
