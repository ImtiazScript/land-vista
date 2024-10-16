export const landTypeColor = (type) => {
    switch (type) {
      case 'sell':
        return { fillColor: 'blue' };
      case 'rent':
        return { color: 'purple' };
      default:
        return { color: 'red' };
    }
  };