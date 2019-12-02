

# Read Me
Thank you for looking at my demo, I really appreciate your time and I hope you enjoy playing with it.
Here's some insturctions and main feature list below:
### Download project:
Go to Github and clone with this url: [https://github.com/jiaxiangl/search-demo](https://github.com/jiaxiangl/search-demo) <br/>
#### Install/Run/Test
`npm install` Install the dependancy npm package.
`npm run build`Build the project.
`npm start` Runs the app in the development mode.
        
### Main feature
All the main feature located on home page, here is the detail insturctions:
#### `General Search`
Type anything on the search bar at the top will return all the related informtion from three tables(tickets, users, organizations) The match will be fuzzy match as default(e.g. "mar" will return "mary")  <br/>
    `Note:` If no search data provided: The system will return  *No Data*. 
#### `Full/Fuzzy Match`
On the left of the search bar, there's a drop down button which you can select do full match or fuzzy match.
#### `Full Match:`
Search result only return if any column value is exact match with the query string.(e.g. "mar" is not match with "mary")
             the full match is *case sensitive*.
#### `Fuzzy Match:`
Search result will return if any column value contains the query string.(e.g. "mar" will match with "mary") The fuzzy match is *`not` case sensitive*.
#### `Filter Match`
 On the right side of the search bar, there's a filter drop down to limit result by sepcific 
         table and columns.<br/>
         ` Note:`  You can select clear filter to clear all the filters in order to apply general search.
         `Note: `If there's no column selected after selecting the table, the system will return *No Data*. 
#### View Details
In order to make the UI more user-friendly, the table displays less columns If you want to view all the information for specific row, please click the row on the data table, a popup dialog will display all the details.

### Cost Analysis
Most of the function in the system time efficiency and space efficiency are eqaul or less than O(n) So we only analysis on two places:
#### 1. Match 
In order to query all three tables the time complexity will be O(3)=>O(1)  <br/>
each table have n rows, we need to loop each row so the time complexity will be O(n) <br/>
each row have at most 19 columns needs to query, so the complexity will be O(19)=>O(1) <br/>
There're sepcial columns which type is array (e.g. tags) so we need to use Json.stringfy() to convert the value into string<br/>
The system using Regex match for fuzzy match logic which it's own time complex will be O(m+n)
 (m: the length of table row. n: the length of query string) <br/>
So the total time complexity will be O(nxn)=O(n^2) 
#### 2.Print
In order to print all three tables the time complexity will be O(3)=>O(1) <br/>
each table have n rows, we need to loop each row so the time complexity will be O(n)  <br/>
each row have at most 19 columns needs to query, so the complexity will be O(19)=>O(1) <br/>
There're sepcial columns which type is array (e.g. tags) so we need to use join() and display so the complexity will be O(n)<br/>
So the total time complexity will be O(nxn)=O(n^2) 
### Improvment In the future
There're couple features are out of scope for this project, if you like any feature list or not list below, feel free to contact me at [mailto:ukmyjn456@gmail.com](ukmyjn456@gmail.com)
#### Paging
In this case, there's only 200 maximum rows per table so I decided to show all of them in one page to make a better user experience.<br/>
If the data comes from big list. paging is definely a feature need to get implemented to reduce query and loading time.
#### Optimize UI
The UI desgined to make the main feature clear and easy to read but there's more feature on the UI that can bring in(e.g. footer, logo).
#### API
Again, in order to access more data in the future, build api access functions should be necessarily.
        
        
     