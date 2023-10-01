import { NoteData, Tag } from "../../App";
import NoteForm from "../NoteForm/NoteForm";
import { useNote } from "../NoteLayout/NoteLayout";

type EditNoteProps = {
  onUpdateNote: (id: string, data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

const EditNote = ({ onUpdateNote, onAddTag, availableTags }: EditNoteProps) => {
  const note = useNote();
  return (
    <section className='new-note'>
      <h1 className='mb-4'>New Note</h1>
      <NoteForm
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
        onCreateNote={(data) => onUpdateNote(note.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </section>
  );
};

export default EditNote;
