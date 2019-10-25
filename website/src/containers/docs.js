import React from 'react';

import { Layout, SEO, DocsNav } from '../components';

import './docs.css';

const Docs = ({ title, children }) => {
  return (
    <Layout>
      <SEO
        title={`${title} - react-modern-calendar-datepicker`}
        keywords={[title]}
      />
      <div className="Docs">
        <DocsNav />
        <div className="Docs__content">
          <h1 className="Docs__title">{title}</h1>
          {children}
        </div>
      </div>
    </Layout>
  )
};

export default Docs;
