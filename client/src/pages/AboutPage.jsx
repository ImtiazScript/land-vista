import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaMapMarkerAlt,
  FaSave,
  FaFilter,
} from "react-icons/fa";
import "../styles/AboutPage.css";

const AboutPage = () => {
  return (
    <div className="about-container">
      <section className="about-header">
        <h2>About This Tool</h2>
        <p className="intro-text">
          Welcome to this map-based tool, a proof of concept designed to help
          you save, manage, and filter your map preferences. Whether you're an
          individual landowner or a company looking to store map locations, this
          tool can be customized to meet your needs.
        </p>
        <p>
          As this is a proof of concept, features like authorization and cloud
          storage are not yet implemented. All data is saved locally in your
          browser storage. If you need advanced features, feel free to reach
          out, and I can build upon this foundation according to your
          requirements.
        </p>
        <img
          className="map-image"
          src="/images/screenshot.png"
          alt="Map Preview"
        />
        <div className="features-section">
          <div className="feature-box">
            <FaMapMarkerAlt className="icon" />
            <p>Save Map Center</p>
            <p>
              Users can store their preferred map center coordinates and revisit
              them anytime.
            </p>
          </div>
          <div className="feature-box">
            <FaSave className="icon" />
            <p>Save Map Details</p>
            <p>
              Create and save your land's information with custom markers and
              descriptions.
            </p>
          </div>
          <div className="feature-box">
            <FaFilter className="icon" />
            <p>Filter Saved Maps</p>
            <p>
              Easily filter and manage your saved maps based on location,
              markers, or other preferences.
            </p>
          </div>
        </div>
      </section>

      <section className="add-new-section">
        <h3>Add New Land & Save Map Center</h3>
        <img
          className="map-image"
          src="/images/add_new.png"
          alt="Map Preview"
        />
        <p>
          In demo mode, users can freely add new land plots without needing
          authorization. The process is simple and user-friendly:
        </p>
        <p>
          To begin, click the <strong>Add New</strong> button located on the
          right side of the window. This will allow you to mark the coordinates
          directly on the map by clicking to define each corner of the land. If
          at any point you wish to modify or undo any of your selections, you
          can easily do so before finalizing the land creation.
        </p>
        <p>
          Once all the coordinates are marked, click the <strong>Save</strong>{" "}
          icon button. A modal window will then appear, prompting you to provide
          additional details about the land. After filling out the required
          fields, save the form to officially add the new landmark to the map.
        </p>
        <p>
          This feature allows users to seamlessly interact with the map and add
          new land records with minimal effort.
        </p>
        <p>
          Users can save their map preference like map center, zoom level and
          view.
        </p>
      </section>

      <section className="filter-section">
        <h3>Filter Lands</h3>
        <img className="map-image" src="/images/filter.png" alt="Map Preview" />
        <p>
          The filter panel, located on the left side of the screen, allows users
          to customize their search for lands by applying various filters. It
          provides an intuitive interface where users can narrow down the
          results based on specific land attributes.
        </p>
        <p>
          To open the filter panel, simply click on the <strong>Filter</strong>{" "}
          button on the left. This will expand the filter options where users
          can choose from a range of filters:
        </p>
        <ul>
          <p>
            <strong>Type:</strong> Select one or more land types such as{" "}
            <em>Residential</em>, <em>Commercial</em>, <em>Farming</em>, or{" "}
            <em>Fish Farm</em>.
          </p>
          <p>
            <strong>Availability Status:</strong> Choose the current status of
            the land, including <em>For Sale</em>, <em>Sold</em>,{" "}
            <em>For Rent</em>, <em>Rented</em>, <em>For Lease</em>,{" "}
            <em>Leased</em>, <em>Not Available</em>, or <em>Auction</em>.
          </p>
          <p>
            <strong>Ownership Type:</strong> Filter based on the type of
            ownership, such as <em>Private</em>, <em>Government</em>, or{" "}
            <em>Common</em>.
          </p>
          <p>
            <strong>Area Range:</strong> Use the slider to specify the range of
            land area (in square meters) that you're interested in.
          </p>
        </ul>
        <p>
          Once you’ve made your selections, click the <strong>Filter</strong>{" "}
          button to apply the filters. If you need to reset your choices, the{" "}
          <strong>Clear</strong> button will remove all applied filters.
        </p>
        <p>
          The filter panel helps users quickly find the lands that match their
          specific criteria, making the search process more efficient.
        </p>
      </section>

      <section className="land-detail-section">
        <h3>Land Detail</h3>
        <img
          className="map-image"
          src="/images/land_detail.png"
          alt="Map Preview"
        />
        <p>
          The filter panel, located on the left side of the screen, allows users
          to customize their search for lands by applying various filters. It
          provides an intuitive interface where users can narrow down the
          results based on specific land attributes.
        </p>
        <p>
          To open the filter panel, simply click on the <strong>Filter</strong>{" "}
          button on the left. This will expand the filter options where users
          can choose from a range of filters:
        </p>
        <ul>
          <p>
            <strong>Type:</strong> Select one or more land types such as{" "}
            <em>Residential</em>, <em>Commercial</em>, <em>Farming</em>, or{" "}
            <em>Fish Farm</em>.
          </p>
          <p>
            <strong>Availability Status:</strong> Choose the current status of
            the land, including <em>For Sale</em>, <em>Sold</em>,{" "}
            <em>For Rent</em>, <em>Rented</em>, <em>For Lease</em>,{" "}
            <em>Leased</em>, <em>Not Available</em>, or <em>Auction</em>.
          </p>
          <p>
            <strong>Ownership Type:</strong> Filter based on the type of
            ownership, such as <em>Private</em>, <em>Government</em>, or{" "}
            <em>Common</em>.
          </p>
          <p>
            <strong>Area Range:</strong> Use the slider to specify the range of
            land area (in square meters) that you're interested in.
          </p>
        </ul>
        <p>
          Once you’ve made your selections, click the <strong>Filter</strong>{" "}
          button to apply the filters. If you need to reset your choices, the{" "}
          <strong>Clear</strong> button will remove all applied filters.
        </p>
        <p>
          The filter panel helps users quickly find the lands that match their
          specific criteria, making the search process more efficient.
        </p>
      </section>

      <section className="search-section">
        <h3>Search for Locations</h3>
        <img className="map-image" src="/images/search.png" alt="Map Preview" />
        <p>
          The search box, located at the top of the interface, provides users
          with the ability to quickly find specific locations by entering search
          terms. This live search functionality allows users to easily search
          for lands and areas of interest by typing a keyword into the search
          box.
        </p>
        <p>
          As users begin typing into the search box, the tool will automatically
          perform a search and display relevant location suggestions in a
          dropdown. These results are fetched from an external geolocation
          service and displayed in real-time as you type.
        </p>
        <ul>
          <p>
            <strong>Search Query:</strong> Begin typing a location name or
            address. A list of suggestions will appear once you type at least
            four characters.
          </p>
          <p>
            <strong>Search Results:</strong> The dropdown will show up to ten
            potential matches based on the search query. These suggestions are
            pulled from the map's geolocation database.
          </p>
          <p>
            <strong>Selecting a Location:</strong> Clicking on a location from
            the suggestions will automatically populate the coordinates and
            center the map at the selected location. This makes it easy for
            users to find and work with the exact location they are looking for.
          </p>
        </ul>
        <p>
          This search module helps users find and pinpoint specific locations
          quickly, ensuring an efficient and user-friendly experience while
          interacting with the map.
        </p>
      </section>

      <section className="map-layers-section">
        <h3>Map Layer Control</h3>
        <img className="map-image" src="/images/views.png" alt="Map Preview" />
        <p>
          The map allows users to switch between various layers like Google
          Maps, OpenStreetMap, and ArcGIS, offering different views for
          navigation, satellite imagery, and terrain.
        </p>
        <ul>
          <p>
            <strong>Google Roads:</strong> Detailed road maps for street-level
            navigation.
          </p>
          <p>
            <strong>Google Satellite:</strong> Satellite imagery for real-world
            views.
          </p>
          <p>
            <strong>Google Hybrid:</strong> Satellite + roads and labels for a
            comprehensive view.
          </p>
          <p>
            <strong>Google Terrain:</strong> Terrain features like mountains and
            elevations.
          </p>
          <p>
            <strong>OpenStreetMap:</strong> Community-driven street view.
          </p>
          <p>
            <strong>ArcGIS Satellite:</strong> High-res satellite imagery for
            research.
          </p>
          <p>
            <strong>ArcGIS Street View:</strong> Detailed street maps from
            ArcGIS.
          </p>
        </ul>
        <p>
          Users can switch layers by selecting them from the control panel at
          the bottom-right of the map.
        </p>
      </section>

      <section className="about-header">
        <h3>Custom Solution</h3>
        <p className="customization-offer">
          <strong>Looking for a custom solution?</strong> This tool can be
          customized to suit personal or corporate needs. If you'd like to place
          an order or request additional features, I'm happy to discuss and
          implement them.
        </p>
      </section>

      <section className="contact-section">
        <h3>Contact Information</h3>
        <p>If you'd like to get in touch, here are my details:</p>
        <ul className="contact-list">
          <p>
            <FaEnvelope /> Email:{" "}
            <a href="mailto:emtiaj2011@gmail.com">emtiaj2011@gmail.com</a>
          </p>
          <p>
            <FaLinkedin /> LinkedIn:{" "}
            <a href="https://www.linkedin.com/in/imtiaz-bd/">Imtiaz Ahmed</a>
          </p>
          <p>
            <FaGithub /> GitHub:{" "}
            <a href="https://github.com/imtiazUAP">github.com/imtiazUAP</a>
          </p>
        </ul>
      </section>
    </div>
  );
};

export default AboutPage;
