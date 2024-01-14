import React from 'react';
import PropTypes from 'prop-types';

const ExternalLink = ({ url, label, children }) => {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" aria-label={label}>
      {children}
    </a>
  );
};

ExternalLink.propTypes = {
  children: PropTypes.node.isRequired,
  url: PropTypes.string.isRequired,
  label: PropTypes.string,
};

ExternalLink.defaultProps = {
  label: null,
};

export default ExternalLink;
