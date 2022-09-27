

const router = require("express").Router();

const QAset = require("../models/Admin/Qaset");



router.post("/getMcqTestList", async(req, res) => {
    const {id}=req.body
    function randomNumber(weightage, max) {
        var arr = [];
        while(arr.length < weightage){
            var r = Math.floor(Math.random() * max) ;
            if(arr.indexOf(r) === -1) arr.push(r);
        }
        console.log(arr)
        return arr
    }

    const QAsets = await QAset.find({
        _id:id
    },{chapters:1,StdName:1})
    
    if(QAsets[0].chapters.length>0 && QAsets[0].StdName){
      
       let McqTestList =[]
       //10 chapters
       QAsets[0].chapters.map((item,index)=>{
           // console.log(item)
        randomNumber(item.weightage,item.mcqList.length).map((i,index)=>{
            McqTestList.push(item.mcqList[i])
        })
       })

        let stdName=QAsets[0].StdName
       

console.log("the std name is",QAsets[0].StdName)
    //   for(let i=0;i<QAsets[0].chapters.length;i++){
           
    //         let rand = randomNumber(0,QAsets[0].chapters[i].mcqList.length-1)
    //            McqTestList.push(QAsets[0].chapters[i].mcqList[rand])
           
       
    //     }

    //   console.log("the mcq list is",QAsets[0]["chapters"])
        
      res.status(200).json( { StdName:stdName, McqTestList:McqTestList});
    }else{
      res.status(500).json("failure");
    }
    
  
  }
  
  );

module.exports = router;