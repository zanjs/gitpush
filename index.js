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
  var st,sTime;
  
  sTime = new Date().getTime();
  console.log(new Date()+'\n 开始执行');  
  console.time("push-time");
  var status = spawn('git', ['status', '-s', '-uno']);

  status.stdout.on('data', function(data){
    st = data.toString().split('\n');
    for(i=0;i<st.length;i++) {
      console.log(chalk.red(st[i].trim()));
    }
  });

  status.on('close', function(){
    //var add = spawn('git', ['add', '-u', '-v']);
    var add = spawn('git', ['add', '.']);
    add.stdout.on('data', function(data){
      console.log(chalk.blue(data.toString()));
    });

    add.on('close', function(){
      var commit = spawn('git', ['commit', '-m', commitMsg+' By gitpush']);
      commit.on('close', function(){
        console.log(chalk.green.bold('git commit ok loading push...'));
        
        var push = spawn('git', ['push']);
        push.on('close', function(){
           console.timeEnd("push-time");
           var eTime = new Date().getTime(),
               useTime = eTime - sTime;              
           console.log(chalk.green.bold('git push ok || time cost: '+useTime +'ms'));
        });
        
      });
    });  
  });  
}
