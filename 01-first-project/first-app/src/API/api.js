import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    "API-KEY": "e6d3e3df-9b0a-4b4f-922a-7ba02a4ecff7",
  }
});

export const userAPI = {

  async getUsers(page = 1, pageSize = 6) {
    const response = await instance.get(`users?page=${page}&count=${pageSize}`);  
    return response.data;
  },

  async follow(userId) {
    const response = await instance.post(`follow/${userId}`);
    return response.data;
  },

  async unfollow(userId) {
    const response = await instance.delete(`follow/${userId}`);
    return response.data;
  },

  async getProfile(userId) {
    return profileAPI.getProfile(userId);
  }
}

export const profileAPI = {

  async getProfile(userId) {
    const response = await instance.get(`profile/` + userId);
    return response.data;
  },

  async getStatus(userId) {
    const response = await instance.get(`profile/status/` + userId);
    return response.data;
  },

  async updateStatus(status) {
    const response = await instance.put(`profile/status`, { status: status });
    return response.data;
  },

  async savePhoto(file) {
    const formData = new FormData();
    formData.append("image", file);
    const response = await instance.put(`profile/photo`, formData, { headers: {
      'Content-Type': 'multipart/form-data'
    }});
    return response.data;
  },

  async saveProfile(profile) {
    const response = await instance.put(`profile`, profile);
    return response;
  }

}

export const authAPI = {

  async getAuth() {
    const response = await instance.get(`auth/me`);
    return response.data;
  },

  async login(email, password, rememberMe = false) {
    const response = await instance.post(`auth/login`, { email, password, rememberMe });
    return response.data;
  },

  async logout() {
    const response = await instance.delete(`auth/login`);
    return response.data;
  }

}