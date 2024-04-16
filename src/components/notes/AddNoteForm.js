import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import colors from './Colors';
import App from '../../App';

function AddNoteForm({ onAddNote, onClose }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageOrVideoLink, setImageOrVideoLink] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');
  const[logout,setLogout]=useState(false)

  const getCurrentDateTime = () => {
    const options = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Title or description cannot be empty");
      return;
    }

    const formData = {
      title,
      description,
      imageOrVideoLink,
      backgroundColor,
      createdAt: getCurrentDateTime()
    };

    if (typeof onAddNote === 'function') {
      onAddNote(formData);
    } else {
      console.error('onAddNote is not a function');
    }

    setTitle('');
    setDescription('');
    setImageOrVideoLink('');
    setBackgroundColor('');
  };
const handleClose = () => {
    setLogout(true); 
  };

  if (logout) {
    return <App />;
  }
  

  return (
    <div className="p-12 bg-white rounded-md shadow-md w-[500px]">
      <h2 className="text-lg font-semibold mb-4 text-center">Add Note</h2>
      <hr />
      <br/>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title:
          </label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description:
          </label>
          <ReactQuill
          className='h-[5rem]'
            value={description}
            onChange={setDescription}
            theme="snow"
            modules={{
              toolbar: [
                [{ 'header': [1, 2, false] }],
                ['bold', 'italic', 'underline'],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'align': [] }],
                ['clean']
              ],
            }}
          />
        </div>
        <div>
          <br/>
          <br/>
          <br/>
          <label htmlFor="imageOrVideoLink" className="block text-sm font-medium text-gray-700 mb-1">
            Image/Video Link:
          </label>
          <input type="text" id="imageOrVideoLink" value={imageOrVideoLink} onChange={(e) => setImageOrVideoLink(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
        </div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Background Color:</label>
        <div className="flex items-center space-x-4">
          {colors.map((color, index) => (
            <label key={index} className={`inline-flex items-center cursor-pointer ${backgroundColor === color.code ? 'border border-gray-700 rounded-md' : ''}`} onClick={() => setBackgroundColor(color.code)}>
              <span className={`text-sm text-gray-700 h-4 w-4 ${color.previewClass} rounded-full`}></span>
            </label>
          ))}
        </div>
        <br/>
        <div className="flex justify-between gap-5 ">
          <button type="submit" className="w-1/2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md">Add Note</button>
          <button type="button" onClick={handleClose} className="w-1/2 font-bold border-2 border-gray-600  text-black hover:bg-gray-200  font-semibold py-2 px-4 rounded-md">Clear</button>
        </div>
      </form>
    </div>
  );
}

export default AddNoteForm;
