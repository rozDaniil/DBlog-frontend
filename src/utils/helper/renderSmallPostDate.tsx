export const renderCreatedAt = (createdAt: string) => {
  const day = new Date(createdAt).getDate();
  const month = new Date(createdAt).getMonth();
  const year = new Date(createdAt).getFullYear();

  return `${day < 10 ? "0" + day : day}/${
    month < 10 ? "0" + (month + 1) : month
  }/${year}`;
};
