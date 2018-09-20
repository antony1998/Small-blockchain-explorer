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

class Contract extends Component {
  state = {
    defaultPage: true,
    address: '',
    balance: '',
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
    // const read = (params, credentials) => {
    //   console.log(params)
    // let url = "https://api.etherscan.io/api?module=account&action=balance&address=" + "0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a" +"&tag=latest&apikey=YourApiKeyToken 0x91c2c922a5db860e8b1a6775b7fe00dff106a8e0";
    let url1 = "https://api.etherscan.io/api?module=account&action=balance&address=" +this.state.address + "&tag=latest&apikey=YourApiKeyToken";
    console.log(url1);
    fetch(url1, {
      method: 'GET',
    }).then((response) => {
      return response.json();}
    ).then(data =>{
      this.setState({balance:data.result});
      console.log(this.state.balance);
    }).catch((err) => console.log(err))

    let url = "http://api.etherscan.io/api?module=account&action=txlist&address=" + this.state.address + "&startblock=0&endblock=99999999&sort=asc&apikey=YourApiKeyToken"
    fetch(url, {
        method: 'GET',
        // headers: {
        //   'Accept': 'application/json',
        //   'Content-Type': 'application/json',
        //   'Authorization': 'Bearer ' + credentials.t
        // }
      }).then((response) => {
        return response.json();}
      ).then(data =>{
        this.setState({data:data});
        console.log(this.state.data.result);
        console.log(this.state.data.result.length);
        this.state.redirect = true;
        this.drawTable();
      }).catch((err) => console.log(err))
}
saveData(){
    console.log("save");
    // const create = (task) => {
    //   console.log(task);
    let i;
    for(i=0; i<this.state.data.result.length; i++)
    {
      let myData = {address: this.state.address, ballance: this.state.balance, blockNumber: this.state.data.result[i].blockNumber,
        timeStamp:this.state.data.result[i].timeStamp,
        hash:this.state.data.result[i].hash,
        nonce: this.state.data.result[i].nonce,
        blockHash: this.state.data.result[i].blockHash,
        transactionIndex: this.state.data.result[i].transactionIndex,
        from: this.state.data.result[i].from,
        to:this.state.data.result[i].to,
        value: this.state.data.result[i].value,
        gas: this.state.data.result[i].gas,
        gasPrice: this.state.data.result[i].gasPrice,
        isError: this.state.data.result[i].isError,
        txreceipt_status: this.state.data.result[i].txreceipt_status,
        input: this.state.data.result[i].input,
        contractAddress: this.state.data.result[i].contractAddress,
        cumulativeGasUsed: this.state.data.result[i].cumulativeGasUsed,
        gasUsed: this.state.data.result[i].gasUsed,
        confirmations: this.state.data.result[i].confirmations,
      };
      console.log(myData);
      fetch('/api/ether/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(myData)
        })
        .then((response) => {
          console.log(response);
          response.json();
        }).catch((err) => console.log(err))
    }
  }

drawTable() {
  console.log('draw table');
  
  $('#table_id').DataTable();
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
          <div>Balance: {this.state.balance}</div>
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
          <div>Balance: {this.state.balance}</div>
        </form>
        <table id="table_id" className="display">
          <thead>
            <tr>
              <th>TxHash</th>
              <th>Block</th>
              <th>From</th>
              <th>To</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
             {blocks}
          </tbody>
        </table>
      </div>
      // <div className={classes.root}>
      //   {this.state.defaultPage &&
      //     <Grid container spacing={24}>
      //       <Grid item xs={12}>
      //         <Card className={classes.card}>
      //           <Typography type="headline" component="h2" className={classes.title}>
      //             Home Page
      //           </Typography>
      //           <CardMedia className={classes.media} image={seashellImg} title="Unicorn Shells"/>
      //           <CardContent>
      //             <Typography type="body1" component="p">
      //               Welcome to the MERN Social home page. 
      //             </Typography>
      //           </CardContent>
      //         </Card>
      //       </Grid>
      //     </Grid>
      //   }
      //   {!this.state.defaultPage &&
      //     <Grid container spacing={24}>
      //       <Grid item xs={8} sm={7}>
      //         <Newsfeed/>
      //       </Grid>
      //       <Grid item xs={6} sm={5}>
      //         <FindPeople/>
      //       </Grid>
      //     </Grid>
      //   }
      // </div>
    )
  }
}

Contract.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Contract)
