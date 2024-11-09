import "./App.css";
import Circle from "./components/circle.jsx";
import { useRef, useState, useEffect } from "react";

function App() {
  const [circles, setCircles] = useState([]);
  const [selectedCircles, setSelectedCircles] = useState([]);
  const [draggingCircle, setDraggingCircle] = useState(null);
  const containerRef = useRef(null);

  // Добавление кружков
  const addCircle = () => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;

    // Размер от 5% до 20% ширины контейнера
    const size = Math.floor(
      Math.random() * (0.2 - 0.05) * containerWidth + 0.05 * containerWidth,
    );

    const x = Math.random() * (containerWidth - size);
    const y = Math.random() * (containerHeight - size);

    setCircles([...circles, { id: Date.now(), size, x, y, isSelected: false }]);
  };

  // Обработчик правого клика для выбора/снятия выделения
  const handleRightClick = (e, id) => {
    e.preventDefault(); // Предотвращаем стандартное меню

    setSelectedCircles(
      (prevSelected) =>
        prevSelected.includes(id)
          ? prevSelected.filter((circleId) => circleId !== id) // Снять выделение
          : [...prevSelected, id], // Добавить в выделенные
    );
  };

  // Обработчик начала перетаскивания
  const handleMouseDown = (e, id) => {
    if (e.button === 2) return; // Игнорируем правую кнопку мыши
    setDraggingCircle(id);
  };

  // Перемещение мыши
  const handleMouseMove = (e) => {
    if (!draggingCircle) return;

    const deltaX = e.movementX;
    const deltaY = e.movementY;

    setCircles((prevCircles) =>
      prevCircles.map((circle) =>
        circle.id === draggingCircle
          ? {
              ...circle,
              x: Math.max(
                0,
                Math.min(
                  circle.x + deltaX,
                  containerRef.current.clientWidth - circle.size,
                ),
              ),
              y: Math.max(
                0,
                Math.min(
                  circle.y + deltaY,
                  containerRef.current.clientHeight - circle.size,
                ),
              ),
            }
          : circle,
      ),
    );
  };

  // Завершение перетаскивания
  const handleMouseUp = () => {
    setDraggingCircle(null);
  };

  // Удаление выделенных кругов при нажатии Backspace или Delete
  const handleKeyDown = (e) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      if (selectedCircles.length > 0) {
        setCircles((prevCircles) =>
          prevCircles.filter((circle) => !selectedCircles.includes(circle.id)),
        );
        setSelectedCircles([]);
      }
    }
  };

  // Подключение слушателя нажатия на клавишу
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCircles]);

  return (
    <div
      className="flex flex-col items-center space-y-4 bg-gray-100 w-screen h-screen p-4"
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onContextMenu={(e) => e.preventDefault()} // убираем контекстное меню из приложения
    >
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        onClick={addCircle}
      >
        Добавить круг
      </button>
      <div
        ref={containerRef}
        className="relative w-2/3 h-2/3 bg-white rounded-lg shadow-md overflow-hidden"
      >
        {circles.map((circle) => (
          <Circle
            key={circle.id}
            id={circle.id}
            size={circle.size}
            x={circle.x}
            y={circle.y}
            isSelected={selectedCircles.includes(circle.id)}
            onToggleDrag={handleMouseDown}
            onRightClick={handleRightClick}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
