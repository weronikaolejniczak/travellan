export const DELETE_NOTE = 'DELETE_NOTE';
export const CREATE_NOTE = 'CREATE_NOTE';



export const createNote = (title, description) => {
  return {
    type: CREATE_NOTE,
    noteData: {
      title,
      description,
    },
  };
};
