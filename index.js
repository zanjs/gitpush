#! /usr/bin/env node
var chalk = require('chalk');
var test = require('child_process').exec;

var check = test('git add -u -n', function(err, stdout, stderr){
  if(stdout.length == 0)
    console.log(chalk.red.bold('No Files Modified.'));
  else
    argvtest();
});

function argvtest() {
  var commitMsg = process.argv[2];    
  if(!commitMsg)
    commitMsg = new Date();
 autogit(commitMsg);
}

function autogit(commitMsg) {
  var spawn = require('child_process').spawn;
  var st;

  var status = spawn('git', ['status', '-s', '-uno']);

  status.stdout.on('data', function(data){
    st = data.toString().split('\n');
    for(i=0;i<st.length;i++) {
      console.log(chalk.red(st[i].trim()));
    }
  });

  status.on('close', function(){
    var add = spawn('git', ['add', '-u', '-v']);

    add.stdout.on('data', function(data){
      console.log(chalk.blue(data.toString()));
    });

    add.on('close', function(){
      var commit = spawn('git', ['commit', '-m', commitMsg]);
      commit.on('close', function(){
        console.log(chalk.green.bold('Commit Successful'));
      });
    });  
  });  
}
