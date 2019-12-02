import { Component } from "react";
import { string } from 'prop-types';

class RegexHelper extends Component{
       //escape the speical characters
    static escapeRegExp(str){ 
        if(!!str &&str.type===string.type){
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        }else{
            return "";
        }}
    static fullMatch(str){
       var result=[];
       result.push("/^");
       result.push(this.escapeRegExp(str));
       result.push("$/");
       return result.join("");
    }

}
export default RegexHelper;