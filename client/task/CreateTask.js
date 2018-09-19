import React, {Component} from 'react'
import Card, {CardActions, CardContent} from 'material-ui/Card'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import Icon from 'material-ui/Icon'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import auth from './../auth/auth-helper'
import {Redirect} from 'react-router-dom'
import {create} from './apiTask'
import {list} from './apiTask'
// import './jquery.nok'

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 2
  },
  error: {
    verticalAlign: 'middle'
  },
  title: {
    marginTop: theme.spacing.unit * 2,
    color: theme.palette.openTitle
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing.unit * 2
  }
})


class CreateTask extends Component {
  
  state = {
      taskname: '',
      password: '',
      error: '',
      redirectToTaskIndex: false
  }
  

  clickSubmit = () => {
    const task = {
      name: this.state.taskname || undefined,
    }
    create(task).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({error: '', open: true})
        this.setState({redirectToTaskIndex: true})
        
        this.clickSuccess();
      }
    })
  }

  clickSuccess = () => {
    $.nok({
      message: "Task Created!",
      type: "success",
      stay: 0
    });
  }
  clickList = () => {
    console.log("list");
    list().then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        console.log(data);
        // this.setState({users: data})
      }
    })
  }

  handleChange = name => event => {
    this.setState({[name]: event.target.value})
  }

  render() {
    if(this.state.redirectToTaskIndex){
      return (<Redirect to='/taskManagement'/>);
    }
    const {classes} = this.props
    const {from} = this.props.location.state || {
      from: {
        pathname: '/'
      }
    }
    const {redirectToReferrer} = this.state
    if (redirectToReferrer) {
      return (<Redirect to={from}/>)
    }

    return (

      <Card className={classes.card}>
        <CardContent>
          <button id="success" className="btn btn-success"  onClick={this.clickSuccess} >Success</button>
          <Typography type="headline" component="h2" className={classes.title}>
            Create Task
          </Typography>
          <TextField id="taskname" type="taskname" label="taskname" className={classes.textField} value={this.state.taskname} onChange={this.handleChange('taskname')} margin="normal"/><br/>
          <br/> {
            this.state.error && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {this.state.error}
            </Typography>)
          }
        </CardContent>
        <CardActions>
          <Button color="primary" variant="raised" onClick={this.clickSubmit} className={classes.submit}>Create</Button>
          <Button color="primary" variant="raised" onClick={this.clickList} className={classes.submit}>List</Button>
        </CardActions>
      </Card>
    )
  }
}

CreateTask.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CreateTask)