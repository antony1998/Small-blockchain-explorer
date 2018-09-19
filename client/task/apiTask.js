const create = (task) => {
  console.log(task);
  return fetch('/api/tasks/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    .then((response) => {
      console.log(response);
      return response.json()
    }).catch((err) => console.log(err))
}

const list = () => {
  // let i;
  // for(i = 0; i< 10; i++)
  // {
  // return fetch('/api/tasks/', {
  //   method: 'GET',
  // }).then(response => {
  //   console.log(response);
  //   // return response.json()
  // }).catch((err) => console.log(err))
  // }
  return fetch('/api/tasks/', {
    method: 'GET',
  }).then(response => {
    console.log(response);
     return response.json()
  }).catch((err) => console.log(err))
}

const read = (params, credentials) => {
  console.log(params)
  return fetch('/api/tasks/' + params.taskid, {
    method: 'GET',
    // headers: {
    //   'Accept': 'application/json',
    //   'Content-Type': 'application/json',
    //   'Authorization': 'Bearer ' + credentials.t
    // }
  }).then((response) => {
    console.log(response)
    return response.json()
  }).catch((err) => console.log(err))
}

const update = (task) => {
  console.log(task);
  return fetch('/api/tasks/' + task.taskid, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    //   'Accept': 'application/json',
    //   'Authorization': 'Bearer ' + credentials.t
    },
    body: JSON.stringify(task)
  }).then((response) => {
    console.log(response);
    return response.json()
  }).catch((err) => {
    console.log(err)
  })
}

const remove = (params, credentials) => {
  console.log("remove");
  return fetch('/api/tasks/' + params.taskid, {
    method: 'DELETE',
    // headers: {
    //   'Accept': 'application/json',
    //   'Content-Type': 'application/json',
    //   // 'Authorization': 'Bearer ' + credentials.t
    // }
  }).then((response) => {
     return response.json()
  }).catch((err) => console.log(err))
}

const follow = (params, credentials, followId) => {
  return fetch('/api/users/follow/', {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    },
    body: JSON.stringify({userId:params.userId, followId: followId})
  }).then((response) => {
    return response.json()
  }).catch((err) => {
    console.log(err)
  })
}

const unfollow = (params, credentials, unfollowId) => {
  return fetch('/api/users/unfollow/', {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    },
    body: JSON.stringify({userId:params.userId, unfollowId: unfollowId})
  }).then((response) => {
    return response.json()
  }).catch((err) => {
    console.log(err)
  })
}

const findPeople = (params, credentials) => {
  return fetch('/api/users/findpeople/' + params.userId, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    }
  }).then((response) => {
    return response.json()
  }).catch((err) => console.log(err))
}

export {
  create,
  list,
  read,
  update,
  remove,
  follow,
  unfollow,
  findPeople
}
