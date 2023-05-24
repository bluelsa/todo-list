import axios from 'axios';

const authUrl = 'https://todo-list.alphacamp.io/api/auth';

export const login = async ({ username, password }) => {
  try {
    const { data } = await axios.post(`${authUrl}/login`, {
      username,
      password,
    });
    // console.log(data)
    const { authToken } = data;
    if (authToken) {
      return { success: true, ...data };
    }
    return data;
  } catch (error) {
    console.error('[Login Failed]:', error);
  }
};

export const register = async ({ username, email, password }) => {
  try{
    const { data } = await axios.post(`${authUrl}/register`, {
      username,
      email,
      password
    })
    // console.log(data)
    const { authToken } = data;
    if (authToken) {
      return { success: true, ...data };
    }
    return data;
  } catch (error) {
    console.error('[Register Failed]:', error)
  }
}

export const checkPermission = async(authToken) => {
  try {
    const res = await axios.get(`${authUrl}/test-token`, {
      headers: {
        Authorization: 'Bearer ' + authToken
      }
    })
    return res.data.success
  } catch (error) {
    console.error('[Check Permission Failed]:', error)
  }
}