//all the code related to getting data from unsplash api
import axios from 'axios';

export default axios.create({      //create method is going to create a instance of the axios client with the couple of defaulted properties
    baseURL:'https://api.unsplash.com',
    headers:{     
        Authorization: 'Client-ID lMY-rUZhM5LQeTHL6_853hAAAjdgw8RCCjTKyEkbkfY'
    }
});
