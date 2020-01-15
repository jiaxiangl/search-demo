import React, {Component} from 'react';
import { Tabs,Tab} from 'react-bootstrap';
import ResultTable from '../resultTable';
import DetailDialog from './detailDialog';

   //in order to display a better UI, we only couple columns for each table
   //if you want to change the display columns, change config here
   const ticketTitles=["_id","subject","external_id","type","priority","status"]
   const userTitles=["_id","name","alias","active","role"]
   const organizaitonTitles=["_id","name","domain_names","details"]
   const ticketName="ticket";
   const userName="user";
   const organizaitonName="organization";

   
//The tab field that contains three tabs
class TabField extends Component{
    constructor(props){
        super(props);
        this.state={
            currentObj:null,
            show:false
        }
    }

    //format the name with number
    formatTabName(tabName,obj){
        return tabName+'('+obj.length+')';
      }

      //pop up the detail dialog
      popDialog(obj){
          this.setState({
              currentObj:obj,
              show:true
          })
      }

      //close the dialog
      handleClose(){
        this.setState({
            currentObj:null,
            show:false
        })
      }  
  render(){
      return(
      <div>
        <Tabs defaultActiveKey={ticketName}>
          <Tab eventKey={ticketName} data-testid="ticketTab" title={this.formatTabName(ticketName,this.props.tickets)}>
              <ResultTable object={this.props.tickets}  titles={ticketTitles} onClick={(obj)=>this.popDialog(obj)}/>
          </Tab>
        <Tab eventKey={userName} title={this.formatTabName(userName,this.props.users)}>  
        <ResultTable object={this.props.users}  titles={userTitles} onClick={(obj)=>this.popDialog(obj)}/>
        </Tab>
        <Tab eventKey={organizaitonName} title={this.formatTabName(organizaitonName,this.props.organizations)}>
        <ResultTable object={this.props.organizations} titles={organizaitonTitles} onClick={(obj)=>this.popDialog(obj)}/>
        </Tab>   
        </Tabs>
        < DetailDialog currentObj={this.state.currentObj} show={this.state.show} onHide={()=>this.handleClose()}/> 
      </div>
      );
  }
}

export default TabField;