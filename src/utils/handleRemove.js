const handleRemove = (ref, id) => {
  ref.doc(id).delete();
};
export default handleRemove;
