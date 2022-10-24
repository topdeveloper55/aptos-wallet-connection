import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import { AptosContextProvider } from '../src/context/aptosContext';

import Layout from './components/Layout';

export default function App() {
  return (
    <AptosContextProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            {/* <Route path={'/'} element={<Lend />} />
            <Route path={'/farm'} element={<Farm />} /> */}
          </Routes>
        </Layout>
      </BrowserRouter>
    </AptosContextProvider>
  );
}
