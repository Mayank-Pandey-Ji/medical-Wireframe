import React, { useEffect, useState, useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { FaSearch, FaStar } from "react-icons/fa";
import imgg from "../assets/download.png";

const categories = [
  "Plasma cell leukemia",
  "Marginal zone lymphoma",
  "Myelodysplastic syndrome",
  "Bone Marrow Aspirate",
  "Autoimmune hemolytic anemia",
  "Chronic myeloid leukemia",
  "Normal peripheral blood smear",
  "Sickle cell anemia",
  "Parasitic inclusions – Malaria",
];

const images = [{ id: 1, title: "Plasma Cell Sample" }];

export default function PlasmaGallery() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [zoomState, setZoomState] = useState({ scale: 1, positionX: 0, positionY: 0 });
  const wrapperRef = useRef(null);

  const handleZoomChange = (ref) => {
    const { scale, positionX, positionY } = ref.state;
    setZoomState({ scale, positionX, positionY });
  };

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-100 p-4 border-r">
        <h2 className="text-xl font-bold mb-4">Scopio Scan Gallery</h2>
        <p className="text-sm mb-4">Here you can pan and zoom full-field images of diverse blood samples at 100X resolution.</p>
        <ul>
          {categories.map((category, index) => (
            <li
              key={index}
              className={`p-2 cursor-pointer rounded-lg flex justify-between items-center ${selectedCategory === category ? "bg-pink-500 text-white" : "hover:bg-gray-200"}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
              <FaStar className="text-gray-500" />
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 relative">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">{selectedCategory}</h1>
          <div className="flex items-center border rounded-lg px-3 py-1 w-72">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="outline-none w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Image Viewer with Zoom & Pan */}
        <div className="relative w-full bg-gray-200 h-[500px] flex items-center justify-center border overflow-hidden">
          <TransformWrapper ref={wrapperRef} onZoomStop={handleZoomChange} onPanningStop={handleZoomChange}>
            {({ zoomIn, zoomOut, resetTransform }) => (
              <>
                <div className="absolute top-2 right-2 flex space-x-2 z-30">
                  <button className="p-2 bg-gray-700 text-white rounded" onClick={() => zoomIn(1.2)}>➕</button>
                  <button className="p-2 bg-gray-700 text-white rounded" onClick={() => zoomOut(1.2)}>➖</button>
                  <button className="p-2 bg-gray-700 text-white rounded" onClick={() => resetTransform()}>♻️</button>
                </div>
                <TransformComponent>
                  <img src={imgg} alt="Sample" className="w-full h-[500px] object-cover" />
                </TransformComponent>
              </>
            )}
          </TransformWrapper>

          {/* Minimap */}
          <div className="absolute bottom-4 right-4 w-24 h-24 bg-gray-300 border border-gray-600 overflow-hidden">
            <div className="relative w-full h-full">
              <img src={imgg} alt="Minimap" className="w-full h-full object-cover" />
              <div
                className="absolute border-2 border-red-500"
                style={{
                  left: `${Math.min(Math.max((-zoomState.positionX / zoomState.scale) * 0.1, 0), 80)}%`,
                  top: `${Math.min(Math.max((-zoomState.positionY / zoomState.scale) * 0.1, 0), 80)}%`,
                  width: `${Math.max(100 / zoomState.scale, 10)}%`,
                  height: `${Math.max(100 / zoomState.scale, 10)}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
