 import React, { Component } from 'react';
 import {Button,FormControl, OverlayTrigger, Popover, Dropdown, Form, InputGroup, DropdownButton} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';   
import './searchBar.css'

const matchOptions=["Fuzzy Match","Full Match"];
const ticketName="ticket";
const userName="user";
const organizaitonName="organization";
// The match option button
const MatchOption=(props)=>{
    return(
    <Dropdown>
        <DropdownButton  className="match-option" variant="info" id="dropdown-matchOption" title= {matchOptions[props.matchOption]}>
        <Dropdown.Item onClick={props.clickMatchOption.bind(this,0)}>{matchOptions[0]}</Dropdown.Item>
            <Dropdown.Item onClick={props.clickMatchOption.bind(this,1)}>{matchOptions[1]}</Dropdown.Item>
        </DropdownButton>
    </Dropdown>); 
}

// The search filter class including the filter selection
const SearchFilter = (props)=>{
    const placement="bottom";
    const type='checkbox';
    const content=props.filterColumns.map((filterColumn,index)=>{
        const column=filterColumn.column;
        const checked =filterColumn.checked;
     return   <Form.Check type={type} key={column} label={column} checked={!!checked} onChange={props.changeContext.bind(this,index)}>
             </Form.Check>
    });
    return (
        //popup overlay trigger
        <OverlayTrigger alignRight rootClose={true} trigger="click" placement={placement} overlay={
            <Popover id={`popover-positioned-${placement}`} className="popover">
            <Popover.Title as="h3">
            <Dropdown>
                <DropdownButton alignRight variant="light" id="dropdown-basic" className="filter-selector" title={!!props.filterTable?props.filterTable:"No filter"}>
                <Dropdown.Item onClick={props.clickFilter.bind(this,"clear")}>--No Filter--</Dropdown.Item>
                    <Dropdown.Item onClick={props.clickFilter.bind(this,ticketName)}>Ticket</Dropdown.Item>
                    <Dropdown.Item onClick={props.clickFilter.bind(this,organizaitonName)}>Organization</Dropdown.Item>
                    <Dropdown.Item onClick={props.clickFilter.bind(this,userName)}>User</Dropdown.Item>
                </DropdownButton>
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

class SearchBar extends Component{
    render(){
        return(
                <InputGroup className="mb-3">
                <MatchOption matchOption={this.props.matchOption} clickMatchOption={(i)=>this.props.clickMatchOption(i)}/>
                 <FormControl type="text" className="search-field" onChange={this.props.findMatch.bind(this)} 
                        onKeyPress={this.props.keyPressed.bind(this)}></FormControl>
                <SearchFilter changeContext={(column)=>this.props.changeContext(column)} clickFilter={(name)=>this.props.clickFilter(name)}
                          filterTable={this.props.filterTable} filterColumns={this.props.filterColumns}/>
                </InputGroup>
        );
    }   
}

export default SearchBar;