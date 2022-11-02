interface IVerifyOptions {
  error: number,
  message: string;
}

const isCredentialsValid = (username: string, password: string): IVerifyOptions => {
  const format = /[ `!#$%^&*()+\-=\[\]{};':"\\|,<>\/?~]/
  let checker: number = 0;
  let message: string = "";

  if (username.length > 50 || password.length > 50) {
    checker = 1;
    message = "username or password is too long";
  } else if (username.length < 3 || password.length < 3) { 
    checker = 1;
    message = "username or password is too short";
  } else if (format.test(username) || format.test(password)){
    checker = 1;
    message = "username or password contains invalid characters";
  }
  return ({
    error: checker,
    message: message
  });
}

export {
  isCredentialsValid
}