export interface NoteModelParams {
  category: string;
  date: Date;
  description: string;
  id: string;
  title: string;
}

const NoteModel = ({
  category,
  date,
  description,
  id,
  title,
}: NoteModelParams) => ({
  category,
  date,
  description,
  id,
  title,
});

export default NoteModel;
