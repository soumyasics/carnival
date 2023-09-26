const blogSchema = require("./blogSchema");

const multer=require('multer')

    const storage=multer.diskStorage({
       destination:function(req,res,cb){
           cb(null,'./upload')
       },
       filename:function(req,file,cb){
           cb(null,file.originalname)
       }
    })

    const upload=multer({storage:storage})


const addBlog=(req,res)=>{
    const newStudent=new blogSchema({
        p1:req.body.p1,
        p2:req.body.p2,
        p3:req.body.p3,
        title:req.body.title,
        cid:req.params.id,
        img:req.files,
      

    })
    newStudent.save()
    .then(data=>{
     res.json({
         status:200,
         msg:"Inserted successfully",
         data:data
     })
    })
    .catch(err=>{
     console.log(err);
     res.json({
         status:500,
             msg:"Data not Inserted",
             Error:err.stack
     })
    })
 }

 
//View   blogs by  id

const viewBlogsById=(req,res)=>{
  
    blogSchema.findById({_id:req.params.id}).populate('cid').exec()
    .then(data=>{
      console.log(data);
      res.json({
          status:200,
          msg:"Data obtained successfully",
          data:data
      })
    
  }).catch(err=>{
    console.log(err);
      res.json({
          status:500,
          msg:"No Data obtained",
          Error:err
      })
  })
  
  }
//View  all blogs

const viewAllBlogs=(req,res)=>{
  
    blogSchema.find({}).populate('cid').exec()
    .then(data=>{
      console.log(data);
      res.json({
          status:200,
          msg:"Data obtained successfully",
          data:data
      })
    
  }).catch(err=>{
    console.log(err);
      res.json({
          status:500,
          msg:"No Data obtained",
          Error:err
      })
  })
  
  }

  //View   blogs by Cord Id

const viewMyBlogsByCid=(req,res)=>{
  
    blogSchema.find({cid:req.params.id}).exec()
    .then(data=>{
      console.log(data);
      res.json({
          status:200,
          msg:"Data obtained successfully",
          data:data
      })
    
  }).catch(err=>{
    console.log(err);
      res.json({
          status:500,
          msg:"No Data obtained",
          Error:err
      })
  })
  
  }

  
// add reviews
const addReview=(req,res)=>{
    let review=req.body.review
    let arr=[]
    blogSchema.findById({_id:req.params.id}).exec()
    .then(data=>{
    arr=data.reviews
    arr.push(review)
    console.log(arr);
    blogSchema.findByIdAndUpdate({_id:req.params.id},{
      reviews:arr
    }).exec()
    .then(data=>{
      
      res.json({
          status:200,
          msg:"Data obtained successfully",
          data:data
      })
    
  }).catch(err=>{
      res.json({
          status:500,
          msg:"Data not Inserted",
          Error:err
      })
  })
  })
  }

  
//View   blogs by  id

const deleteBlogsById=(req,res)=>{
  
    blogSchema.findByIdAndDelete({_id:req.params.id}).exec()
    .then(data=>{
      res.json({
          status:200,
          msg:"Data deleted successfully"
       
      })
    
  }).catch(err=>{
    console.log(err);
      res.json({
          status:500,
          msg:"No Data obtained",
          Error:err
      })
  })
  
  }
  
 module.exports={addBlog,upload,viewAllBlogs,viewBlogsById,viewMyBlogsByCid,addReview,deleteBlogsById}