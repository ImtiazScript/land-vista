export const landAvailabilityStatusColor = (availabilityStatus) => {
  switch (availabilityStatus) {
      case 'For Sale':
          return { fillColor: 'blue' };
      case 'Sold':
          return { color: 'gray' };
      case 'For Rent':
          return { fillColor: 'purple' };
      case 'Rented':
          return { color: 'orange' };
      case 'For Lease':
          return { fillColor: 'green' };
      case 'Leased':
          return { color: 'lightgreen' };
      case 'Not Available':
          return { color: 'red' };
      case 'Auction':
          return { color: 'gold' };
      default:
          return { color: 'black' };
  }
};
