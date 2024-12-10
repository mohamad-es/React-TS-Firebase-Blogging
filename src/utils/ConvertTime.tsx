type Timestamp = {
  seconds: number;
  nanoseconds: number;
};

export const convertFirebaseTimestampToDate = (timestamp: Timestamp) => {
  const { seconds, nanoseconds } = timestamp;
  const milliseconds = seconds * 1000 + nanoseconds / 1e6;
  return new Date(milliseconds).toLocaleString(); // Customize as needed
};