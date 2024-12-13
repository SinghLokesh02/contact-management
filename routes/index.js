var express = require("express");
var router = express.Router();
const user = require("./users");

router.get("/", function (req, res, next) {
  res.render("index", { data: null });
});
router.get("/create", function (req, res, next) {
  res.render("create", { title: "Express" });
});
router.get("/show-data", async function (req, res, next) {
   let data = await user.find();
   res.render("showdata",{data: data});
});
router.get("/update", function (req, res, next) {
  res.render("update", { data: "" });
});
router.get("/delete", function (req, res, next) {
  res.render("delete", { title: "Express" });
});
router.get("/search", function (req, res, next) {
  res.render("search", { title: "Express" });
});

// Route for Data
router.post("/create-request", async function (req, res, next) {
  try{
    let check = await user.create({
      name : req.body.name,
      email : req.body.email,
      contact : req.body.contact
    })
    if(check){
      res.render("index",{data : "User created successfully"})
    }
  }catch(err){
    res.render("index",{data: "User Already Exists!!"})
  }
});



// Update
router.post("/update-request", async function (req, res, next) {
  try{
    let updatedUser = await user.findOneAndUpdate(
      {
        email: req.body.email,
        contact: req.body.contact,
      },
      { $set: { contact: req.body.ncontact } },
      { new: true }
    );
    if(updatedUser){
      res.render("update",{data : "User updated successfully"})
    }
    else{
      res.render("update",{data: "No user found with given email and contact number"})
    }
  }
  catch(err){
    res.render("update",{data: "Some error occured"})
  }
})

module.exports = router;
