//WHEN CALLING FUNCTIONS, GIVE THE URL. TO MAKE IT EASIER, WE JUST MAKE A KINDAMUIAI

//PVZ: let expensesURL = "http://localhost:3000/expenses/"

import axios from "axios";

export const getAllData = (url) => {
  return axios
    .get(url)
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

export const updateData = (id, todoData, url) => {
  return axios
    .patch(url + id, todoData)
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

export const postData = async (todoData, url) => {
  return await axios
    .post(url, todoData)
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

export const deleteData = async (id, url) => {
  return await axios
    .delete(url + id)
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error));
};

export const getAllUsers = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const editUser = async (url, data) => {
  try {
    const response = await axios.patch(url, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteUser = async (url) => {
  try {
    const response = await axios.delete(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addUser = async (url, data) => {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
