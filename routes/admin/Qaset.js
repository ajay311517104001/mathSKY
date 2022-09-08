const router = require("express").Router();


const QAset = require("../../models/Admin/Qaset");
const addMCQ =require("../../models/Admin/addMcq")
const {v4 : uuidv4} = require('uuid');




// ---------------------- QA SET CRUD -----------------------------------

router.post("/addQAset", async (req, res) => {
     console.log("the body is ",req.body)
     let  {category, Subject,totalChapters,StdName}=req.body
     let chapters_array=[]
             for(let i =0; i<totalChapters;i++){
                  chapters_array.push({
                    chapterNo: "Chapter "+ Number(i+1),
                    mcqList:[]
                  })}
   
      if (req.body) {
        const newQAset = new QAset({
          category: category,
          Subject:Subject,
          totalChapters:totalChapters,
          StdName:StdName,
          chapters:chapters_array
        });
        console.log("the new product is ", newQAset)
        await newQAset.save();
        res.status(200).json("success");
      } else {
        res.status(500).json("failure");
      }}
    
  )

router.get("/getQAset", async(req, res) => {

    const QAsets = await QAset.find({},{chapters:0});
    if(QAsets){
        
      res.status(200).json(QAsets);
    }else{
      res.status(500).json("failure");
    }
    
  
  }
  
  );

  router.post("/updateQAset", async (req, res) => {
    console.log("the updateQAset Body ",req.body)

    let  {category, Subject,StdName,id}=req.body.data
     if (req.body) {

      const _QAset = await QAset.findOne(
        {
            _id: id
        }
    );
    try{
      if(_QAset){
       
        _QAset.category= category
        _QAset.Subject=Subject
        _QAset.StdName=StdName

        
        await _QAset.save();
        res.status(200).json({"message":"success"});
      }else{
        res.status(500).json("QAset updation error");
      }
    }catch(err){
      console.log("product update err",err)
    }
    
       
      // console.log("the new product is ", user)
    
     } else {
       res.status(500).json("failure");
     }
    
    }
   
 )

 router.delete("/deleteQAset/:_id",async(req,res)=>{
  console.log("the body is ",req.params._id)
  const {_id}=req.params
  try{
    if(_id){
     await QAset.deleteOne(
        {
            _id: _id
        }
      
       
    );
  
  
    }
  }catch(err){
    console.log("err in admin QAset delete api")
  }
  res.status(200).json({"message":"success"});

 })


 router.get("/getCategoryList", async(req, res) => {
  // console.log(" the params are", req.body)
  // const {id,chapterNo} =req.body.data
  try{
      const QAsets = await QAset.find({ } , {"category":1});
      //res.status(200).json(QAsets);
      if(QAsets){
          let tempArr =[]
          QAsets.forEach(element => {
              if(element.category){
                   tempArr.push(element.category)
                  
           } })

           uniq = [...new Set(tempArr)];
        res.status(200).json(uniq);
      }else{
        res.status(500).json(" err in geting the all mcq datae");
      }
  }catch(err){
      res.status(500).json(" err in geting the all mcq datae");
  }
 
  

}

);

router.get("/getSubject/:_category",async(req,res)=>{
  console.log("the body is ",req.params._category)
  const {_category}=req.params
  try{
    if(_category){
   const sub = await  QAset.find({category: _category} , {"Subject":1});


    if(sub){

      let tempArr =[]
      sub.forEach(element => {
          if(element.Subject){
               tempArr.push(element.Subject)
              
       } })

    res.status(200).json(tempArr);
      }

    }
  }catch(err){
    console.log("err in admin product delete api")
  }

 })
