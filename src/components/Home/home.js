import React, {Component} from 'react';
import RegexHelper from '../utility/regexHelper';
import './home.css'
import SearchBar from './SearchBar/searchBar'
import TabField from './TabField/tabField'


    //load the original data only once 
   //if using database these data should get from the api
   const ticketsData=require('../../data/tickets.json');
   const usersData=require('../../data/users.json');
   const organizationsData=require('../../data/organizations.json');
    const ticketName="ticket";
    const userName="user";
    const organizaitonName="organization"

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
    findMatch(event){
        const search=event.target.value;
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
    filterTableHandler(name){
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
    filterColumnHandler(index){
        const filterColumns=this.state.filterColumns;
        filterColumns[index].checked= !filterColumns[index].checked
        this.setState({
            filterColumns:filterColumns
        });
    }

    //bind the enter key press to search
    keyPressed(event) {
        if (event.key === "Enter") {
          this.findMatch(event);
        }
      }
    matchOptionHandler(index){
        this.setState({matchOption:index});
    }

    render(){
        //Get state data
        const currentTickets=this.state.tickets;
        const currentUsers=this.state.users;
        const currentOrganizations=this.state.organizations;
        return(
        <div className="main-container">
        <SearchBar matchOption={this.state.matchOption} clickMatchOption={(i)=>this.matchOptionHandler(i)}
                       findMatch={this.findMatch.bind(this)} keyPressed={this.keyPressed.bind(this)}
                       changeContext={(column)=>this.filterColumnHandler(column)} 
                       clickFilter={(name)=>this.filterTableHandler(name)}
                       filterTable={this.state.filterTable} filterColumns={this.state.filterColumns} />
                       
            <TabField  tickets={currentTickets} users={currentUsers} organizations={currentOrganizations} />     
        </div> 
        );
    }
}

export default Home;