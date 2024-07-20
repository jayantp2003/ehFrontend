import React, { useState, useRef } from 'react';

const CustomEditor = ({ value, onChange }) => {
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const editorRef = useRef(null);

  const handleFormat = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
  };

  const handleChange = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleButtonClick = (event, command, value = null) => {
    event.preventDefault();  // Prevent the default button behavior
    handleFormat(command, value);
  };

  return (
    <div className="custom-editor">
      <div className="editor-toolbar">
        <button
          onMouseDown={(event) => handleButtonClick(event, 'bold')}
          className={`toolbar-btn ${isBold ? 'active' : ''}`}
          onClick={() => setIsBold(!isBold)}
        >
          B
        </button>
        <button
          onMouseDown={(event) => handleButtonClick(event, 'italic')}
          className={`toolbar-btn ${isItalic ? 'active' : ''}`}
          onClick={() => setIsItalic(!isItalic)}
        >
          I
        </button>
        <button
          onMouseDown={(event) => handleButtonClick(event, 'underline')}
          className={`toolbar-btn ${isUnderline ? 'active' : ''}`}
          onClick={() => setIsUnderline(!isUnderline)}
        >
          U
        </button>
        <button
          onMouseDown={(event) => handleButtonClick(event, 'insertUnorderedList')}
          className="toolbar-btn"
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
        dangerouslySetInnerHTML={{ __html: value }}
        onInput={handleChange}
      />
    </div>
  );
};

export default CustomEditor;
