(function () {
	"use strict";
		var path = require('path'),
		fs   = require('fs-extra'),
		underscore =  require('underscore'),
		inputDir = "./input/",
		outputDir = "output/",
		root = './',
		subDir = '',
		jsonData = "pagedata.json";
	if (process.argv.length > 2) {
		inputDir = "./" + process.argv[2] + "/";
	}
		var originalInputDir = inputDir;
		function readFile( path, callback ) {
			fs.readFile( path, {encoding: 'utf-8'}, callback );
		}

function verifyFolder( folderName, obj, callback )
{
	fs.mkdirs(folderName, function(err){
		if (err) {
			console.error(err);
		} else {
			callback(true, obj);
		}
	});
}

function processContent( content, obj, callback ){
	var i, initarray = {};
	if (content.match(/\+\+.*?\+\+/g)) {
		initarray = content.match(/\+\+.*?\+\+/g).map(function(s){
			return s.slice(2, -2);
		});
	}
	
	for (i = 0; i < initarray.length; i++) {
		underscore.each(obj, function(val, key) {
			if (initarray[i] === key) {
				content =  content.replace("++" + initarray[i] + "++",val);
			}      
		});
	}
	callback( undefined, content );
}

function writeContent( path, content, callback )
{
  fs.writeFile( path, content, function (err) {
    if (!err) {
			callback( err, path );
		}
  });  
}

function processFile( filePath, root, obj, callback, subDir) {
	var content;
	
  function readFileCallback( err, data ){
		if (err) {
      return callback( err, data );
		}
		content = data;
		verifyFolder( outputDir + subDir, obj, verifyFolderCallback );
  }

  function verifyFolderCallback( exists, obj ){
		exists ? processContent( content, obj, processContentCallback ) : callback( outputDir + ' does not exist' );
  }

  function processContentCallback( err, content )
  {
		writeContent( outputDir + subDir + filePath, content, callback );    
  }
	readFile( root + filePath,  readFileCallback );
}

function readDir(inputDir, root, subDir, obj, callback) {
		fs.readdir(inputDir,function(err,files){
				if (err) {
					return callback(err);
				}
				if (files.length < 1) {
					console.log("No files available to process in " + inputDir + " directory.");
					return;
				}
				
				files.map(function(file) {
					var root = null,
							subDir = '';
					
					if (fs.statSync(inputDir + file).isDirectory()) {
						root = inputDir + file + '/';
						if (root.indexOf(originalInputDir) > -1) {
							subDir = root.replace(originalInputDir,'');
						}
						readDir(root, root, subDir, obj, logResult);
					}
				});
				files = files.filter(function(file) { return path.extname(file) === '.html'; });
				if (files.length < 1) {
					console.log("No HTML file available to process.");
					return;
				}
				files.forEach(function(file){
					processFile( file, root, obj, callback, subDir);
				});
		});
}

function logResult( err, result ){
	if (err) {
		console.log(err);
	} else {
		console.log(result);
	}
}

function startReadDir() {
	var obj;
	function readJsonCallback(err,data) {
		if (err) {
			return callback( err, data );
		}
		obj = JSON.parse(data);
		readDir(inputDir, root + inputDir, subDir, obj, logResult);
	}
	fs.removeSync("./" + outputDir);
	readFile( jsonData, readJsonCallback);
	
}

exports.readDirectory = startReadDir;
}());