export const USER_TOKEN = {
  set: ({ accessToken }) => {
    localStorage.setItem('access_token', accessToken);
    },
  remove: () => {
    localStorage.removeItem('access_token');
    localStorage.clear();
    sessionStorage.clear();

  },
  get: () => ({
    token: localStorage.getItem('access_token'),
   }),
  get notEmpty() {
    return this.get().token !== null;
  },
};
