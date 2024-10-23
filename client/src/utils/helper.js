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

export const landAvailabilityStatusPlaceHolder = (availabilityStatus) => {
    switch (availabilityStatus) {
        case 'For Sale':
            return '/images/for_sale_placeholder.jpg';
        case 'Sold':
            return '/images/sold_placeholder.webp';
        case 'For Rent':
            return '/images/for_rent_placeholder.jpg';
        case 'Rented':
            return '/images/rented_placeholder.jpg';
        case 'For Lease':
            return '/images/for_lease_placeholder.webp';
        case 'Leased':
            return '/images/leased_placeholder.webp';
        case 'Not Available':
            return '/images/not_available_placeholder.jpg';
        case 'Auction':
            return '/images/auction_placeholder.jpg';
        default:
            return '/images/place_holder.png';
    }
  };
