// Find First 10 News Items
News.find({
  deal_id:deal._id // Search Filters
},
['type','date_added'], // Columns to Return
{
  skip:0, // Starting Row
  limit:10, // Ending Row
  sort:{
      date_added: -1 //Sort by Date Added DESC
  }
},
function(err,allNews){
  socket.emit('news-load', allNews); // Do something with the array of 10 objects
})


{[
  "Phó phòng",
  "Tổ trưởng",
  "Tổ phó",
  "Chuyên viên",
  "Nhân viên",
  "Tập sự",
  "Thử việc",
].indexOf(users_function) == -1 ? (
  
) : null}
