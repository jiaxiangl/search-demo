import React from 'react';
import Home from './home';
import  Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

const ticketsData=require('../data/tickets.json');
const usersData=require('../data/users.json');
const organizationsData=require('../data/organizations.json');

Enzyme.configure({adapter: new Adapter()});
test('Search without filter', () => {
   const wrapper=shallow(<Home/>);
  // expect(home.find('input').text()).toEqual('');
    expect(wrapper.state('tickets')).toStrictEqual([]);
    expect(wrapper.state('users')).toStrictEqual([]);
    expect(wrapper.state('organizations')).toStrictEqual([]);
    wrapper.find('FormControl').simulate('change',{target:{value:'A Catastrophe in Hungary'}});
    expect(wrapper.state('tickets').length).toBe(1);
    expect(wrapper.state('users').length).toBe(0);
    expect(wrapper.state('organizations').length).toBe(0);
    wrapper.find('FormControl').simulate('change',{target:{value:'39'}});
    expect(wrapper.state('tickets').length).toBe(55);
    expect(wrapper.state('users').length).toBe(12);
    expect(wrapper.state('organizations').length).toBe(2);
    wrapper.find('FormControl').simulate('change',{target:{value:''}});
    expect(wrapper.state('tickets').length).toBe(0);
    expect(wrapper.state('users').length).toBe(0);
    expect(wrapper.state('organizations').length).toBe(0);
  });

  test('Search with filter',()=>{
    
    const wrapper=shallow(<Home/>);
    expect(wrapper.state('filterTable')).toBeNull();
    expect(wrapper.state('filterColumns')).toStrictEqual([]);
    var columns=Object.keys(ticketsData[0]);
    
    var filterColumns1=columns.map((column)=> {
        return{ 
         column:column,
         checked:false
        }
     });
     wrapper.setState({filterTable:"ticket",filterColumns:filterColumns1});
     wrapper.find('FormControl').simulate('change',{target:{value:'39'}});
     expect(wrapper.state('tickets').length).toBe(0);
     expect(wrapper.state('users').length).toBe(0);
     expect(wrapper.state('organizations').length).toBe(0);

    var filterColumns2=columns.map((column)=> {
        return{ 
         column:column,
         checked:true
        }
     });
    wrapper.setState({filterTable:"ticket",filterColumns:filterColumns2});
    expect(wrapper.state('tickets').length).toBe(0);
    expect(wrapper.state('users').length).toBe(0);
    expect(wrapper.state('organizations').length).toBe(0);
    wrapper.find('FormControl').simulate('keypress', {key: 'Enter',target:{value:'39'}});
    expect(wrapper.state('tickets').length).toBe(55);
    expect(wrapper.state('users').length).toBe(0);
    expect(wrapper.state('organizations').length).toBe(0);
    
    columns=Object.keys(usersData[0]);
    var filterColumns3=columns.map((column)=> {
      return{ 
       column:column,
       checked:true
      }
   });
  wrapper.setState({filterTable:"user",filterColumns:filterColumns3});
    wrapper.find('FormControl').simulate('keypress', {key: 'Enter',target:{value:'39'}});
    expect(wrapper.state('tickets').length).toBe(0);
    expect(wrapper.state('users').length).toBe(12);
    expect(wrapper.state('organizations').length).toBe(0);
  });

  test('Search with match Options',()=>{
    const wrapper=shallow(<Home/>);
    expect(wrapper.state('matchOption')).toBe(0);
    //fuzzy match 
    wrapper.find('FormControl').simulate('change',{target:{value:'39'}});
     expect(wrapper.state('tickets').length).toBe(55);
     expect(wrapper.state('users').length).toBe(12);
     expect(wrapper.state('organizations').length).toBe(2);
    wrapper.setState({matchOption:1});
    //full match not found
    wrapper.find('FormControl').simulate('keypress', {key: 'Enter',target:{value:'39'}});
    expect(wrapper.state('tickets').length).toBe(0);
     expect(wrapper.state('users').length).toBe(0);
     expect(wrapper.state('organizations').length).toBe(0);
     //full match 
     wrapper.find('FormControl').simulate('change',{target:{value:'A Catastrophe in Hungary'}});
     expect(wrapper.state('tickets').length).toBe(1);
     expect(wrapper.state('users').length).toBe(0);
     expect(wrapper.state('organizations').length).toBe(0);
     //full match case sensitive
     wrapper.find('FormControl').simulate('change',{target:{value:'a Catastrophe in Hungary'}});
     expect(wrapper.state('tickets').length).toBe(0);
     expect(wrapper.state('users').length).toBe(0);
     expect(wrapper.state('organizations').length).toBe(0);
  })


  