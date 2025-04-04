import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useState } from "react";

const MiniMap = ({ scale, position }) => {
  return (
    <div className="absolute top-2 right-2 w-24 h-24 border bg-gray-100 relative">
      <img
        src="https://openseadragon.github.io/example-images/highsmith/highsmith.dzi"
        alt="MiniMap"
        className="w-full h-full object-cover"
      />
      {/* ✅ Zoom Area Rectangle */}
      <div
        className="absolute border border-red-500"
        style={{
          top: position.y * scale,
          left: position.x * scale,
          width: 50 / scale,
          height: 50 / scale,
        }}
      ></div>
    </div>
  );
};

const ImageViewer = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);

  return (
    <TransformWrapper
      onZoomStop={(e) => setScale(e.state.scale)}
      onPanningStop={(e) => setPosition({ x: e.state.positionX, y: e.state.positionY })}
    >
      {({ zoomIn, zoomOut }) => (
        <>
          <div className="absolute top-2 right-2 flex space-x-2">
            <button onClick={zoomIn} className="p-2 bg-gray-700 text-white rounded">➕</button>
            <button onClick={zoomOut} className="p-2 bg-gray-700 text-white rounded">➖</button>
          </div>

          {/* ✅ Image Viewer */}
          <TransformComponent>
            <img src="https://openseadragon.github.io/example-images/highsmith/highsmith.dzi" alt="Sample" className="w-auto h-full object-contain" />
          </TransformComponent>

          {/* ✅ MiniMap */}
          <MiniMap scale={scale} position={position} />
        </>
      )}
    </TransformWrapper>
  );
};

export default ImageViewer;
