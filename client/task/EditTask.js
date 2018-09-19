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
import {create, read, update} from './apiTask'
import {list} from './apiTask'

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

class EditTask extends Component {
  
    state = {
      taskname: '',
      password: '',
      error: '',
      redirectToReferrer: false,
      taskid: 0
  }

  constructor(){
    super();
    this.clickUpdate = this.clickUpdate.bind(this);
    }

    componentDidMount() {   
        this.setState({ taskid: window.location.href.split('edit/')[1]});
        console.log(this.state.taskid);
        this.ReadTask(window.location.href.split('edit/')[1]);
        // this.taskData = new FormData();
        // this.setState({taskname : "asfdsafdas"})
    }
    ReadTask = (id) => {
        read({
            taskid: id
          }).then((data) => {
            if (data.error) {
              } else {
                  console.log(data)
                this.setState({taskname: data.name})
            
            }
          })
    }
  clickUpdate = () => {
    const task = {
        taskid: this.state.taskid,
        name: this.state.taskname || undefined,
    }
    update(task).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
          console.log(data);
        this.setState({error: '', open: true})
      }
    })
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
    console.log(this.state.taskid);
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
          <Typography type="headline" component="h2" className={classes.title}>
            EditTask
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
          <Button color="primary" variant="raised" onClick={this.clickUpdate} className={classes.submit}>Update</Button>
        </CardActions>
      </Card>
    )
  }
}

EditTask.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EditTask)
