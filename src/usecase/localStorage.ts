export const ls = (user: string) => {
  let users: string[] = JSON.parse(localStorage.getItem("users") || "[]");

  users.push(user);

  localStorage.setItem("users", JSON.stringify(users));
};
