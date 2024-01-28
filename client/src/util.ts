export const getUserInfo = (user:any)=> {
    //@ts-ignore
    const userFromStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")): null
      const userInfo = user || userFromStorage

      console.log(userInfo, "util")
 return userInfo
}