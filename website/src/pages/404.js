import React from 'react';

import { Layout, SEO } from '../components';

import './404.css';

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <div className="NotFound">
      <h1 className="NotFound__title">Ooooops...</h1>
      <p className="NotFound__description">The page you&#39;re requesting not found.</p>
    </div>
  </Layout>
);

export default NotFoundPage;
