import * as vscode from "vscode";

const fs = require("fs");
const path = require("path");

export const execute = () => {
  console.log("meow");

  //vscode.commands.executeCommand('revealInExplorer');
  //vscode.commands.executeCommand('revealInExplorer', vscode.Uri.parse('Testing\ MVP/findMe.ts'));
  const prefix = "test";
  vscode.commands.executeCommand("workbench.action.quickOpen", prefix);

  var loc = __dirname;
  console.log("loc: " + loc);
  //vscode.commands.executeCommand('list.focusDown');

  // Function to get current filenames
  // in directory
  const p = path.join(__dirname, "../"); //It goes 1 folders or directories back from given __dirname.
  //   fs.readdir(p, (err: any, files: any) => {
  //     if (err) console.log(err);
  //     else {
  //       console.log("\nCurrent directory filenames:");
  //       files.forEach((file: any) => {
  //         console.log(file);
  //       });
  //     }
  //   });

  const files: any[] = [];

  console.log("p>>>>>>>>>>>> " + p);

  getFiles(p, files);
  console.log(files);
};

function getFiles(p: any, finalListOfFiles: any) {
  //console.log("helloooooo");
  //console.log(p);
  var files = fs.readdirSync(p);

  for (var x in files) {
    //console.log("helloooooo2");
    var next = path.join(p, files[x]);
    //console.log("next>>>>>>>>>" + next);
    if (fs.lstatSync(next).isDirectory() == true) {
      // console.log("It is a directory!");
      getFiles(next, finalListOfFiles);
    } else {
      // console.log("It is NOT a directory!");
      //console.log("");
      finalListOfFiles.push(path.join(p, next));
    }
  }

  //   fs.readdirSync(p).forEach(function (file: any) {
  //     console.log("helloooooo2");
  //     var subpath = path.join(p, file);
  //     if (fs.lstatSync(subpath).isDirectory()) {
  //       getFiles(subpath, files);
  //     } else {
  //       files.push(path.join(p, file));
  //     }
  //   });
}
