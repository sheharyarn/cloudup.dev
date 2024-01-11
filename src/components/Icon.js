import React     from 'react';
import PropTypes from 'prop-types';

import { FaDocker } from 'react-icons/fa';
import { AiFillFile, AiOutlineInfoCircle } from 'react-icons/ai';
import { IoIosSettings, IoIosArrowForward }  from 'react-icons/io';
import { RiBracesFill } from 'react-icons/ri';

import * as styles from './Icon.module.sass';


const ICONS = {
  chevron:    <IoIosArrowForward />,
  settings:   <IoIosSettings />,
  readme:     <AiOutlineInfoCircle />,
  dockerfile: <FaDocker />,
  file:       <AiFillFile />,
  json:       <RiBracesFill />,
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
