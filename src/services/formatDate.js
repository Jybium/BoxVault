function formatUnixTimestamp(timestamp) {
  const date = new Date(Number(timestamp) * 1000);
  return date.toUTCString(); // Format the date and time
}

export default formatUnixTimestamp; 