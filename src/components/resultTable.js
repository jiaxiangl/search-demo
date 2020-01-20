import React, {Component} from 'react';
import { Table} from 'react-bootstrap';
//a general class that display any type of table
class ResultTable extends Component{
    //get the header 
    getHeaderItems(titles){ 
        const keys=titles;
        const headerItems=Array(keys.length);
       keys.map((key)=>
        headerItems.push(<th key={key}>{key}</th>));         
        return <thead><tr>{headerItems}</tr></thead>;
    }
    //get the body 
    getBodyItems(objects,titles){
        const bodyItems=Array(objects.length);
        const keys=titles;
        objects.map((obj)=>{
            const valueItems=[];
            keys.map((key,index)=>{
                var value=obj[key];
                if(Array.isArray(value)){
                    value=value.join(",");
                }
                valueItems.push(<td key={"row_"+obj["_id"]+"_column_"+index} >{value}</td>);
            });
             bodyItems.push(<tr key={obj["_id"]} onClick={()=>this.props.onClick(obj)}>{valueItems}</tr>);
            })
    return <tbody>{bodyItems}</tbody>;
    }

    render(){      
        const object=this.props.object;
        const titles=this.props.titles;
        if(!!object&&object.length>0){
            const headerItems=this.getHeaderItems(titles);
            const bodyItems=this.getBodyItems(object,titles);
            return(
                <Table striped borderless hover className="home-table">
                  {headerItems}
                  {bodyItems}
                </Table>
            );
        }else{
            return(
                <span>No data</span>
            );
        }
    }
   
}

export default ResultTable;