const dep = {
  CSE: "Computer Science",
  ECE: "Electrical and Communication Engineering",
  EEE: "Electrical and Electronics Engineering",
  CE: "Civil Engineering",
  ME: "Mechanical Engineering",
};

const baseURL = "http://localhost:3000/api/";

const logdata = localStorage.getItem("role");

export { baseURL ,dep,logdata};