// export const PasswordRegex: RegExp =
//   /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]).{8,}$/gm;
  export const PasswordRegex = {
    rule: 'contain uppercase number and special char',
    pattern:  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]).{8,}$/gm
}