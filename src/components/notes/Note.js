import React, { useState } from 'react';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SaveIcon from '@mui/icons-material/Save';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Note({
  index,
  title,
  description,
  imageOrVideoLink,
  backgroundColor,
  createdAt,
  onEdit,
  onDelete,
  isPinned,
  onTogglePin
}) {
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedImageLink, setEditedImageLink] = useState(imageOrVideoLink);
  const [editedBackgroundColor, setEditedBackgroundColor] = useState(backgroundColor);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    onEdit(index, {
      title: editedTitle,
      description: editedDescription,
      imageOrVideoLink: editedImageLink,
      backgroundColor: editedBackgroundColor
    });
    console.log(setEditedBackgroundColor)
  };

  const handleDelete = () => {
    onDelete(index);
  };

  const handleTogglePin = () => {
    onTogglePin(index);
  };

  return (
    <div className='border overflow-y-auto min-h-[150px]  relative shadow-lg rounded-lg ' style={{ backgroundColor: editedBackgroundColor || '#ffffff', padding: '10px', marginBottom: '20px' }}>
      {isEditing ? (
        <>
          <input
            type="text"
            className='w-[100%] mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <ReactQuill
            value={editedDescription}
            onChange={setEditedDescription}
            theme="snow"
            className='w-[100%] mt-1 block w-full bg-white rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
          />
          <label>Add Image</label>
          <input
            type="text"
            className='w-[100%] mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
            value={editedImageLink}
            onChange={(e) => setEditedImageLink(e.target.value)}
          />
          <br />
          <br />
          <button onClick={handleSave}><SaveIcon/></button>
        </>
      ) : (
        <>
          <div className=''>
            <p className='text-[.8rem] flex justify-end text-gray-500'>{createdAt}</p>
            <br/>
            <p>{title}</p>
            <hr/>
            <div dangerouslySetInnerHTML={{ __html: description }} />
            <br/>
            {imageOrVideoLink && (
  <>
    {imageOrVideoLink.includes('youtu.be') ? (
      <iframe
        width="100%"
        height="200px"
        src={imageOrVideoLink.replace('youtu.be', 'youtube.com/embed')}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    ) : imageOrVideoLink.endsWith('.mp4') ? (
      <video controls>
        <source src={imageOrVideoLink} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    ) : (
      <img src={imageOrVideoLink} alt="pic" />
    )}
  </>
)}
            <br/>
            <div className='absolute w-[100%] left-0 bottom-[0rem] p-2 bg-gray-600 h-[2.5rem] opacity-60 text-white '></div>
            <div className='absolute w-[100%] left-0 bottom-[0rem]  text-white '>
              <IconButton onClick={handleEdit}><EditNoteIcon/></IconButton>
              <IconButton onClick={handleDelete}><DeleteOutlineIcon  /></IconButton>
              <IconButton onClick={handleTogglePin}>{isPinned ? <FavoriteIcon style={{color:'red'}} /> : <FavoriteIcon />}</IconButton>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Note;
