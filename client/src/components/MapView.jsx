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
import CircularProgress from "@mui/material/CircularProgress";
import "leaflet/dist/leaflet.css";
import "leaflet.gridlayer.googlemutant";
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
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [selectedLand, setSelectedLand] = useState(null);
  const [clickedPositions, setClickedPositions] = useState([]);
  const [isCreatingLand, setIsCreatingLand] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [toolboxOpen, setToolboxOpen] = useState(false);

  // Default map center
  const [mapCenter, setMapCenter] = useState([
    23.843898583121252, 90.50869166851045,
  ]);
  const [currentMapCoordinates, setCurrentMapCoordinates] = useState(mapCenter);

  // Default map zoom
  const [mapZoom, setMapZoom] = useState(18);
  const [currentMapZoom, setCurrentMapZoom] = useState(mapZoom);

  const [activeBaseLayer, setActiveBaseLayer] = useState();

    // Ask for user's location on initial render and update the map center if allowed
    // useEffect(() => {
    //   const websiteData = JSON.parse(localStorage.getItem("landVistaData")) || {};
    //   const savedMapCenter = websiteData.map_center;
    //   const getUserLocation = () => {
    //     if (!savedMapCenter && navigator.geolocation) {
    //       navigator.geolocation.getCurrentPosition(
    //         (position) => {
    //           const { latitude, longitude } = position.coords;
    //           setMapCenter([latitude, longitude]); // Set the map center to the user's current location
    //           setCurrentMapCoordinates([latitude, longitude]);
    //         },
    //         (error) => {
    //           console.error("Error getting user's location:", error);
    //           // Handle the error if the user denies location access or another issue occurs
    //         }
    //       );
    //     }
    //   };
    //   getUserLocation();
    // }, []);

  // Set the initial center, zoom and layer from local storage, if available;
  useEffect(() => {
    const websiteData = JSON.parse(localStorage.getItem("landVistaData")) || {};
    const savedMapCenter = websiteData.map_center;
    const savedMapZoom = websiteData.map_zoom;
    const savedBaseLayer = websiteData.activeBaseLayer;

    if (savedMapCenter && savedMapZoom) {
      setMapCenter(savedMapCenter);
      setMapZoom(savedMapZoom);
    }
    if (savedBaseLayer) {
      setActiveBaseLayer(savedBaseLayer);
    } else {
      setActiveBaseLayer("Google Roads");
    }
  }, []);

  const handleBaseLayerChange = (layerName) => {
    setActiveBaseLayer(layerName);
  };

  const [filter, setFilter] = useState({
    type: [],
    availabilityStatus: [],
    ownershipType: [],
    areaRange: 1000, // Default range
  });
  const [appliedFilter, setAppliedFilter] = useState(filter);

  useEffect(() => {
    if (isInitialLoading) setIsInitialLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/lands`, {
        params: { ...appliedFilter, center: currentMapCoordinates },
      })
      .then(async (response) => {
        setLands(response.data);
        setIsInitialLoading(false);
      })
      .catch((error) => {
        setIsInitialLoading(false);
        console.error("There was an error fetching the lands!", error);
      });
  }, [appliedFilter, currentMapCoordinates, isInitialLoading]);

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
      .post(`${process.env.REACT_APP_API_BASE_URL}/lands`, formData, {
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
      {isInitialLoading && (
        <div className="loaderOverlayStyle">
          <CircularProgress color="primary" size={80} thickness={5} />
        </div>
      )}
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
          <BaseLayer
            checked={activeBaseLayer === "Google Roads"}
            name="Google Roads"
          >
            <TileLayer
              url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
              name="Google Roads"
              eventHandlers={{
                add: (e) => handleBaseLayerChange(e.target?.options?.name),
              }}
              subdomains={["mt0", "mt1", "mt2", "mt3"]}
              maxZoom={19}
              attribution='&copy; <a href="https://www.google.com/intl/en/help/terms_maps.html">Google</a>'
            />
          </BaseLayer>

          {/* Google Maps Satellite */}
          <BaseLayer
            checked={activeBaseLayer === "Google Satellite"}
            name="Google Satellite"
          >
            <TileLayer
              url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
              name="Google Satellite"
              eventHandlers={{
                add: (e) => handleBaseLayerChange(e.target?.options?.name),
              }}
              subdomains={["mt0", "mt1", "mt2", "mt3"]}
              maxZoom={19}
              attribution='&copy; <a href="https://www.google.com/intl/en/help/terms_maps.html">Google</a>'
            />
          </BaseLayer>

          {/* Google Maps Hybrid */}
          <BaseLayer
            checked={activeBaseLayer === "Google Hybrid"}
            name="Google Hybrid"
          >
            <TileLayer
              url="https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
              name="Google Hybrid"
              eventHandlers={{
                add: (e) => handleBaseLayerChange(e.target?.options?.name),
              }}
              subdomains={["mt0", "mt1", "mt2", "mt3"]}
              maxZoom={19}
              attribution='&copy; <a href="https://www.google.com/intl/en/help/terms_maps.html">Google</a>'
            />
          </BaseLayer>

          {/* Google Maps Terrain */}
          <BaseLayer
            checked={activeBaseLayer === "Google Terrain"}
            name="Google Terrain"
          >
            <TileLayer
              url="https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}"
              name="Google Terrain"
              eventHandlers={{
                add: (e) => handleBaseLayerChange(e.target?.options?.name),
              }}
              subdomains={["mt0", "mt1", "mt2", "mt3"]}
              maxZoom={19}
              attribution='&copy; <a href="https://www.google.com/intl/en/help/terms_maps.html">Google</a>'
            />
          </BaseLayer>
          <BaseLayer
            checked={activeBaseLayer === "Openstreet Street View"}
            name="Openstreet Street View"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              name="Openstreet Street View"
              eventHandlers={{
                add: (e) => handleBaseLayerChange(e.target?.options?.name),
              }}
              maxZoom={19}
              minZoom={3}
            />
          </BaseLayer>
          <BaseLayer
            checked={activeBaseLayer === "ArcGIS Satellite View"}
            name="ArcGIS Satellite View"
          >
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              name="ArcGIS Satellite View"
              eventHandlers={{
                add: (e) => handleBaseLayerChange(e.target?.options?.name),
              }}
              maxZoom={19}
              minZoom={3}
            />
          </BaseLayer>
          <BaseLayer
            checked={activeBaseLayer === "ArcGIS Street View"}
            name="ArcGIS Street View"
          >
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
              name="ArcGIS Street View"
              eventHandlers={{
                add: (e) => handleBaseLayerChange(e.target?.options?.name),
              }}
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
                  pathOptions={landAvailabilityStatusColor(
                    land.availabilityStatus
                  )}
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
          activeBaseLayer={activeBaseLayer}
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
