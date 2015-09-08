var fs = require('fs');
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

//Create .bower directory
gulp.task('init_bower_dir', function(){
  if(!fs.existsSync(".bower")){

    //Make directory
    fs.mkdirSync(".bower", 0766, function(err){
      if(err){ throw err }
    });

    //Change directory
    process.chdir('.bower');
   }
});

//Init git repo
gulp.task('init_git', ['init_bower_dir'], function(){
  return gulp.src('',{read:false})
    .pipe(plugins.git.init());
});

//Copy SDK JS FILE
gulp.task('copy_sdk',['init_git'], function(){
  gulp.src(['../docs/docsWRT/built_rt.min.js'])
    .pipe(gulp.dest('./'))
});

//Add and commit file to repo
gulp.task('add', ['copy_sdk'], function(){
  console.log(process.cwd())
  gulp.src('./*')
    .pipe(plugins.git.add());
});

gulp.task('init', ['add'], function(){
  /*
    plugins.git.init(function (err) {
      if (err) throw err;
    });
  */
});


