import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MapContainer,
  TileLayer,
  Polygon,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import SaveLandModal from "./Modals/SaveLandModal";
import LandDetailsModal from "./Modals/LandDetailsModal";
import SearchBox from "./SearchBox";
import ToolBox from "./ToolBox";
import { landTypeColor } from "../utils/helper";

const MapView = () => {
  const [lands, setLands] = useState([]);
  const [selectedLand, setSelectedLand] = useState(null);
  const [clickedPositions, setClickedPositions] = useState([]);
  const [isCreatingLand, setIsCreatingLand] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [toolboxOpen, setToolboxOpen] = useState(false);
  const [mapCenter, setMapCenter] = useState([
    22.94275737438829, 89.18402516392086,
  ]);

  useEffect(() => {
    axios
      .get("/api/lands")
      .then((response) => {
        setLands(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the lands!", error);
      });
  }, []);

  // Search
  const handleSearchResultClick = (location) => {
    setMapCenter([location.y, location.x]);
  };

  // ToolBox
  const handleStartLandCreation = () => {
    setIsCreatingLand(true);
    setClickedPositions([]);
    setToolboxOpen(true);
  };

  const handleLandCreationCancel = () => {
    setClickedPositions([]);
    setToolboxOpen(false);
  };

  const handleLandCreationRevert = () => {
    const sliced = clickedPositions.slice(0, -1);
    setClickedPositions(sliced);
  };

  // const handleLandCreationSave = (newLandData) => {
  //   const landData = { coordinates: clickedPositions, ...newLandData };
  //   axios
  //     .post("/api/lands", landData)
  //     .then((response) => {
  //       setLands([...lands, response.data]);
  //       setShowSaveModal(false);
  //       setClickedPositions([]);
  //       setToolboxOpen(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error saving land", error);
  //     });
  // };

  const handleLandCreationSave = (formData) => {
    console.log('formData:', formData);
  
    // Append the coordinates array as a JSON string to FormData
    formData.append('coordinates', JSON.stringify(clickedPositions));
  
    // Log the formData to verify that coordinates are correctly appended
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
  
    axios.post('/api/lands', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      setLands([...lands, response.data]);
      setShowSaveModal(false);
      setClickedPositions([]); // Reset clicked positions
      setToolboxOpen(false);
    })
    .catch(error => {
      console.error('Error saving land', error);
    });
  };
  

  // LocationMarker
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const clickedElement = e?.originalEvent?.srcElement?.tagName;
        if (clickedElement === "svg" || clickedElement === "path") {
          return;
        }
        if (isCreatingLand) {
          const { lat, lng } = e.latlng;
          setClickedPositions([...clickedPositions, [lat, lng]]);
        }
      },
    });
    return null;
  };

  // Location updater based on search result click
  const MapCenterUpdater = ({ mapCenter }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(mapCenter, map.getZoom(), { animate: true });
    }, [map, mapCenter]);
    return null;
  };

  return (
    <>
      <MapContainer
        center={mapCenter}
        zoom={18}
        style={{ height: "95vh", width: "100%" }}
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          maxZoom={19}
          minZoom={3}
        />

        {lands.map((land) => (
          <Polygon
            key={land._id}
            pathOptions={landTypeColor(land.type)}
            positions={land.coordinates}
            eventHandlers={{ click: () => setSelectedLand(land) }}
          />
        ))}

        {clickedPositions.length > 0 && (
          <Polygon
            pathOptions={{ color: "green" }}
            positions={clickedPositions}
          />
        )}

        <LocationMarker />
        <MapCenterUpdater mapCenter={mapCenter} />

        <SearchBox onSearchResultClick={handleSearchResultClick} />
        <ToolBox
          toolboxOpen={toolboxOpen}
          clickedPositions={clickedPositions}
          handleRevert={handleLandCreationRevert}
          setShowSaveModal={setShowSaveModal}
          handleCancel={handleLandCreationCancel}
          handleStartLandCreation={handleStartLandCreation}
        />
      </MapContainer>

      <SaveLandModal
        open={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        handleSaveLand={handleLandCreationSave}
      />
      <LandDetailsModal
        open={!!selectedLand}
        onClose={() => setSelectedLand(null)}
        land={selectedLand}
      />
    </>
  );
};

export default MapView;
