interface Constants {
  backendBaseUrl: string;
}

const getConstants = (): Constants => {
  if (import.meta.env.MODE === "production") {
    return {
      backendBaseUrl: import.meta.env.VITE_APP_BACKEND_PROD_BASEURL || "",
    };
  } else {
    return {
      backendBaseUrl: import.meta.env.VITE_APP_BACKEND_DEV_BASEURL || "",
    };
  }
};

export const constants: Constants = getConstants();
