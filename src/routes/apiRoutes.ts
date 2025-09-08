const baseUrl = 'api/v1/';

const APIRoutes = {
  userRoutes: {
    signInRoute: `${baseUrl}users/signin`,
    signOutRoute: `${baseUrl}users/logout`,
    getProfileRoute: `${baseUrl}users/profile`,
  },
};

export default APIRoutes;
