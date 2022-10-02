import axios from 'axios';

 let baseURL='http://localhost:8001/api/admin/'

//let baseURL='https://young-sierra-48453.herokuapp.com/api/admin/'
export  const  authApi = (data)=>{
  console.log("the datas aer ", data)
  let url = baseURL + 'login'
  const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' }
  const options = {method:'POST', data:data};
return(
    axios.post(url,data)
    .then((res) => {
       

       return(res.data)
    })
    .catch((err)=>{

      return(err)
    }

  
    ))


}




export  const  getProductApii = ()=>{


      //   let url = baseURL + 'getProduct'
   
      // return(
      //     axios.get(url)
      //     .then((res) => {
             

      //        return(res.data)
      //     })
      //     .catch((err)=>{

      //       return(err)
      //     }
 
        
      //     ))
   
  
}
export  const  addProductApi = (data)=>{
  let url = baseURL + 'addProduct'
  const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' }
  const options = {method:'POST', data:data};
return(
    axios.post(url,data)
    .then((res) => {
       

       return(res.data)
    })
    .catch((err)=>{

      return(err)
    }

  
    ))


}

export  const  getProductApi = ()=>{


    let url = baseURL + 'getProduct'

  return(
      axios.get(url)
      .then((res) => {
         

         return(res.data)
      })
      .catch((err)=>{

        return(err)
      }

    
      ))


}

export  const  updateProductApi = (data)=>{
  let url = baseURL + 'updateProduct'
  const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' }
  const options = {method:'POST', data:data};
return(
    axios.post(url,data)
    .then((res) => {
       

       return(res.data)
    })
    .catch((err)=>{

      return(err)
    }

  
    ))


}

export  const  deleteProductApi = (id)=>{
  let url = baseURL + 'deleteProduct/' + id
  const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' }
return(
    axios.delete(url,headers)
    .then((res) => {
       

       return(res.data)
    })
    .catch((err)=>{

      return(err)
    }

  
    ))


}

export  const  addQasetApi = (data)=>{
  let url = baseURL + 'addQAset'
  const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' }
  const options = {method:'POST', data:data};
return(
    axios.post(url,data)
    .then((res) => {
       

       return(res.data)
    })
    .catch((err)=>{

      return(err)
    }

  
    ))


}


export  const  getQasetApi = (data)=>{
  let url = baseURL + 'getQAset'
  const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' }
  const options = {method:'POST', data:data};
return(
    axios.get(url)
    .then((res) => {
       

       return(res.data)
    })
    .catch((err)=>{

      return(err)
    }

  
    ))


}

export  const  deleteQAsetApi = (id)=>{
  let url = baseURL + 'deleteQAset/' + id
  const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' }
return(
    axios.delete(url,headers)
    .then((res) => {
       

       return(res.data)
    })
    .catch((err)=>{

      return(err)
    }

  
    ))


}


export  const  addMCQApi = (data)=>{
  console.log("the datas aer ", data)
  let url = baseURL + 'addMCQ'
  const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' }
  const options = {method:'POST', data:data};
return(
    axios.post(url,data)
    .then((res) => {
       

       return(res.data)
    })
    .catch((err)=>{

      return(err)
    }

  
    ))


}

export  const  updateQAsetApi = async (data)=>{

  let url = baseURL + 'updateQAset'
  const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' }
  const options = {method:'POST', data:data};
return(
   await axios.post(url,options)
    .then((res) => {
       

       return(res.data)
    })
    .catch((err)=>{

      return(err)
    }

  
    ))


}

export  const  updateChapterWeightageApi = async (data)=>{

  let url = baseURL + 'updateChapterWeightage'
  const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' }
  const options = {method:'POST', data:data};
return(
   await axios.post(url,options)
    .then((res) => {
       

       return(res.data)
    })
    .catch((err)=>{

      return(err)
    }

  
    ))


}
export  const  getAllMcqApi = async (data)=>{

  let url = baseURL + 'getAllChapters'
  const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' }
  const options = {method:'POST', data:data};
return(
   await axios.post(url,options)
    .then((res) => {
       

       return(res.data)
    })
    .catch((err)=>{

      return(err)
    }

  
    ))


}


export  const  getMcqListApi = async (data)=>{

  let url = baseURL + 'getMCQList'
  const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' }
  const options = {method:'POST', data:data};
return(
   await axios.post(url,options)
    .then((res) => {
       

       return(res.data)
    })
    .catch((err)=>{

      return(err)
    }

  
    ))


}


export  const  updateMcqApi = async (data)=>{

  let url = baseURL + 'updateMCQ'
  const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' }
  const options = {method:'POST', data:data};
return(
   await axios.post(url,options)
    .then((res) => {
       

       return(res.data)
    })
    .catch((err)=>{

      return(err)
    }

  
    ))


}


export  const  deleteMcqApi = async (data)=>{

  let url = baseURL + 'deleteMCQ'
  const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' }
  const options = {method:'POST', data:data};
return(
   await axios.post(url,options)
    .then((res) => {
       

       return(res.data)
    })
    .catch((err)=>{

      return(err)
    }

  
    ))


}

export  const  getCategoryListApi = ()=>{


    let url = baseURL + 'getCategoryList'

  return(
      axios.get(url)
      .then((res) => {
         

         return(res.data)
      })
      .catch((err)=>{

        return(err)
      }

    
      ))


}


export  const  getSubjectListApi = (category)=>{


  let url = baseURL + 'getSubject/'+category

return(
    axios.get(url)
    .then((res) => {
       

       return(res.data)
    })
    .catch((err)=>{

      return(err)
    }

  
    ))


}