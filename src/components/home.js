import React, {Component} from 'react';
import { Tabs,Tab, Button,FormControl, Table,Modal, OverlayTrigger, Popover, Dropdown, Form} from 'react-bootstrap';
import './home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import RegexHelper from '../utility/regexHelper';
import ResultTable from './resultTable'

    //load the original data only once 
   //if using database these data should get from the api
   const ticketsData=require('../data/tickets.json');
   const usersData=require('../data/users.json');
   const organizationsData=require('../data/organizations.json');
    const matchOptions=["Fuzzy Match","Full Match"];
   
   //in order to display a better UI, we only couple columns for each table
   //if you want to change the display columns, change config here
    const ticketTitles=["_id","subject","external_id","type","priority","status"]
    const userTitles=["_id","name","alias","active","role"]
    const organizaitonTitles=["_id","name","domain_names","details"]

    const ticketName="ticket";
    const userName="user";
    const organizaitonName="organization";

   //the dialog to show all the detail information for ticket/user/organization
class DetailDialog extends Component { 
    //get body item 
    getBodyItem(obj){
        var bodyItem=[];
        if(!!obj){
            Object.keys(obj).map((key)=>{
                var value=obj[key];
                if(Array.isArray(value)){
                    value=value.join(",");
                }
                bodyItem.push(
                    // set the unique key 
                    <tr key={"dialog_"+key}>
                        <td>{key}</td>
                        <td>{value}</td>
                    </tr>
                    );
            })
        }
        return bodyItem;
    }

    render(){
        const show=this.props.show;
        const obj=this.props.currentObj;     
        const bodyItem=this.getBodyItem(obj);
        return(
            <Modal size="lg" show={show} onHide={this.props.onHide}>
            <Modal.Header closeButton>
              <Modal.Title>Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped hover>
                <tbody>
                     {bodyItem} 
                </tbody>
                </Table>              
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
          </Modal>
        );
    }
}

// The match option button
class MatchOption extends Component{
    render(){
        return(
        <Dropdown className="match-option">
            <Dropdown.Toggle variant="info" id="dropdown-matchOption">
            {matchOptions[this.props.matchOption]}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={(i)=>this.props.onClick(0)}>{matchOptions[0]}</Dropdown.Item>
                <Dropdown.Item onClick={(i)=>this.props.onClick(1)}>{matchOptions[1]}</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>);
    }   
}

// The search filter class including the filter selection
class SearchFilter extends Component{
    render(){
        const placement="bottom";
        const type='checkbox';
        const content=this.props.filterColumns.map((filterColumn,index)=>{
            const column=filterColumn.column;
            const checked =filterColumn.checked;
         return   <Form.Check type={type} key={column} label={column} checked={!!checked} onChange={()=>this.props.onChange(index)}>
                 </Form.Check>
        });
        return (
            //popup overlay trigger
            <OverlayTrigger rootClose={true} trigger="click" placement={placement} overlay={
                <Popover id={`popover-positioned-${placement}`}>
                <Popover.Title as="h3">
                <Dropdown className="filter-dropdown">
                    <Dropdown.Toggle  id="dropdown-basic" >
                        {!!this.props.filterTable?this.props.filterTable:"Select filter"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={()=>this.props.onClick("clear")}>--Clear Filter--</Dropdown.Item>
                        <Dropdown.Item onClick={()=>this.props.onClick(ticketName)}>Ticket</Dropdown.Item>
                        <Dropdown.Item onClick={()=>this.props.onClick(organizaitonName)}>Organization</Dropdown.Item>
                        <Dropdown.Item onClick={()=>this.props.onClick(userName)}>User</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                </Popover.Title>
                <Popover.Content>
                  {content}
                </Popover.Content>
              </Popover>
            }>
                <Button variant="outline-dark" className="search-filter">Filter <FontAwesomeIcon icon={faChevronDown} size="xs"/></Button>
            </OverlayTrigger>

        )
    }
}


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

 //Home Componment
class Home extends Component{
    constructor(props){
        super(props);
        // tickets: ticket data displayed under ticket tab
        // users: user data displayed under user tab
        // organization: organizaiton data displayed under organizaiton tab
        // filterTable: if filterTable is null means do general search, if not null do filter search
        // filter column: only availble if filterTable is not null. Determine which column is selected to be queried 
        this.state={
            tickets:[],
            users:[],
            organizations:[],
            filterTable:null,
            filterColumns:[],
            matchOption:0
        }
    }

