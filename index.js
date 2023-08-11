import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
var tasks=[];
var workList=[];
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
app.get("/", (req, res) => {
 
  res.render("home.ejs");
});
app.get("/today", (req, res) => {
 
  const today = new Date();
  const day = today.getDay();
  const date = today.getDate();
  const month = today.getMonth();
  var monthName = monthsArray[month];
  var dayName = days[day];
//     console.log(today);
//    console.log( day);
//    console.log(dayName);
//    console.log(date);
//    console.log(month);
//    console.log(monthName);
 const data = dayName + "," + " " + date + " "+ monthName ;
//    console.log(data);
//  res.render("today.ejs",{head:data});
 res.render("today.ejs", { todos: tasks ,head :data
 });
});
app.post("/submit", (req, res) => {
  const today = new Date();
  const day = today.getDay();
  const date = today.getDate();
  const month = today.getMonth();
  var monthName = monthsArray[month];
  var dayName = days[day];
  const data = dayName + "," + " " + date + " "+ monthName ;
  const newTask = req.body.task;
  tasks.push(newTask);
  // res.render("today.ejs", { todos: tasks ,head :data
  // });
  res.redirect("/today");
 
});

app.get("/worklist", (req, res) => {
 
  res.render("worklist.ejs", { todos: workList
  });
});
app.post("/done", (req, res) => {
  const newWorkList = req.body.work;
  workList.push(newWorkList);
 
  res.redirect("/worklist");
 
});
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});