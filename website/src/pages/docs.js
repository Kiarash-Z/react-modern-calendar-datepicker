import React from 'react';

import { Layout, SEO, DocsNav } from '../components';

import './docs.css';

const Docs = () => {
  return (
    <Layout style={{ padding: '0 5rem'}}>
      <SEO title="Docs" />
      <div className="Docs">
        <DocsNav />
      </div>
    </Layout>
  )
};

export default Docs;
