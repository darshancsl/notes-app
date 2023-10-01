import { NoteData, Tag } from "../../App";
import NoteForm from "../NoteForm/NoteForm";

type NewNoteProps = {
  onCreateNote: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

const NewNote = ({ onCreateNote, onAddTag, availableTags }: NewNoteProps) => {
  return (
    <section className='new-note'>
      <h1 className='mb-4'>New Note</h1>
      <NoteForm
        onCreateNote={onCreateNote}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </section>
  );
};

export default NewNote;
