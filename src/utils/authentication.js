export const signupUser = (userData) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const exists = users.find((u) => u.email === userData.email);
  if (exists) throw new Error("User already exists!");
  users.push(userData);
  localStorage.setItem("users", JSON.stringify(users));
  return { message: "Signup successful!" };
};

export const loginUser = (email, password) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const found = users.find((u) => u.email === email && u.password === password);
  if (!found) throw new Error("Invalid credentials!");
  localStorage.setItem("token", "mock-token-123");
  return { message: "Login successful!", token: "mock-token-123" };
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};
