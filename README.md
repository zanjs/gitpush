# gitpush

Git 命令行实用程序,将所有修改过的文件并提交它们。


A command line script in nodeJs to perform various Git commands. 
The command gives output of git status, 
followed by git add all new modified files, and then commits them.

## Installation

```sh
$ npm install gitpush -g
```

## Usage
全局安装 gitpush 后 , 打开您的终端，定位到您的项目目录


After installing the module globally, 
open up your terminal, navigate to the git directory of your choice and type:
```sh
$ gitpush "Your Commit Message"

//or

$ gitpush            --> is use Time now
```

### Important

命令将输出所有修改的文件，输出与提交, 工作在git 所有环境下


The command will output all the modified files added and then output whether commit was performed successfully or not.
 Works on all platforms with git installed.

Please request any new feature on the github repository or create a pull request that adds new features.
