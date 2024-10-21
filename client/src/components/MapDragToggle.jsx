import { useMap } from "react-leaflet";

const MapDragToggle = ({ children }) => {
  const map = useMap();

  const disableDragging = () => {
    return map.dragging.disable();
  };

  const enableDragging = () => {
    return map.dragging.enable();
  };

  return (
    <>
      {children({
        disableDragging,
        enableDragging,
      })}
    </>
  );
};

export default MapDragToggle;
