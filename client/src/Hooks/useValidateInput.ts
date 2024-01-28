interface ValParam {
  username: string;
  email: string;
  password: string;
}
const useValidateInputs = ({ username, email, password }: ValParam) => {
  const newErrors: { [key: string]: string } = {};

  if (!username) {
    newErrors.username = "Username is required";
  }

  if (!email) {
    newErrors.email = "Email is required";
  }

  if (!password) {
    newErrors.password = "Password is required";
  }

  return { status: Object.keys(newErrors).length === 0, newErrors };
};

export default useValidateInputs;
