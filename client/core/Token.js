import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import Card, {CardContent, CardMedia} from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import seashellImg from './../assets/images/seashell.jpg'
import {Link} from 'react-router-dom'
import Grid from 'material-ui/Grid'
import auth from '../auth/auth-helper'
import FindPeople from '../user/FindPeople'
import Newsfeed from '../post/Newsfeed'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: 30,
  },
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing.unit * 5
  },
  title: {
    padding:`${theme.spacing.unit * 3}px ${theme.spacing.unit * 2.5}px ${theme.spacing.unit * 2}px`,
    color: theme.palette.text.secondary
  },
  media: {
    minHeight: 330
  }
})

class Token extends Component {
  state = {
    defaultPage: true,
    address: '',
    token: '',
    module: '',
    data : [],
    redirect : false
  }
  init = () => {
    if(auth.isAuthenticated()){
      this.setState({defaultPage: false})
    }else{
      this.setState({defaultPage: true})
    }
  }
  componentWillReceiveProps = () => {
    this.init()
  }
  componentDidMount = () => {
    this.init()
  }
  handleChange = name => event => {
    this.setState({[name]: event.target.value})
  }


  getData = () => {
    console.log(this.state.address);
    let url1 = "https://api.etherscan.io/api?module=stats&action=tokensupply&contractaddress=" + this.state.address +"&apikey=YourApiKeyToken";
    console.log(url1);
    fetch(url1, {
      method: 'GET',
    }).then((response) => {
      return response.json();}
    ).then(data =>{
      this.setState({token:data.result});
      console.log(this.state.balance);
    }).catch((err) => console.log(err))
}
  render() {
    const {classes} = this.props
    const leftPadding = {
      marginLeft:20
    };
    const boxWidth = {
      width:500
    }
    if(this.state.data.result == undefined) {
      return (<div>
        <form action="/action_page.php" style={leftPadding}>
          <TextField style={boxWidth} id="address" type="address" label="address" className={classes.textField} value={this.state.address} onChange={this.handleChange('address')} margin="normal"/>
          <button type="button" className="btn btn-info"  onClick={()=> this.getData()} >Search</button>
          {/* <div style={leftPadding}> */}
            <button style={leftPadding} type="button" className="btn btn-success"  onClick={()=> this.saveData()} >Save</button>
          {/* </div> */}
          <div>Token: {this.state.token}</div>
        </form>
      </div>)
    }
    const blocks = this.state.data.result.map((item, i) => {
      return (
          <tr key={i}>
              <td>{item.hash}</td>
              <td>{item.blockNumber}</td>
              <td>{item.from}</td>
              <td>{item.to}</td>
              <td>{item.value}</td>
          </tr>
        )
      })

    return (
      <div>
        <form action="/action_page.php" style={leftPadding}>
          <TextField style={boxWidth} id="address" type="address" label="address" className={classes.textField} value={this.state.address} onChange={this.handleChange('address')} margin="normal"/>
          <button type="button" className="btn btn-info"  onClick={()=> this.getData()} >Search</button>
          {/* <div style={leftPadding}> */}
            <button style={leftPadding} type="button" className="btn btn-success"  onClick={()=> this.saveData()} >Save</button>
          {/* </div> */}
          <div>Token: {this.state.token}</div>
        </form>
      </div>
    )
  }
}

Token.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Token)
