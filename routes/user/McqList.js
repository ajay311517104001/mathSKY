const router = require("express").Router();

const QAset = require("../../models/Admin/Qaset");

/* ---------------------------------    MCQ TEST QUESTION GENERATION METHOD  -------------------------------------- */

router.post("/getMcqTestList", async (req, res) => {
  const { id } = req.body;
  function randomNumber(weightage, max) {
    var arr = [];
    while (arr.length < weightage) {
      var r = Math.floor(Math.random() * max);
      if (arr.indexOf(r) === -1) arr.push(r);
    }

    return arr;
  }
  try{
    const QAsets = await QAset.find(
      {
        _id: id,
      },
      { chapters: 1, StdName: 1 }
    );
  
    if (QAsets[0].chapters.length > 0 && QAsets[0].StdName) {
      let McqTestList = [];
      //10 chapters
      QAsets[0].chapters.map((item, index) => {
        randomNumber(item.weightage, item.mcqList.length).map((i, index) => {
          McqTestList.push(item.mcqList[i]);
        });
      });
  
      let stdName = QAsets[0].StdName;
  
      res.status(200).json({ StdName: stdName, McqTestList: McqTestList });
    } else {
      res.status(500).json("TEST MCQ GENERATION FAILED");
    }
  }catch(err){
    res.status(500).json({ SERVER_ERROR : "TEST MCQ GENERATION FAILED"});
  }

});

module.exports = router;
