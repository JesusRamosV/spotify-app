import React from "react";
import PropTypes from "prop-types";
import { Spinner } from "flowbite-react";

interface BackDropProps {
  show: boolean;
}

export const BackDrop: React.FC<BackDropProps> = ({ show }) => (
  <div
    style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 10000 }}
    className={`${
      show ? "flex" : "hidden"
    } items-center justify-center fixed inset-0 z-[10000] bg-black bg-opacity-50`}
  >
    <Spinner color="success" aria-label="Loading spinner" size="xl" />
  </div>
);

BackDrop.propTypes = {
  show: PropTypes.bool.isRequired,
};
