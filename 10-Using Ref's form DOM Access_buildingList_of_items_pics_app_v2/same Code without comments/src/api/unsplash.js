import axios from 'axios';


export default axios.create({  //creates a instance of axios client with default properties
    baseURL: 'https://api.unsplash.com',
    headers:{
        Authorization: 'Client-ID 48p0zagdDB9j9714tq123lY_HOigFrvLifGT9Ie5mEg'
    }
});











//*other way to make request instance or wny other thing directly
// const response = await axios.get('https://api.unsplash.com/search/photos',{
//             params:{
//                 query:term
//             },
//             headers:{
//                 Authorization: 'Client-ID 48p0zagdDB9j9714tq123lY_HOigFrvLifGT9Ie5mEg'
//             }
//         })
        // .then(response=>{
        //     console.log(response.data.results);
        // })