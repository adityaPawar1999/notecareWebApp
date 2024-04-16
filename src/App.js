// App.js
import React, { useState, useContext } from 'react';
import AddNoteForm from './components/notes/AddNoteForm';
import NoteList from './components/notes/NoteList';
import UserContext from './components/contextAPI/UserContext'; 
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditNoteIcon from '@mui/icons-material/EditNote';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LoginForm from './components/auth/LoginForm';

function App() {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddNoteForm, setShowAddNoteForm] = useState(false);
  const[logout,setLogout]=useState(false)
  const [sortOrder, setSortOrder] = useState('desc'); 
  const { fname } = useContext(UserContext);

  const handleAddNote = (newNote) => {
    setNotes([...notes, newNote]);
    setShowAddNoteForm(false); 
  };

  const handleEditNote = (index, editedNote) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = editedNote;
    setNotes(updatedNotes);
  };

  const handleDeleteNote = (index) => {
    if (index < 0 || index >= notes.length) {
      console.error("Invalid index:", index);
      return;
    }
    const updatedNotes = notes.filter((_, i) => i !== index); 
    setNotes(updatedNotes);
  };

  const handleTogglePin = (index) => {
    const updatedNotes = [...notes];
    updatedNotes[index].isPinned = !updatedNotes[index].isPinned;
    setNotes(updatedNotes);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSort = () => {
  
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
  };

  const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(searchQuery.toLowerCase()));

  
  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (sortOrder === 'asc') {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });
 const handleLogout = () => {
    setLogout(true); 
  };

 
  if (logout) {
    return <LoginForm />;
  }
  

  return (
    <div className="relative flex flex-col min-h-screen w-[100%] bg-gray-100 ">
     
      <header className="bg-green-500 text-white  fixed w-full z-50">
        <div className="container mx-auto px-4 flex justify-between px-4">
          <h1 className="text-2xl font-bold text-gray-100">
            <EditNoteIcon style={{fontSize:'2.3rem'}} />NoteCare</h1>
          <div>
            <input
              type="text"
              placeholder="Search by title..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="px-9 py-1 m-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 text-gray-800 placeholder-gray-500"
            />
            <button onClick={handleSort} className="px-7 py-1 mr-2 bg-gray-800 hover:bg-blue-600 rounded-md">Sort {sortOrder === 'asc' ? 'Ascending' : 'Descending'}</button>
          </div>
          <p onClick={handleLogout} style={{ paddingRight: '2rem', cursor: 'pointer' }}>
            <AccountCircleIcon style={{ fontSize: '2.6rem' }} /> {fname}
          </p>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-20 relative">
        <div className="">
          <NoteList
              notes={sortedNotes} 
              onEdit={handleEditNote}
              onDelete={handleDeleteNote}
              onTogglePin={handleTogglePin}
            />
        </div>
      </main>
      {showAddNoteForm && (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-50  bg-gray-900 bg-opacity-75 flex justify-center items-center ">
          <AddNoteForm className='w-[30rem]' onAddNote={handleAddNote} />
        </div>
      )}
      <div className=" mx-auto px-4  fixed top-100  right-10 bottom-10 z-50">
        <button className='    flex justify-end' onClick={() => setShowAddNoteForm(!showAddNoteForm)}><AddCircleIcon className='text-green-500' style={{fontSize:'3rem'}} /></button>
      </div>
    </div>
  );
}

export default App;
