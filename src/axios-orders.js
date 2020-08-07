import axios from 'axios';


const instance=axios.create({
    baseURL:'https://myburger-91cc8.firebaseio.com/'
});


export default instance;