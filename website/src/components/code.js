import React, { useRef, useEffect } from 'react';
import Prism from 'prismjs';

const Code = ({ children, language }) => {
  const codeRef = useRef(null);
  useEffect(() => {
    Prism.highlightElement(codeRef.current, false);
  })
  return (
    <pre style={{ display: 'block', margin: '1.5rem 0' }}>
      <code
        ref={codeRef}
        className={`language-${language}`}
      >
        {children.trim()}
      </code>
    </pre>
  );
};

export { Code };
