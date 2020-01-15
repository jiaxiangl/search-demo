   
   import React, {Component} from 'react'
   import { Table,Modal} from 'react-bootstrap';
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

export default DetailDialog