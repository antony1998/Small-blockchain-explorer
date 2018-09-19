import User from '../models/user.model'
import Task from '../models/task.model'
import _ from 'lodash'
import errorHandler from './../helpers/dbErrorHandler'
import formidable from 'formidable'
import fs from 'fs'
import profileImage from './../../client/assets/images/profile-pic.png'

const create = (req, res, next) => {
  return res.status(200).json({
    message: "Here"
  })
  const task = new Task(req.body)
  task.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.status(200).json({
      message: "New task!"
    })
  })
}

/**
 * Load user and append to req.
 */
const userByID = (req, res, next, id) => {
  Task.findById(id)
    .populate('following', '_id name')
    .populate('followers', '_id name')
    .exec((err, user) => {
    if (err || !user) return res.status('400').json({
      error: "User not found"
    })
    req.profile = user
    next()
  })
}

const read = (req, res) => {
  //  const id = req.body;
  // return res.status(200).json({
  //   message: req.params.taskid
  // })
  Task.findOne({_id: req.params.taskid}, function(err, task){
    if(err) return res.status(500).json({error: err});
    if(!task) return res.status(404).json({error: 'task not found'});
    return res.json(task);
  })

  // Task.find({id: req.body.id})
  // Task.findById(id).exec(err, task) => {
  //   if (err || !user) return res.status('400').json({
  //     error: "User not found"
  //   })
  //   req.task = task
  // })
  // req.profile.hashed_password = undefined
  // req.profile.salt = undefined
  // return res.json(req.profile)
}

const list = (req, res) => {
  Task.find((err, tasks) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(tasks)
  }).select('name email updated created')
}

const update = (req, res, next) => {
  // return res.status(200).json({
  //   message: req.body.name
  // })
 

  Task.findById(req.params.taskid, function(err, task){
    if(err) return res.status(500).json({ error: 'database failure' });
    if(!task) return res.status(404).json({ error: 'task not found' });
    console.log("here is console")
    console.log(req.body.name);
    if(req.body.name) 
      task.name = req.body.name;
    // return res.status(200).json({
    //     message: req.body.name
    //   })
    // task.name = req.body.name;
    // task.save();
    task.save(function(err){
        if(err) res.status(500).json({error: 'failed to update'});
        return res.json(task);
    });

});
  // let form = new formidable.IncomingForm()
  // form.keepExtensions = true
  // form.parse(req, (err, fields, files) => {
  //   if (err) {
  //     return res.status(400).json({
  //       error: "Photo could not be uploaded"
  //     })
  //   }
  //   let user = req.profile
  //   user = _.extend(user, fields)
  //   user.updated = Date.now()
  //   if(files.photo){
  //     user.photo.data = fs.readFileSync(files.photo.path)
  //     user.photo.contentType = files.photo.type
  //   }
  //   user.save((err, result) => {
  //     if (err) {
  //       return res.status(400).json({
  //         error: errorHandler.getErrorMessage(err)
  //       })
  //     }
  //     user.hashed_password = undefined
  //     user.salt = undefined
  //     res.json(user)
  //   })
  // })
}

const remove = (req, res, next) => {
  // return res.status(200).json({
  //   message: "New task!"
  // })

  Task.remove({ _id: req.params.taskid }, function(err, output){
    if(err) return res.status(500).json({ error: "database failure" });

    /* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
    if(!output.result.n) return res.status(404).json({ error: "book not found" });
    res.json({ message: "book deleted" });
    */
    Task.find((err, tasks) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(tasks)
    }).select('name email updated created')
    // res.status(204).end();
  })
  // let task = req.profile
  // Task.remove((err, deletedTask) => {
  //   if (err) {
  //     return res.status(400).json({
  //       error: errorHandler.getErrorMessage(err)
  //     })
  //   }
  //   res.json(deletedTask)
  // })
}

const photo = (req, res, next) => {
  if(req.profile.photo.data){
    res.set("Content-Type", req.profile.photo.contentType)
    return res.send(req.profile.photo.data)
  }
  next()
}

const defaultPhoto = (req, res) => {
  return res.sendFile(process.cwd()+profileImage)
}

const addFollowing = (req, res, next) => {
  User.findByIdAndUpdate(req.body.userId, {$push: {following: req.body.followId}}, (err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    next()
  })
}

const addFollower = (req, res) => {
  User.findByIdAndUpdate(req.body.followId, {$push: {followers: req.body.userId}}, {new: true})
  .populate('following', '_id name')
  .populate('followers', '_id name')
  .exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    result.hashed_password = undefined
    result.salt = undefined
    res.json(result)
  })
}

const removeFollowing = (req, res, next) => {
  User.findByIdAndUpdate(req.body.userId, {$pull: {following: req.body.unfollowId}}, (err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    next()
  })
}
const removeFollower = (req, res) => {
  User.findByIdAndUpdate(req.body.unfollowId, {$pull: {followers: req.body.userId}}, {new: true})
  .populate('following', '_id name')
  .populate('followers', '_id name')
  .exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    result.hashed_password = undefined
    result.salt = undefined
    res.json(result)
  })
}

const findPeople = (req, res) => {
  let following = req.profile.following
  following.push(req.profile._id)
  User.find({ _id: { $nin : following } }, (err, users) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(users)
  }).select('name')
}

export default {
  create,
  userByID,
  read,
  list,
  remove,
  update,
  photo,
  defaultPhoto,
  addFollowing,
  addFollower,
  removeFollowing,
  removeFollower,
  findPeople
}
