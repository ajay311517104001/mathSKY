import axios from 'axios';

// let baseURL='http://localhost:8001/api/'

  let baseURL='https://young-sierra-48453.herokuapp.com/api/'



export  const  authSignUpApi = (data)=>{
  console.log("the datas aer ", data)
  let url = baseURL + 'auth/register'
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



export  const  authSignInApi = (data)=>{
    console.log("the datas aer ", data)
    let url = baseURL + 'auth/login'
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
  
export  const  getCategoryListApi = ()=>{


    let url = baseURL + 'products/getCategoryList'

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
    let url = baseURL + 'products/getSubject/'+category
  return(
      axios.get(url)
      .then((res) => {
        return(res.data)
      })
      .catch((err)=>{
  
        return(err)
}))
}

export  const  getProductsApi = (data)=>{
    let url = baseURL + 'products/getProducts'
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

  export  const  getSubscriptionInfoApi = (data)=>{
    console.log("the entered data is",data)
    let url = baseURL + 'products/getSubscriptionInfo'
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
  
  export  const  getTestMcqListApi = (data)=>{
    let url = baseURL + 'products/mcqtestseriesInfo'
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
  
  export  const  getQuestionSetApi = (data)=>{
    let url = baseURL + 'mcqList/getMcqTestList'
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
  

  export  const  googleAuthApi = (data)=>{
    let url = baseURL + 'auth/GoogleLogin'
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
  


  export  const  updateTestModuleStatus = (data)=>{
    let url = baseURL + 'users/UpdateTestModuleStatus'
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


export  const  UpdateTestModuleData = (data)=>{
    let url = baseURL + 'users/UpdateTestModuleData'
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



  export  const  getTestModulestatus = (data)=>{
    let url = baseURL + 'products/getTestModulestatus'
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

export  const  getCategoryListApii = ()=>{


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


export  const  getSubjectListApii = (category)=>{


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