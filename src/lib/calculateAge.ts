export const getAge = (birthday: Date) => {
  const y = birthday.getFullYear();
  const m = birthday.getMonth();
  const d = birthday.getDate();

  const now = new Date();
  const nowY = now.getFullYear();
  const nowM = now.getMonth();
  const nowD = now.getDate();

  const yDifference = nowY - y;
  const passes = nowM > m || (nowM === m && nowD >= d);

  return passes ? yDifference : yDifference - 1;
};
