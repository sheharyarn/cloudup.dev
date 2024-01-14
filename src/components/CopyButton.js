import React, { useEffect, useState } from 'react';

const CopyButton = ({ text, className }) => {
  const [hasCopied, setCopied] = useState(false);
  const label = hasCopied ? 'Copied!' : 'Copy';

  useEffect(() => {
    if (hasCopied) {
      const timeout = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timeout);
    }

    return undefined;
  }, [hasCopied]);

  const onClick = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
  };

  return (
    <button className={className} onClick={onClick}>
      {label}
    </button>
  );
};

export default CopyButton;
