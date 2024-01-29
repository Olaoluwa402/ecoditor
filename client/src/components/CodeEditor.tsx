import React from "react";
import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  fileName: string;
  isActive: boolean;
  code: any;
  language: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  language = "python",
}) => {
  return (
    <div style={{ display: true ? "flex" : "none" }} className="w-full h-full">
      <div className="w-full flex-1">
        <Editor
          height="100%"
          width="100%"
          value={code}
          theme="vs-dark"
          language={language}
          defaultLanguage="typescript"
        />
      </div>
    </div>
  );
};

export default CodeEditor;
