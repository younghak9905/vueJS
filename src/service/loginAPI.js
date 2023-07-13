import axios from 'axios';
const getUserInfo = (userId, userPw) => {
    const reqData = {
       username: userId,
        password: userPw
    };
   // let serverUrls = 'http://localhost:8081';

    return axios.post(this.$serverUrl + '/login', reqData)
        .then(response =>{
            console.log("response.data: " + response.data);
            response.data})
.catch(error => {
        throw new Error('Failed to login: ' + error.message);
    });
};

export default {
    async doLogin(userId, userPw) {
        try {
            const getUserInfoPromise = getUserInfo(userId, userPw);
            console.log(getUserInfoPromise);
            const [userInfoResponse] = await Promise.all([getUserInfoPromise]);
            if (userInfoResponse.data.length === 0) {
                return 'notFound';
            } else {
                localStorage.setItem('user_token', userInfoResponse.data.user_token);
                localStorage.setItem('user_role', userInfoResponse.data.user_role);
                console.log(userInfoResponse.data.user_token);
                console.log(userInfoResponse.data.user_role);
                return userInfoResponse;
            }
        } catch (err) {
            console.error(err);
        }
    },
    async doLogout() {
        try {
            localStorage.removeItem('user_token');
            localStorage.removeItem('user_role');
            return 'logout';
        } catch (err) {
            console.error(err);
        }
    }
};