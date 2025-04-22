const shortenAddress = (address, startLength = 7, endLength = 7) => {
  if (!address || address.length <= startLength + endLength) {
    return address; // Return the full address if it's shorter than the desired format
  }
  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
};

export { shortenAddress };
