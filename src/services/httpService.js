import axios from 'axios';
import {toast} from 'react-toastify';
import {createBrowserHistory} from "history";


const history = createBrowserHistory({forceRefresh: true});

//
// axios.interceptors.request.use(async function (config) {
//     document.getElementById("loading").style.display = "";
//
//     if (!config.url.includes("/fetch/access-token")) {
//         const token = sessionStorage.getItem('token');
//         if (!config.url.includes("check-client-id")) {
//             await checkCanUseFromToken(token);
//         }
//         config.url += "?access_token=" + token;
//     }
//     return config;
// }, function (error) {
//     return Promise.reject(error);
// });

// axios.interceptors.response.use(function (response) {
//     return response;
// }, function (error) {
//     document.getElementById("loading").style.display = "none";
//     const expectedError =
//         error.response &&
//         error.response.status >= 400 &&
//         error.response.status < 500;
//
//     if (!expectedError) {
//         console.log('Logging the error:', error);
//         toast.error("خطایی در برقراری با سرور به وجود امده است");
//     }
//
//     return Promise.reject(error);
// });
//
//
//
// const isValidAccessToken = async () => {
//     let wasValid = false;
//     await axios.post(`http://shop.isuncharge.com/isunshop/check-client-id`)
//         .then(res => {
//             wasValid = true;
//         }).catch((res, error) => {
//             wasValid = false;
//         });
//     return wasValid;
// };
//
// const redirectToLogin = () => {
//     sessionStorage.removeItem("token");
//     sessionStorage.setItem('login-message', "لطفا دوباره وارد شودید.");
//     history.push('/login');
// };
//
// const checkCanUseFromToken = async (token) => {
//     if (token !== null) {
//         let wasValid = await isValidAccessToken(token);
//         if (wasValid) {
//             return token;
//         } else {
//             redirectToLogin();
//         }
//     } else {
//         redirectToLogin();
//     }
// };


export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};
