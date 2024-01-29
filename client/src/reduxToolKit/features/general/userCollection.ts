// // Function to add a file to a folder in the UserCollection
const addFileToFolderUserCollection = (
  userCollection: any[],
  folderName: string,
  fileName: string,
  content?: string
): any[] => {
  return userCollection.map((folder) => {
    if (folder.name === folderName) {
      return {
        ...folder,
        files: [...folder.files, { name: fileName, content }],
      };
    } else if (folder.folders) {
      return {
        ...folder,
        folders: addFileToFolderUserCollection(
          folder.folders,
          folderName,
          fileName,
          content
        ),
      };
    }
    return folder;
  });
};

//   // Function to update a file in the UserCollection
//   const updateFile = (
//     userCollection: any[],
//     folderName: string,
//     fileName: string,
//     newContent?: string
//   ): any[] => {
//     return userCollection.map((folder) => {
//       if (folder.name === folderName) {
//         return {
//           ...folder,
//           files: folder.files.map((file) =>
//             file.name === fileName ? { ...file, content: newContent } : file
//           ),
//         };
//       } else if (folder.folders) {
//         return {
//           ...folder,
//           folders: updateFile(folder.folders, folderName, fileName, newContent),
//         };
//       }
//       return folder;
//     });
//   };

//   // Function to delete a file from the UserCollection
//   const deleteFile = (
//     userCollection: any[],
//     folderName: string,
//     fileName: string
//   ): any[] => {
//     return userCollection.map((folder) => {
//       if (folder.name === folderName) {
//         return {
//           ...folder,
//           files: folder.files.filter((file) => file.name !== fileName),
//         };
//       } else if (folder.folders) {
//         return {
//           ...folder,
//           folders: deleteFile(folder.folders, folderName, fileName),
//         };
//       }
//       return folder;
//     });
//   };

//   // Example Usage
//   const updatedUserCollection = addFileToFolder(
//     UserCollection.collections,
//     "Folder 1",
//     "newFile.ts",
//     "console.log('Hello, World!');"
//   );

//   console.log(updatedUserCollection);

//   const updatedUserCollection2 = updateFile(
//     updatedUserCollection,
//     "Folder 1",
//     "newFile.ts",
//     "console.log('Updated content!');"
//   );

//   console.log(updatedUserCollection2);

//   const updatedUserCollection3 = deleteFile(
//     updatedUserCollection2,
//     "Folder 1",
//     "newFile.ts"
//   );

//   console.log(updatedUserCollection3);
