export const renderCommentDate = (createdAt: string) => {
  const hour = new Date(createdAt).getHours();
  const minutes = new Date(createdAt).getMinutes();
  const seconds = new Date(createdAt).getSeconds();
  const day = new Date(createdAt).getDate();
  const month = new Date(createdAt).getMonth();
  const year = new Date(createdAt).getFullYear();

  return `${day < 10 ? "0" + day : day}-${
    month < 10 ? "0" + (month + 1) : month
  }-${year} ${hour < 10 ? "0" + hour : hour}:${
    minutes < 10 ? "0" + minutes : minutes
  }:${seconds < 10 ? "0" + seconds : seconds}`;
};
