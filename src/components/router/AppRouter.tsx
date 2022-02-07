import React, { FC } from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Main from '../page/Main';
import Sub from '../page/Sub';

const AppRouter: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:word" element={<Sub />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
