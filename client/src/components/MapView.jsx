import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MapContainer,
  TileLayer,
  Polygon,
  useMapEvents,
  useMap,
  LayersControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import SaveLandModal from "./Modals/SaveLandModal";
import LandDetailsModal from "./Modals/LandDetailsModal";
import SearchBox from "./SearchBox";
import ToolBox from "./ToolBox";
import SaveMapCenterButton from "./SaveMapCenterButton";
import { landAvailabilityStatusColor } from "../utils/helper";
import FilterPanel from "./FilterPanel";
import { toast } from "react-toastify";
import MapDragToggle from "./MapDragToggle";

const { BaseLayer } = LayersControl;

const MapCenterUpdater = ({
  mapCenter,
  mapZoom,
  setCurrentMapCoordinates,
  setCurrentMapZoom,
}) => {
  const map = useMap();
  useEffect(() => {
    if (mapCenter) {
      map.setView(mapCenter, mapZoom, { animate: true });
    }
  }, [map, mapCenter, mapZoom]);

  // Update currentMapCoordinates whenever the map moves
  useEffect(() => {
    const handleMoveEnd = () => {
      const center = map.getCenter();
      const zoom = map.getZoom();
      setCurrentMapCoordinates([center.lat, center.lng]);
      setCurrentMapZoom(zoom);
    };
    map.on("moveend", handleMoveEnd);
    return () => {
      map.off("moveend", handleMoveEnd); // Clean up the event listener
    };
  }, [map, setCurrentMapCoordinates, setCurrentMapZoom]);

  return null;
};

const MapView = () => {
  const [lands, setLands] = useState([]);
  const [selectedLand, setSelectedLand] = useState(null);
  const [clickedPositions, setClickedPositions] = useState([]);
  const [isCreatingLand, setIsCreatingLand] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [toolboxOpen, setToolboxOpen] = useState(false);

  // Default map center
  const [mapCenter, setMapCenter] = useState([23.843898583121252, 90.50869166851045]);
  const [currentMapCoordinates, setCurrentMapCoordinates] = useState(mapCenter);

  // Default map zoom
  const [mapZoom, setMapZoom] = useState(18);
  const [currentMapZoom, setCurrentMapZoom] = useState(mapZoom);

  // Set the initial center and zoom from local storage, if available;
  useEffect(() => {
    const websiteData = JSON.parse(localStorage.getItem("landVistaData")) || {};
    const savedMapCenter = websiteData.map_center;
    const savedMapZoom = websiteData.map_zoom;

    if (savedMapCenter && savedMapZoom) {
      setMapCenter(savedMapCenter);
      setMapZoom(savedMapZoom);
    }
  }, []);

  const [filter, setFilter] = useState({
    type: [],
    availabilityStatus: [],
    ownershipType: [],
    areaRange: 1000, // Default range
  });
  const [appliedFilter, setAppliedFilter] = useState(filter);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/lands`,
        {
        params: { ...appliedFilter, center: currentMapCoordinates },
      })
      .then((response) => {
        setLands(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the lands!", error);
      });
  }, [appliedFilter, currentMapCoordinates]);

  const handleApplyFilter = (newFilter) => {
    setAppliedFilter(newFilter);
  };

  const handleClearFilter = () => {
    setAppliedFilter();
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
    formData.append("coordinates", JSON.stringify(clickedPositions));
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/lands`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        setLands([...lands, response.data]);
        setShowSaveModal(false);
        setClickedPositions([]); // Reset clicked positions
        setToolboxOpen(false);
        setIsCreatingLand(false);
        toast.success("Location mark saved.");
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
    }, [map]);
    return null;
  };

  return (
    <>
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        style={{ height: "95vh", width: "100%" }}
      >
        <MapDragToggle>
          {({ disableDragging, enableDragging }) => (
            <div // Wrapping FilterPanel in a div
              onMouseOver={() => {
                disableDragging();
              }}
              onMouseOut={() => {
                enableDragging();
              }}
              style={{ display: "inline-block" }} // Ensure it registers mouse events
            >
              <FilterPanel
                filter={filter}
                setFilter={setFilter}
                onApplyFilter={handleApplyFilter}
                onClearFilter={handleClearFilter}
              />
            </div>
          )}
        </MapDragToggle>

        <LayersControl position="bottomright">
          <BaseLayer checked name="Street View">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              maxZoom={19}
              minZoom={3}
            />
          </BaseLayer>
          <BaseLayer name="Satellite View">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              maxZoom={19}
              minZoom={3}
            />
          </BaseLayer>
          <BaseLayer name="Terrain View">
            <TileLayer
              url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
              maxZoom={17}
              minZoom={3}
            />
          </BaseLayer>
        <BaseLayer name="ESRI Street View">
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
            maxZoom={19}
            minZoom={3}
          />
        </BaseLayer>
        </LayersControl>

        {Array.isArray(lands) &&
          lands.length > 0 &&
          lands.map((land) => {
            // Check if coordinates exist and are an array
            if (land.coordinates && Array.isArray(land.coordinates)) {
              return (
                <Polygon
                  key={land._id}
                  pathOptions={landAvailabilityStatusColor(land.availabilityStatus)}
                  positions={land.coordinates}
                  eventHandlers={{ click: () => setSelectedLand(land) }}
                />
              );
            }
            // Return null if coordinates are not valid
            return null;
          })}

        {clickedPositions.length > 0 && (
          <Polygon
            pathOptions={{ color: "green" }}
            positions={clickedPositions}
          />
        )}

        <LocationMarker />
        <MapCenterUpdater
          mapCenter={mapCenter}
          mapZoom={mapZoom}
          setCurrentMapCoordinates={setCurrentMapCoordinates}
          setCurrentMapZoom={setCurrentMapZoom}
        />
        <MapCursorUpdater />

        <SearchBox onSearchResultClick={handleSearchResultClick} />
        <SaveMapCenterButton
          mapCenter={currentMapCoordinates}
          currentMapZoom={currentMapZoom}
        />
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
