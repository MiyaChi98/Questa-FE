// export const PasswordRegex: RegExp =
//   /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]).{8,}$/gm;
  export const PasswordRegex = {
    rule: 'Chứa ít nhất 1 kí tự đặc biệt , viết hoa và số',
    pattern:  /^(?=.*\d)(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]).{8,}$/gm
}