const toogleState = (e, dataSetter) => {
  e.preventDefault();
  dataSetter(prevState => !prevState);
};

export default toogleState;
