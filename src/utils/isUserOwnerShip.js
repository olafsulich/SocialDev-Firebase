const isUserOwnerShip = (currentUser, postAuthor) => {
  if (!currentUser) return false;
  return currentUser.uid === postAuthor.uid;
};

export default isUserOwnerShip;
