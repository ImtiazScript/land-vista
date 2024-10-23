import React from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import {
  Close as CloseIcon,
} from "@mui/icons-material";
import { landAvailabilityStatusPlaceHolder } from "../../utils/helper";

const LandDetailsModal = ({ open, onClose, land }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: 350, sm: 500 }, // Responsive width for mobile and larger screens
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        {/* Close Button */}
        <IconButton
          sx={{ position: "absolute", top: 8, right: 8 }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>

        {/* Title and Image */}
        <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
          {land?.name}
        </Typography>
        <img
          src={land?.imageUrl || process.env.REACT_APP_VERCEL_ENV  !== undefined ? landAvailabilityStatusPlaceHolder(land?.availabilityStatus) : "/images/place_holder.png"}
          alt={land?.name}
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "300px",
            marginBottom: "15px",
            borderRadius: "8px",
          }}
        />

        {/* Grid for Information */}
        <Grid container spacing={2}>
          {/* Availability Status */}
          <Grid
            item
            xs={12}
            sm={6}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Status:{" "}
            </Typography>
            <Typography variant="body1" sx={{ ml: 1 }}>{land?.availabilityStatus}</Typography>
          </Grid>

          {/* Price (Display if for sale) */}
          {(land?.availabilityStatus === "For Sale" ||
            land?.availabilityStatus === "For Rent") && (
            <Grid
              item
              xs={12}
              sm={6}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {land?.availabilityStatus === "For Sale" ? 'Price: ' : 'Monthly Rent: ' }
              </Typography>
              <Typography variant="body1"  sx={{ ml: 1 }}>
                ${land?.price?.toLocaleString()}
              </Typography>
            </Grid>
          )}

          {/* Ownership Type */}
          <Grid
            item
            xs={12}
            sm={6}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Ownership:{" "}
            </Typography>
            <Typography variant="body1"  sx={{ ml: 1 }}>{land?.ownershipType}</Typography>
          </Grid>

          {/* Land Type */}
          <Grid
            item
            xs={12}
            sm={6}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Type:{" "}
            </Typography>
            <Typography variant="body1" sx={{ ml: 1 }}>
              {land?.type}
            </Typography>
          </Grid>
        </Grid>

        {/* Description */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="body1" sx={{fontWeight: "bold" }}>
            Description:
          </Typography>
          <Typography variant="body2">
            {land?.description || "No description available"}
          </Typography>
        </Box>

        {/* Close Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={onClose}
          fullWidth
          sx={{ mt: 3 }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default LandDetailsModal;
