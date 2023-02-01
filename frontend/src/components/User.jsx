import PropTypes from "prop-types";
import { motion } from "framer-motion";
import avatar from "../assets/avatar_basic.png";

export default function User({ username, payload, setPayload }) {
  const handleClick = () => {
    setPayload({ ...payload, username });
  };
  return (
    <motion.div
      layout
      className="login__user"
      role="presentation"
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        opacity: { duration: 0.3 },
      }}
    >
      <img src={avatar} alt="avatar" className="login__avatar" />
      <p>{username}</p>
    </motion.div>
  );
}

User.propTypes = {
  username: PropTypes.string.isRequired,
  payload: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  setPayload: PropTypes.func.isRequired,
};