// ---------------------- MCQ CRUD -----------------------------------



 router.post("/addMCQ", async (req, res) => {
    console.log("the body is ",req.body)
    const quesId = uuidv4()
    console.log("the body is ",quesId)
    let  {ques, options , chapterNo,ans,id}=req.body
  
     if (req.body) {
       const newAddMcq = {
        quesId:quesId,
        ques: ques,
        options:options,
    
        ans:ans
       }
    //    const _QAset = await QAset.findOne(
    //     {
    //         category: category
    //     });
        try{
          // if(_QAset){
              
            //    for(let i=0; i < _QAset.chapters.length ; i++){

            //        if(_QAset.chapters[i].chapterNo==chapterNo){



            //         _QAset.chapters[i].mcqList.push(newAddMcq)
            //         await _QAset.save();
            //         console.log("the chapter no is",  _QAset.chapters[i])
                   
            //        }
            //    }
            
        //    }else{
        //        console.log("some err in addmcq api")
        //    }


       await QAset.updateOne(
                    { "_id": id , "chapters.chapterNo":chapterNo },
                    {
                        $push: {
                            "chapters.$.mcqList": {
                                quesId:quesId,
                                ques: ques,
                                options:options,
                              
                                ans:ans
                               }
                        }
                    }
                );
      //  await QAset.save()
        }catch(err){
            console.log("err in addmcq api",err)
        }

     //  await newQAset.save();
       res.status(200).json("success");
     } else {
       res.status(500).json("failure");
     }}
   
 )

 router.post("/getAllChapters", async(req, res) => {
    console.log(" the params are", req.body)
    const {id,chapterNo} =req.body.data
    try{
        const QAsets = await QAset.findOne({"_id": id } , {"chapters.chapterNo":1});
        res.status(200).json(QAsets);
        // if(QAsets){
        //     let tempArr =[]
        //     QAsets.chapters.forEach(element => {
        //         if(element.chapterNo){
        //              tempArr.push(element.chapterNo)
                    
        //      } })

            
        //   res.status(200).json(tempArr);
        // }else{
        //   res.status(500).json(" err in geting the all mcq datae");
        // }
    }catch(err){
        res.status(500).json(" err in geting the all mcq datae");
    }
   
    
  
  }
  
  );


  router.post("/getMCQList", async(req, res) => {
      const {id,chapterNo} =req.body.data
    console.log(" the params are", req.body)
    try{
        const QAsets = await QAset.findOne({"_id": id } , "chapters");
        if(QAsets){
            QAsets.chapters.forEach(element => {
                if(element.chapterNo== chapterNo){
                    res.status(200).json(element)
             } })
         
        }else{
          res.status(500).json(" err in geting the all mcq datae");
        }
    }catch(err){
        res.status(500).json(" err in geting the all mcq datae");
    }
   
    
  
  }
  
  );



 router.post("/updateMCQ", async(req, res) => {
    console.log(" the params are", req.body)
    const {id,chapterNo,quesId,ques,options,ans} =req.body.data
    try{
     const result=   await QAset.findOneAndUpdate(
            { "_id": id ,
             "chapters":{
                 "$elemMatch":{
                     "chapterNo":chapterNo,
                     "mcqList.quesId":quesId
                 }

             }}
             
    
            ,{
                $set: {
                    "chapters.$[outer].mcqList.$[inner].ques": ques,
                    "chapters.$[outer].mcqList.$[inner].options":options,
                    "chapters.$[outer].mcqList.$[inner].ans":ans
                   
                }
            },
            {
                "arrayFilters":[
                    { "outer.chapterNo": chapterNo },
                    { "inner.quesId": quesId }
                ]
            },
           
            
           )
           if(result){
               res.status(200).json({"message":"success"})
           }else{
            res.status(500).json(" MCQ updation failed");
           }
    
        

    }catch(err){
        res.status(500).json(" err in geting the all mcq datae");
    }
   
    
  
  }
  
  );


  router.post("/deleteMCQ", async(req, res) => {
   // console.log(" the params are", req.body)
   const {id,quesId} =req.body.data
    try{
     const result=   await QAset.updateOne(   {_id:id} 
     , {$pull : {"chapters.$[].mcqList" : {"quesId":quesId}}}
     
     )
           if(result){
               res.status(200).json({"message":"success"})
           }else{
            res.status(500).json(" MCQ deletion failed");
           }
    
        

    }catch(err){
        res.status(500).json(" err in geting the all mcq datae");
    }
   
    
  
  }
  
  );

module.exports = router;
