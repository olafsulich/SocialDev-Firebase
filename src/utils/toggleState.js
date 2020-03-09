const toggleState = (e, dataSetter) => {
  e.preventDefault();
  dataSetter(prevState => !prevState);
};

export default toggleState;
