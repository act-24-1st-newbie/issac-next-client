import PropTypes from 'prop-types';
import './Dropdown.css';
export const Dropdown = ({ value, setPhoneIdentify, setIsOpen, isOpen }) => {
  const ValueClick = () => {
    setPhoneIdentify(value);
    setIsOpen(!isOpen);
  };
  return (
    <li className="DropdownComponent" onClick={ValueClick}>
      {value}
    </li>
  );
};
Dropdown.propTypes = {
  value: PropTypes.string,
  setPhoneIdentify: PropTypes.func,
  setIsOpen: PropTypes.func,
  isOpen: PropTypes.bool,
};
export default Dropdown;
