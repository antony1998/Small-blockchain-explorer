import React, {Component} from 'react';
// import { browserHistory } from 'react-router';
// import { createHashHistory } from 'history';
// import {taskList} from './api-task';
import {Redirect, Link } from 'react-router-dom';
import {list} from './apiTask'
import {remove} from './apiTask'
import MyPhoto from './../assets/images/seashell.jpg'
import Card, {CardContent, CardMedia} from 'material-ui/Card'

// import { 
//     DoubleLoading,
//     BlockLoading
// } from '../loading';

var setMiddle = {
    top:"50%",
    postion: "fixed"
};
class TaskManagement extends Component{
    state = {
        redirect:false,
        tasks: [],
        // loading: true,
        // color: 'blue',
        // size: 'default'
    }
    
    constructor(match){
        super();
        this.match = match
    }
    
    componentDidMount() {
        // taskList().then((data) => {
        //     if (data.error) {
        //       console.log(data.error)
        //     } else {
        //       this.setState({users: data})
        //     }
        //   });
        
        this.getTasks();
    }

    getTasks(){
        list().then((data) => {
            if (data.error) {
              console.log(data.error)
            } else {
              console.log(data);
              this.setState({tasks: data});
              this.setState({
                // loading: false
              });
              console.log(data.length);
              this.drawTable();
            }
          })
    }


    handleDelete = (id) => {
        console.log("asdfasdf");
        console.log(id);
        remove({taskid:id}).then((data) => {
            console.log(data);
            this.setState({tasks: data})
            // if (data.error) {
            //   console.log(data.error)
            // } else {
            // //   console.log(data);
            // //   this.setState({tasks: data})
            // }
            // this.setState({redirect: true})
            // this.drawTable();
            // window.location.reload();
            // this.getTasks()
          
          })
    }

    drawTable() {
        console.log('draw table');
        
        $('#table_id').DataTable( {
            // paging: false
            // stateSave: true
        });
    }

    // handleNewTask = () =>{
    //     console.log("new post");
    //     history.push("./singin");
    // }
    
    render() {
        const style = {
            backgroundColor: 'black',
            padding: '16px',
            color: 'white',
            fontSize: '12px'
          };
        console.log("phm");

        // const table = [];
        // this.state.tasks.map((item, i) => {
        //     table.push( 
        //         <tr>
        //             <td>{item.name}</td>
        //             <td>
        //                 <button className="btn btn-primary">Edit</button>
        //                 <button className="btn btn-success" onClick={this.handleDelete(item._id)}>Delete</button>  
        //             </td>
        //         </tr>
        //     )
        // })
        let content;

        // if (this.state.loading) {
        //     content = 
        //     <div style={setMiddle}>
        //         {/* <div className="panel"> */}
        //              <BlockLoading color={this.state.color} size={this.state.size} loading={this.state.loading}>{content}</BlockLoading>
        //         {/* </div> */}
        //     </div>
        //   }
        // else
        {
            content = 
            <div className = "container">
            <Link to="/task/add">
                <button className="btn btn-danger" style = {{marginTop : '15px'}}>New Task</button>
            </Link>
            
            <table id="table_id" className="display">
                <thead>
                    <tr>
                        <th>Tasks</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {table} */}
                    {this.state.tasks.map((item, i) => {
                        return (
                            <tr key={i}>
                                <td>{item.name}</td>
                                <td>
                                    <Link to={"/task/edit/"+item._id}>
                                        <button className="btn btn-primary">Edit</button>
                                    </Link>
                                    <button className="btn btn-success" onClick={()=> this.handleDelete(item._id)}>Delete</button>  
                                </td>
                            </tr>
                        )
                    }
                    )}
                </tbody>
            </table>
        </div>
        }
        return (
            <div>
                {content}
            </div>
        )
      }
      
}


export default TaskManagement
