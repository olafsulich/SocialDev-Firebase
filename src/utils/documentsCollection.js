const documentsCollection = doc => {
  return { id: doc.id, ...doc.data() };
};

export default documentsCollection;
