export const getUserInfo = async () => {
   const WebApp = (await import("@twa-dev/sdk")).default;

   WebApp.ready();

   const user = WebApp.initDataUnsafe.user;
   return user;
};
