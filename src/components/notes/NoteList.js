import React from 'react';
import Note from './Note';

function NoteList({ notes, onEdit, onDelete, onTogglePin }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.isArray(notes) && notes.length > 0 ? (
        notes.map((note, index) => (
          <div key={index} className="col-span-1 p-1 h-full">
            <Note
              key={index}
              index={index}
              id={note.id}
              title={note.title}
              createdAt={note.createdAt} 
              description={note.description}
              imageOrVideoLink={note.imageOrVideoLink}
              backgroundColor={note.backgroundColor}
              onEdit={onEdit} 
              onDelete={onDelete}
              isPinned={note.isPinned} 
              onTogglePin={onTogglePin} 
            />
          </div>
        ))
      ) : (
        <div className='font-bold text-gray-600 px-4' >No notes to display...!</div>
      )}
    </div>
  );
}

export default NoteList;
