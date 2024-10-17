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
import FilterPanel from './FilterPanel';

const MapCenterUpdater = ({ mapCenter }) => {
  const map = useMap();
  useEffect(() => {
    if (mapCenter) {
      map.setView(mapCenter, map.getZoom(), { animate: true });
    }
  }, [map, mapCenter]);
  return null;
};

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
  const [filter, setFilter] = useState({
    type: [],
    availabilityStatus: [],
    ownershipType: [],
    areaRange: 500, // Default range
  });
  const [appliedFilter, setAppliedFilter] = useState(filter);

  useEffect(() => {
    axios
      .get("/api/lands", { params: appliedFilter })
      .then((response) => {
        setLands(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the lands!", error);
      });
  }, [appliedFilter]);

  const handleApplyFilter = (newFilter) => {
    setAppliedFilter(newFilter); // Update filter state and trigger the API call
  };

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
    setClickedPositions([]); // Reset clicked positions
    setToolboxOpen(false);
    setShowSaveModal(false);
    setIsCreatingLand(false);
  };

  const handleLandCreationRevert = () => {
    const sliced = clickedPositions.slice(0, -1);
    setClickedPositions(sliced);
  };

  const handleLandCreationSave = (formData) => {
    console.log("formData:", formData);

    // Append the coordinates array as a JSON string to FormData
    formData.append("coordinates", JSON.stringify(clickedPositions));

    // Log the formData to verify that coordinates are correctly appended
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    axios
      .post("/api/lands", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setLands([...lands, response.data]);
        setShowSaveModal(false);
        setClickedPositions([]); // Reset clicked positions
        setToolboxOpen(false);
        setIsCreatingLand(false);
      })
      .catch((error) => {
        console.error("Error saving land", error);
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

  // Map cursor change on land creation mode
  const MapCursorUpdater = () => {
    const map = useMap();
    useEffect(() => {
      if (isCreatingLand) {
        map.getContainer().style.cursor = "default";
      } else {
        map.getContainer().style.cursor = "";
      }
    }, [map, isCreatingLand]);
    return null;
  };

  return (
    <>
      <MapContainer
        center={mapCenter}
        zoom={18}
        style={{ height: "95vh", width: "100%" }}
      >
        <FilterPanel filter={filter} setFilter={setFilter} onApplyFilter={handleApplyFilter} />
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
        <MapCursorUpdater />

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
        onClose={handleLandCreationCancel}
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
