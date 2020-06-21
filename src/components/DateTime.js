import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';


const PARSE_STRING = 'YYYY-MM-DD HH:mm:ss';
export const parse = (date) => moment.utc(date, PARSE_STRING);


const FORMATS = {
  shortest: `MMM DD`,
  short:    `MMM DD 'YY`,
  long:     `MMMM DD, YYYY`,
};

const propTypes = {
  date: PropTypes.string.isRequired,
  format: PropTypes.oneOf(Object.keys(FORMATS)),
};


const DateTime = ({ format, date }) => {
  const formatter = FORMATS[format];
  const parsed = parse(date);

  if (!parsed.isValid())
    throw new Error(`Invalid date: ${date}`);

  return (
    <time dateTime={parsed}>
      {parsed.format(formatter)}
    </time>
  );
};


DateTime.propTypes = propTypes;

export default DateTime;