    //Search function end point
    //TODO: for this demo, the data is getting from the memory so the findMatch logic will be implemented using JavaScript here
    //      Move the logic into api if in the future we have one
    findMatch(search){
        //TODO: add loading img here when waiting
        //assign the filter results to state
        const filterTable=this.state.filterTable;
        if(filterTable===null){
        this.setState({
            tickets:this.findObjectResult(search,ticketsData),
            users:this.findObjectResult(search,usersData),
            organizations:this.findObjectResult(search,organizationsData)
        });  
        }//in order to make it more easy to read and understand, seperate two condition here
        else{
        this.setState({
            tickets: filterTable===ticketName?this.findObjectResult(search,ticketsData):[],
            users: filterTable===userName?this.findObjectResult(search,usersData):[],
            organizations: filterTable===organizaitonName?this.findObjectResult(search,organizationsData):[]
        });
    }       
        //TODO: remove the loading img and show the result
    }
    
    //The general method that can handle all three type of data(ticket,user,org) 
    findObjectResult(search,objectData){
        const isFilter=this.state.filterTable!==null;
        const filterColumns=isFilter?this.state.filterColumns.filter((column)=>column.checked).map((column)=>{return column.column}):[];
        const matchOption=this.state.matchOption;
        var result=[];
        if(matchOption==0)
            search=search.toLowerCase();
        //!search same with search==undefined
        //clean the search result If there's nothing to search
        if(!search||search==="")
            return result;
            
        objectData.map((obj)=>{
            var objKeys=Object.keys(obj);
            for(var key of objKeys){  
                //only if the filter applys and filter column not select, continue to the next loop
                 if(isFilter&&!filterColumns.includes(key)) 
                     continue;    

                var val=obj[key];
                if(Array.isArray(val))
                    val=val.join(",");

                val=JSON.stringify(val);
                if(matchOption==0){
                    val=val.toLowerCase();
                 //if find a match add it to the result array and break the currrent row search
                 //fuzzy match
                 if(val.match(RegexHelper.escapeRegExp(search))){
                     result.push(obj);
                     break;
                 }
                }
                //full match
                else{
                    if(val===JSON.stringify(search)){
                        result.push(obj);
                        break;
                    }
                }
            }
        });
        return result;
    }

    //whenever the filter changes,update the filter table
    handleFilterTable(name){
        //if the same table don't do any state change
        if(name===this.state.filterTable){
            return;
        }
        var columns=null;
       switch(name){
           case ticketName:
               columns=Object.keys(ticketsData[0]);
               break;
            case userName:
                    columns=Object.keys(usersData[0]);
                break;
            case organizaitonName:
                    columns=Object.keys(organizationsData[0]);
                    break;
            case "clear":
                default:
                name=null;
                columns=[];
       }
       const filterColumns=columns.map((column)=> {
       return{ 
        column:column,
        checked:false
       }
    });
      this.setState({
           filterTable:name,
           filterColumns:filterColumns
       });
    }
    // whenever the check box get clicked trigger this method to update the filter columns
    handleFilterColumns(index){
        const filterColumns=this.state.filterColumns;
        filterColumns[index].checked= !filterColumns[index].checked
        this.setState({
            filterColumns:filterColumns
        });
    }

    //bind the enter key press to search
    keyPressed(event) {
        if (event.key === "Enter") {
          this.findMatch(event.target.value);
        }
      }
    handleMatchOption(index){
        this.setState({matchOption:index});
    }

    render(){
        //Get state data
        const currentTickets=this.state.tickets;
        const currentUsers=this.state.users;
        const currentOrganizations=this.state.organizations;
        return(
        <div className="main-container">
            <div className="search-bar">
                <MatchOption matchOption={this.state.matchOption} onClick={(i)=>this.handleMatchOption(i)}/>
                <FormControl type="text" className="search-field" onChange={(event)=>this.findMatch(event.target.value)} 
                            onKeyPress={(event)=>this.keyPressed(event)}></FormControl>
                <SearchFilter onChange={(column)=>{this.handleFilterColumns(column)}} onClick={(name)=>this.handleFilterTable(name)}
                              filterTable={this.state.filterTable} filterColumns={this.state.filterColumns}/>
            </div>
            <TabField  tickets={currentTickets} users={currentUsers} organizations={currentOrganizations} />     
        </div> 
        );
    }
}

export default Home;