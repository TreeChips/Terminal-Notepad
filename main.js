let readline = require('readline');
let fs = require('fs');
//Save file
let filePath = 'nodejsJavascriptSaveBarebonesListFile.txt';

//Init list
let list = [[]];
let usingList = 0;
let exitFlag = false;
// Check if file exists
if (fs.existsSync(filePath)) {
  // If file exists, read it and apply its contents to the list
  try {
    const fileData = fs.readFileSync(filePath, 'utf8');
    list = JSON.parse(fileData);  // Correctly parse the file content into list
    console.log("File loaded successfully.");
  } catch (error) {
    console.error("Error reading the file:", error);
  }
} else {
  // If file doesn't exist, create it with an empty list
  fs.writeFileSync(filePath, JSON.stringify(list, null, 2)); // Ensure list is written as empty initially
  console.log("No file found, creating a new one.");
}

//Set up terminal input
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//Know when to enter command
console.log("Enter command:")

rl.on('line', (input) => {
  tester = input.toLowerCase();
  n = input;
    if (tester.startsWith("add ")) {
      list[usingList].push(n.split("add ").join(''));    }
    if (tester == "close") {
      fs.writeFileSync(filePath, JSON.stringify(list, null, 2)); // Saves the list as a JSON file
      rl.close();
    }
    if (tester == "veiw") {
      for (i=0; i<list[usingList].length; i++) {
        console.log((i+1)+ ". " + list[usingList][i]);
      }
      console.log("Using list "+ (usingList + 1) + " of available " + list.length);
    }
    if (tester.startsWith("change ")) {
      let parts = n.split('change');
      let num = parts[1].trim().split(' ')[0];
      let string = parts[1].trim().slice(num.length).trim();
      list[usingList][num-1] = string;
      list[usingList] = list[usingList].filter(item => item !== undefined);
    }
    if (tester.startsWith('delete ')) {
      let num = parseInt(n.split('delete ')[1], 10); 
      if (num > 0 && num <= list[usingList].length) {
        list[usingList].splice(num - 1, 1);
      } else {
        console.log('Invalid item number');
      }
    }
    
    if (tester.startsWith('log')) {
      console.log(list);
      console.log(usingList);
    }
    if (tester.startsWith('create new list')) {
      list.push([]);
    }
    if (tester.startsWith('use')) {
      let num = parseInt(n.split('use ')[1], 10);
      usingList = num-1;
    }
    if (tester.startsWith('save')) {
      fs.writeFileSync(filePath, JSON.stringify(list, null, 2));
    }
    if (tester.startsWith("veiw all")) {
      for (z = 0; z<list.length;z++) {
        console.log("list " + (z + 1));
        for (i=0; i<list[z].length;i++) {
          console.log((i+1)+ ". " + list[z][i]);
        }
      }
    }
    if (tester.startsWith("omit ")) {
      let num = parseInt(n.split('omit ')[1], 10); 
      if (num == "all") {
        exitFlag = true;
        rl.question('Are you sure you want to delete all lists? (y/n): ', (answer) => {
          if (answer.toLowerCase() === 'y') {
            list = [];
            console.log("All lists deleted.");
          } else {
            console.log("Operation cancelled.");
          }
        });
      }
      if (!exitFlag) {
        if (num > 0 && num <= list.length) {
          list.splice(num-1, 1);
        } else {
          console.log('Invalid list number');
        }
      }
    }
    if (tester.startsWith("help")) {
      console.log("add: adds the following string to the current list: add abc");
      console.log("change: change the contents of the numbered item: change 1 def");
      console.log("remove: removes the following numbered string from the current list; remove 1");
      console.log("veiw: view current list's contents and current list: veiw");
      console.log("veiw all: veiw the contents of all lists: veiw all");
      console.log("create new list: create a new empty list: create new list");
      console.log("use: change current list to the following: use 2");
      console.log("omit: deletes the following numbered list: omit 2");
      console.log("save: saves all lists");
      console.log("close: closes program and saves");
    }
    exitFlag = false;
});
