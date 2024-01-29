// CodeEditor.tsx
import React, { useState, useEffect } from "react";
//import MonacoEditor, { MonacoEditorProps } from "react-monaco-editor";
import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  fileName: string;
  extension: string;
  isActive: boolean;
  // executeCode: () => void;
  // onChange: (newValue: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  fileName,
  extension,
  isActive,
  // executeCode,
  // onChange,
  // ...rest
}) => {
  const [code] = useState("");

  // const editorDidMount = (editor: any, monaco: any) => {
  //   console.log(editor, monaco, "Editor mounted");
  // };

  useEffect(() => {
    // Simulate code execution and set the output (replace with actual code execution logic)
    if (isActive) {
      // Simulate asynchronous code execution
      const timeoutId = setTimeout(() => {
        // setOutput(`Output for ${fileName}${extension}`);
      }, 1000);

      // Clean up the timeout when the component is unmounted or isActive changes
      return () => clearTimeout(timeoutId);
    }
  }, [isActive, fileName, extension]);

  return (
    <div style={{ display: true ? "flex" : "none" }} className="w-full h-full">
      <div className="w-full flex-1">
        <Editor
          height="100%"
          width="100%"
          value={code}
          theme="vs-dark"
          language="javascript"
        />
      </div>
      {/* <MonacoEditor
        width="800"
        height="600"
        language={rest.language}
        theme="vs-dark"
        value={code}
        onChange={(newValue) => {
          setCode(newValue); 
          onChange(newValue);
        }}
        editorDidMount={editorDidMount}
        {...rest}
      /> */}
    </div>
  );
};

export default CodeEditor;
