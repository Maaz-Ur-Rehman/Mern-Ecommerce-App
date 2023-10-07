import axios from "axios"

// const URL=process.env.REACT_APP_API

const URL="http://localhost:7000"
export const signup=async(data)=>{

    console.log(URL,"url")
    try{
        console.log(data,"dataapi")
        return await axios.post(`${URL}/register`,data)
    }
    catch(err){

        console.log(`err occur in api file ${err}`)


    }
}
export const signupGoogle=async(data)=>{

    console.log(URL,"url")
    try{
        console.log(typeof(data),"dataapi")
        return await axios.post(`${URL}/register`,data)
    }
    catch(err){

        console.log(`err occur in api file ${err}`)


    }
}
export const signInGoogle=async(data)=>{

    console.log(URL,"url")
    try{
        console.log(typeof(data),"dataapi")
        return await axios.post(`${URL}/login`,data)
    }
    catch(err){

        console.log(`err occur in api file ${err}`)


    }
}
export const login=async(data)=>{

    try{
        return await axios.post(`${URL}/login`,data)
    }
    catch(err){
        
        console.log(`err occur in api file ${err}`)


    }

}

export const forgot=async(data)=>{
    try{
        return await axios.post(`${URL}/forgot-pass`,data)
      
    }
    catch(err){
        console.log(`err occur in api file ${err}`)
    }
}


export const getCategory = async () => {
    try {
      const  {data}  = await axios.get(`${URL}/get-all-category`);
    //   console.log(data, 'data');
      return data; // Return the data to the caller
    } catch (err) {
      console.log(err.message);
      console.log(`Error occurred in API file: ${err.message}`);
      throw err; // Re-throw the error to the caller
    }
  };
  
export const createCategory=async(data)=>{
    try{
        
        return await axios.post(`${URL}/create-category`,data)

    }
    catch(err){
        console.log(`err occur in api file ${err}`)
        
    }
}
export const deleteCategory=async(id)=>{
    // console.log(data,"data")
    try{
        
        return await axios.delete(`${URL}/delete-single-category/${id}`)

    }
    catch(err){
        console.log(`err occur in api file ${err}`)
        
    }
}
export const updateCategory=async(data)=>{
    // const {name,id}=data
    console.log(data,"data")
    try{
        
        return await axios.put(`${URL}/update-category/${data.id}`,data)

    }
    catch(err){
        console.log(`err occur in api file ${err}`)
        
    }
}
export const createProduct=async(data)=>{
    console.log(data,"data")
    try{
        
        return await axios.post(`${URL}/create-product`,data)

    }
    catch(err){
        console.log(`err occur in api file ${err}`)
        
    }
}

export const getProducts = async () => {
    try {
      const  {data}  = await axios.get(`${URL}/get-products`);
      return data; 
    } catch (err) {
      console.log(err.message);
      console.log(`Error occurred in API file: ${err.message}`);
      throw err; 
    }
  };
//   export const getPhoto = async (id) => {
//     console.log(id,"id")
//     try {
//       const  {data}  = await axios.get(`${URL}/get-photo/${id}`);
//       return data; 
//     } catch (err) {
//       console.log(err.message);
//       console.log(`Error occurred in API file: ${err.message}`);
//       throw err; 
//     }
//   };