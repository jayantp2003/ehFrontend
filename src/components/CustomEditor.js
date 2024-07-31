import React, { useState, useRef, useEffect } from 'react';

const CustomEditor = ({ value, onChange }) => {
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleFormat = (command, value = null) => {
    document.execCommand(command, false, value);
    // editorRef.current.focus();
  };

  const handleChange = () => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML;
      onChange(newContent);
    }
  };

  const handleButtonClick = (event, command, value = null) => {
    event.preventDefault();
    handleFormat(command, value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      
      // Insert a new line
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const br = document.createElement('br');
      range.deleteContents();
      range.insertNode(br);
      
      // Move the caret after the break
      range.setStartAfter(br);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);

      // Trigger the change event
      handleChange();
    }
  };

  return (
    <div className="custom-editor">
      <div className="editor-toolbar">
        <button
          onMouseDown={(event) => handleButtonClick(event, 'bold')}
          className={`toolbar-btn ${isBold ? 'active' : ''}`}
          onClick={(event) => {event.preventDefault();}}
        >
          B
        </button>
        <button
          onMouseDown={(event) => handleButtonClick(event, 'italic')}
          className={`toolbar-btn ${isItalic ? 'active' : ''}`}
          onClick={(event) => {event.preventDefault();}}
        >
          I
        </button>
        <button
          onMouseDown={(event) => handleButtonClick(event, 'underline')}
          className={`toolbar-btn ${isUnderline ? 'active' : ''}`}
          onClick={(event) => {event.preventDefault();}}
        >
          U
        </button>
        <button
          onMouseDown={(event) => handleButtonClick(event, 'insertUnorderedList')}
          className="toolbar-btn"
          onClick={(event) => {event.preventDefault();}}
        >
          • List
        </button>
        <button
          onMouseDown={(event) => {
            event.preventDefault();
            const url = prompt('Enter the URL:');
            if (url) handleButtonClick(event, 'createLink', url);
          }}
          className="toolbar-btn"
        >
          Link
        </button>
      </div>
      <div
        ref={editorRef}
        className="editor-content"
        contentEditable
        onInput={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default CustomEditor;