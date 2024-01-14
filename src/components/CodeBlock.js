import Prism from 'prismjs';
import PropTypes from 'prop-types';
import React from 'react';

import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/components/prism-docker';
import 'prismjs/components/prism-git';

const LANGUAGES = {
  dockerfile: 'docker',
  dockerignore: 'git',
};

const CodeBlock = ({ code, language }) => {
  const lang = LANGUAGES[language];

  React.useEffect(() => {
    Prism.highlightAll();
  });

  return (
    <pre className="line-numbers">
      <code className={`language-${lang}`}>{code}</code>
    </pre>
  );
};

CodeBlock.propTypes = {
  code: PropTypes.string.isRequired,
  language: PropTypes.oneOf(Object.keys(LANGUAGES)),
};

export default CodeBlock;
