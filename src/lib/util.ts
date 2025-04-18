export const detectGuestSpaceId = () => {
  const match = location.pathname.match(/^\/k\/guest\/(\d+)\//);
  return match ? match[1] : null;
};
