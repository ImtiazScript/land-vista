import React from 'react';
import { Box, IconButton, Tooltip, } from '@mui/material';
import { Cancel, Undo, Save, Add } from '@mui/icons-material';

const ToolBox = ({ toolboxOpen, clickedPositions, handleRevert, setShowSaveModal, handleCancel, handleStartLandCreation }) => {
  return (
    <Box className="toolBox">
    {toolboxOpen ? (
      <>
        {/* Revert button with icon */}
        <Tooltip title="Undo" placement="left">
          <span>
            <IconButton
              color="warning"
              className="icon-button-style"
              disabled={clickedPositions.length < 1}
              onClick={handleRevert}
            >
              <Undo />
            </IconButton>
          </span>
        </Tooltip>

        {/* Save Land button with icon */}
        <Tooltip title="Save" placement="left">
          <span>
            <IconButton
              className="icon-button-style"
              color="success"
              disabled={clickedPositions.length < 3}
              onClick={() => setShowSaveModal(true)}
            >
              <Save />
            </IconButton>
          </span>
        </Tooltip>

        {/* Cancel button */}
        <Tooltip title="Cancel" placement="left">
          <span>
            <IconButton
              className="icon-button-style"
              color="error"
              onClick={handleCancel}
            >
              <Cancel />
            </IconButton>
          </span>
        </Tooltip>
      </>
    ) : (
      <Tooltip title="Add new" placement="left">
        <span>
          <IconButton
            className="icon-button-style"
            color="primary"
            onClick={handleStartLandCreation}
          >
            <Add />
          </IconButton>
        </span>
      </Tooltip>
    )}
  </Box>
  );
};

export default ToolBox;