var gulp = require('gulp')
var awspublish = require('gulp-awspublish')
var cloudfront = require('gulp-cloudfront-invalidate-aws-publish')
var gulpLoadPlugins = require('gulp-load-plugins')
var $ = gulpLoadPlugins()

gulp.task('default', function() {

  var publisher = $.awspublish.create({
    region: 'eu-west-1',
    params: {
      Bucket: 'stage.callofthebrave.org'
    }
  }, {
    cacheFile: 'd2a04p1mzdn55d.cloudfront.net'
  })

  var cfSettings = {
    distribution: 'E6QL8V5EQYJT8',
    indexRootPath: true
  }

  var headers = {
    'Cache-Control': 'no-cache',
    'Content-Encoding': 'gzip'
  }

  return gulp.src('public/**/*.*')
    .pipe(awspublish.gzip())
    .pipe(publisher.publish(headers))
    .pipe(cloudfront(cfSettings))
    .pipe(publisher.sync())
    .pipe(publisher.cache())
    .pipe($.awspublish.reporter())
})


gulp.task('ship', function() {

  var publisher = $.awspublish.create({
    region: 'eu-west-1',
    params: {
      Bucket: 'www.callofthebrave.org'
    }
  }, {
    cacheFile: 'd330ctzlb0za8w.cloudfront.net'
  })

  var cfSettings = {
    distribution: 'E2FWBP7HXQ61SD',
    indexRootPath: true
  }

  var headers = {
    'Cache-Control': 'no-cache',
    'Content-Encoding': 'gzip'
  }

  return gulp.src('public/**/*.*')
    .pipe(awspublish.gzip())
    .pipe(publisher.publish(headers))
    .pipe(cloudfront(cfSettings))
    .pipe(publisher.sync())
    .pipe(publisher.cache())
    .pipe($.awspublish.reporter())
})
