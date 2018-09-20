import express from 'express'
import userCtrl from '../controllers/user.controller'
import taskCtrl from '../controllers/task.controller'
import internaltransCtrl from '../controllers/internaltrans.controller'
import authCtrl from '../controllers/auth.controller'
const router = express.Router()

router.route('/api/internal')
  .get(internaltransCtrl.list)
  .post(internaltransCtrl.create)

  // router.route('/api/etherscans')
  // .get(etherscansCtrl.list)
  // .post(etherscansCtrl.create)

router.route('/api/users/photo/:userId')
  .get(userCtrl.photo, userCtrl.defaultPhoto)
router.route('/api/users/defaultphoto')
  .get(userCtrl.defaultPhoto)

router.route('/api/users/follow')
    .put(authCtrl.requireSignin, userCtrl.addFollowing, userCtrl.addFollower)
router.route('/api/users/unfollow')
    .put(authCtrl.requireSignin, userCtrl.removeFollowing, userCtrl.removeFollower)

router.route('/api/users/findpeople/:userId')
   .get(authCtrl.requireSignin, userCtrl.findPeople)

router.route('/api/tasks/:taskid')
  .get(taskCtrl.read)
  .put(taskCtrl.update)
  .delete( taskCtrl.remove)

router.param('userId', userCtrl.userByID)

// router.route('/api/tasks')
//   .get(taskCtrl.list)
//   .post(taskCtrl.create)
export default router
