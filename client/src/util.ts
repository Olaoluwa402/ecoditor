export const getUserInfo = (user: any) => {
  //@ts-ignore
  const userFromStorage = localStorage.getItem("user")
    ? //@ts-ignore
      JSON.parse(localStorage.getItem("user"))
    : null;
  const userInfo = user || userFromStorage;

  console.log(userInfo, "util");
  return userInfo;
};

export const getLanguage = (fileName?: string) => {
  if (fileName) {
    const fileExtension = fileName.split(".").pop();
    if (fileExtension === "ts") {
      return "typescript";
    } else if (fileExtension === "py") {
      return "python";
    }
  }
  // Default to TypeScript if no valid file extension is found
  return "typescript";
};
