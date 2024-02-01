import React from "react";
import Editor from "@monaco-editor/react";
import { getCurrentEditorValueAndSaveAction } from "../reduxToolKit/features/general";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../reduxToolKit/store";

interface CodeEditorProps {
  folderName: string;
  fileName: string;
  isActive: boolean;
  code: any;
  language: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  folderName,
  fileName,
  code,
  language,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  // Throttle the function to be called at most once every 5000 milliseconds
  const throttledSaveAction = _.throttle((folderName, fileName, value) => {
    // Inside the throttled function, you can dispatch the action
    dispatch(getCurrentEditorValueAndSaveAction(folderName, fileName, value));
  }, 5000);
  function handleEditorChange(value: any) {
    throttledSaveAction(folderName, fileName, value);
  }

  return (
    <div style={{ display: true ? "flex" : "none" }} className="w-full h-full">
      <div className="w-full flex-1">
        <Editor
          height="100%"
          width="100%"
          value={code}
          onChange={handleEditorChange}
          theme="vs-dark"
          language={language}
          defaultLanguage={language}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
