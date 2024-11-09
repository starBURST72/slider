import PropTypes from "prop-types";

const Circle = ({ id, size, x, y, onToggleDrag, onRightClick, isSelected }) => {
  return (
    <div
      key={id}
      className={`absolute rounded-full cursor-pointer hover:shadow-lg hover:bg-blue-300
        ${isSelected ? "border-2 border-black bg-blue-500" : "bg-blue-400"}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${x}px`,
        top: `${y}px`,
      }}
      onMouseDown={(e) => onToggleDrag(e, id)}
      onContextMenu={(e) => onRightClick(e, id)} // Правый клик мыши
    ></div>
  );
};

Circle.propTypes = {
  id: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  onToggleDrag: PropTypes.func.isRequired,
  onRightClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
};
export default Circle;
