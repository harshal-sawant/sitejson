sitejson
========
This is Node commandline application used to read data from json file and puts that data into the web page.

How to install
-----
````
npm install sitejson --save
````

Folder Structure
----
`````````
.
|--input
	|-- 1.html
	|-- 2.html
|--pagedata.json
|--run-me.js
`````````
Placeholder
----
We need to define the placeholder in the html page. Placeholder should be a single word wrap with ++ as it will be the key in json to represent it's content.
For eg.
``````
<!DOCTYPE html>
<html>
	<head>
		<title>++title++</title>
	</head>
<body>
	++content1++  
</body>
</html> 
``````
pagedata.json
----
'pagedata.json' contains all the data in key value form. As mention earlier key will be the placeholder used in html file. 
For eg.
``````````
{
	"title": "My Page",
	"content1": "This is data of content1",
	"content2": "This is data of content2"	
}
``````````

By default program reads 'input' directory to get list of html files. We can specify the name of directory which contains html files as a parameter on commandline.
````
node myprogram.js ./inputFilesDirectory
or
node myprogram.js ./allFiles/subDirectory

````


How to RUN
-----
Create the program file say *run-me.js* and add the following code.
````
var sitejson = require('sitejson');	
		sitejson.readDirectory();

````
Now open the command prompt and traverse to the directory where run-me.js is located.
Run the following command
```````
node run-me
```````
then we can see the log of files which are process on console and final process files would be available at *output* folder. 



	
