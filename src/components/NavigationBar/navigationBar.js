import React,{Component} from 'react';
import {Nav,OverlayTrigger, Tooltip} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faBook } from '@fortawesome/free-solid-svg-icons'
import './navigationBar.css';

class NavigationBar extends Component {
    render(){
        return(
          <Nav defaultActiveKey="/home" className="flex-column nav-bar">
          {/* 
              OverlayTrigger and Tooltip is a tool to show tooltips that supported by bootstrap
              For more information visit: https://react-bootstrap.netlify.com/components/overlays/#tooltips
          */}
          <OverlayTrigger  placement="right" delay={{show:250,hide:250}} overlay={this.renderTooltip("Search")}>
            <Nav.Link href="/home"><FontAwesomeIcon icon={faSearch} /></Nav.Link>
          </OverlayTrigger>
          <OverlayTrigger  placement="right" delay={{show:250,hide:250}} overlay={this.renderTooltip("Read Me")}>
            <Nav.Link href="/readme"><FontAwesomeIcon icon={faBook} /></Nav.Link>
          </OverlayTrigger>
        </Nav>
        );
    }
    renderTooltip(val) {
      return <Tooltip>{val}</Tooltip>;
      }
  }

  export default NavigationBar;