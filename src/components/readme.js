import React, {Component} from 'react';
import './readme.css';
class ReadMe extends Component{
   render(){
    return (
        <div className="read-me">
        <h3>Read Me</h3>
        <hr/>
        <p>Thank you for looking at my demo, I really appreciate your time and I hope you enjoy playing with it.
        </p>

        <p>Here's some insturctions and main feature list below:</p>
        <h4>Download project:</h4>
        <p>Go to Github and clone with this url:<a href="https://github.com/jiaxiangl/search-demo">https://github.com/jiaxiangl/search-demo</a></p>
        <h4>Install/Run/Test</h4>
        <p><span className="bold">npm install</span><br/>Install the dependancy npm package.</p>
        <p><span className="bold">npm run build</span><br/>Build the project.</p>
        <p> <span className="bold">npm start</span> <br/>Runs the app in the development mode.<br />
        Open <a href="http://localhost:3000">http://localhost:3000</a>  to view it in the browser.
        </p>
        <p> <span className="bold">npm test</span><br/> Runs the test for the project.</p>
        <hr/>
        <h4>Main feature</h4>
            <p>All the main feature located on home page, here is the detail insturctions:</p>
           <div className="bold">General Search.</div>
           <p>
               Type anything on the search bar at the top will return all 
               the related informtion from three tables(tickets, users, organizations)
               The match will be fuzzy match as default(e.g. "mar" will return "mary")  
             <span> <span className="bold"> Note: </span>If no search data provided: The system will return  
                 <span className="italic bold"> No Data. </span>
            </span><br/>

           </p>

           <div className="bold">Full/Fuzzy Match</div>

         <p>
             On the left of the search bar, there's a drop down button which you can select
            do full match or fuzzy match. <br/>
            <span className="bold">Full Match:</span> 
            Search result only return if any column value is exact match with the query string. 
             (e.g. "mar" is not match with "mary")
             In order to search array columns (e.g. tags. ): please use comma delimiter (e.g. California,Palau) to query
             the full match is <span className="bold"> case sensitive.</span><br/>
             <span className="bold">Fuzzy Match:</span> 
            Search result will return if any column value contains the query string.  
            In order to search array columns (e.g. tags. ): please use comma delimiter (e.g. California,Palau) to query       
             (e.g. "mar" will match with "mary") The fuzzy match is <span className="bold">not case sensitive.</span>
         </p>

         <div className="bold">Filter Match</div>
        <p>On the right side of the search bar, there's a filter drop down to limit result by sepcific 
         table and columns.<br/>
         <span className="bold"> Note: </span> You can select clear filter to clear all the filters in order to apply general search.<br/>
         <span className="bold"> Note: </span> If there's no column selected after selecting the table, the system will return 
                 <span className="italic bold"> No Data. </span> </p> 
        <div className="bold">View Details</div>
        In order to make the UI more user-friendly, the table displays less columns
        If you want to view all the information for specific row, please click the row on the data table,
        a popup dialog will display all the details.
         <hr/>
         <h4>Cost Analysis</h4>
         <p>
             Most of the function in the system time efficiency and space efficiency are eqaul or less than O(n)
             So we only analysis on two places:<br/>  
             <span className="bold">1. Match </span>       
            In order to query all three tables the time complexity will be O(3)=>O(1) <br/>
            each table have n rows, we need to loop each row so the time complexity will be O(n)  <br/>
            each row have at most 19 columns needs to query, so the complexity will be O(19)=>O(1) <br/>
            There're sepcial columns which type is array (e.g. tags) so we need to use Json.stringfy() to convert the value into string <br/>
            The system using Regex match for fuzzy match logic which it's own time complex will be O(m+n)
              (m: the length of table row. n: the length of query string)  <br/>
              So the total time complexity will be O(n*n)=O(n^2) <br/>
              <span className="bold">2.Print </span> 
              In order to print all three tables the time complexity will be O(3)=>O(1) <br/>
            each table have n rows, we need to loop each row so the time complexity will be O(n)  <br/>
            each row have at most 19 columns needs to query, so the complexity will be O(19)=>O(1) <br/>
            There're sepcial columns which type is array (e.g. tags) so we need to use join() and display so the complexity will be O(n) <br/>
              So the total time complexity will be O(n*n)=O(n^2) <br/>
         </p>
        <hr/>
         <h4>Improvment In the future</h4>
        <p>
            There're couple features are out of scope for this project, if you like any feature list or not list below,
                     feel free to contact me at <a href='mailto:ukmyjn456@gmail.com'>ukmyjn456@gmail.com</a> <br/>
            <span className="bold">Paging</span><br/>
            In this case, there's only 200 maximum rows per table so I decided to show all of them in one page to make a better user experience.
            If the data comes from big list. paging is definely a feature need to get implemented to reduce query and loading time.<br/>
            <span className="bold">Optimize UI</span><br/>
            The UI desgined to make the main feature clear and easy to read but there's more feature on the UI that can bring in(e.g. footer, logo).
            <span className="bold">API</span><br/>
            Again, in order to access more data in the future, build api access functions should be necessarily.
        </p>
         </div>

        
    );
   }
}

export default ReadMe;