import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

interface TextEditorProps {
  content: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
  readOnly?: boolean;
}

const TextEditor = ({
  content,
  placeholder,
  onChange = () => {},
  onBlur = () => {},
  disabled,
  readOnly,
}: TextEditorProps) => {
  const quillRef = useRef<ReactQuill>(null);
  const [mounted, setMounted] = useState(false);

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
  ];

  const handleBlur = () => {
    onBlur();
  };

  const handleChange = (value: string) => {
    onChange(value);
  };

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) {
    return <div>Loading editor...</div>;
  }

  return (
    <div className="quill-wrapper">
      <ReactQuill
        ref={quillRef}
        value={content || ""}
        onChange={handleChange}
        className="editor"
        modules={readOnly ? {} : quillModules}
        formats={quillFormats}
        placeholder={placeholder || ""}
        onBlur={handleBlur}
        readOnly={disabled || readOnly || false}
        theme="snow"
      />
    </div>
  );
};

export default TextEditor;
