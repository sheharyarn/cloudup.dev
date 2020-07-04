import React     from 'react';
import PropTypes from 'prop-types';

import { FaDocker }       from 'react-icons/fa';
import { AiFillFile }     from 'react-icons/ai';
import { IoIosSettings }  from 'react-icons/io';

import styles from './Icon.module.sass';



const ICONS = {
  settings:   <IoIosSettings />,
  dockerfile: <FaDocker />,
  file:       <AiFillFile />,
};


const Icon = ({ className, type }) => (
  <span className={`${styles.icon} ${className}`}>
    { ICONS[type] || ICONS.file }
  </span>
);


Icon.propTypes = {
  type: PropTypes.string.isRequired,
};


export default Icon;
