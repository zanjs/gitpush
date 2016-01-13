var chalk = require('chalk');
var test = require('child_process').exec;

var emoji = require('./js/emoji');


console.log(emoji.emoji[0]);

var check = test('git add -u -n', function(err, stdout, stderr){
  if(stdout.length == 0)
    console.log(chalk.red.bold('No Files Modified.'));


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
  console.log(new Date()+'\nstart || 开始执行...');

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
        console.log(chalk.green.bold('git commit ok \n 正在提交到远程仓库 \n loading push...'));

        var push = spawn('git', ['push']);

        push.stdout.on('data', function(data){
          console.log(chalk.blue(data.toString()));
        });

        var isok = true;

        push.stderr.on('data', function(data){
            var stc = data.toString();
            console.log('[stderr]♣♣:'+chalk.blue(stc));
            if(stc == 'Everything up-to-date'){
                console.log('isok ='+ false);
                isok = false;
            }

        });


        push.on('close', function(){
           //console.timeEnd("push-time");
           if(isok == false) return;

           var eTime = new Date().getTime(),
               useTime = eTime - sTime;
           console.log(chalk.green.bold('git push ok \n time cost: '+useTime +'ms\n恭喜您：推送完成 || 耗时 '+ useTime/1000 +'秒\n更多信息请看上面stderr:信息提示'));
        });

      });
    });
  });
}
