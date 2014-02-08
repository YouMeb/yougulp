'use strict';

var fs = require('fs');
var path = require('path');
var cp = require('child_process');

module.exports = function ($youmeb, $injector, $config, $generator, $prompt) {

  $youmeb.on('help', function (command, data, done) {
    data.commands.push(['yougulp', '', 'generate a yougulp project']);
    done();
  });
  
  // this.on('init', function (config, done) {
  //   if ($youmeb.isCli) {
  //     return done();
  //   }
  // });

  // generator
  $youmeb.on('cli-yougulp', function (parser, args, done) {
    $prompt.get([
      {
        name: 'Projectname',
        type: 'string',
        required: true
      }
    ], function (err, result) {
      if (err) {
        return done(err);
      }

      var gn_app = $generator.create(path.join(__dirname, 'templates'), path.join($youmeb.root, './')); 
      var gn_bower = $generator.create(path.join(__dirname, 'templates'), path.join($youmeb.root, './'));
      var gn_gulpfile = $generator.create(path.join(__dirname, 'templates'), path.join($youmeb.root, './'));
      var gn_package = $generator.create(path.join(__dirname, 'templates'), path.join($youmeb.root, './'));
      var gn_app_index = $generator.create(path.join(__dirname, 'templates'), path.join($youmeb.root, './'));
      gn_app.on('create', function (file) {
        console.log();
        console.log('  create '.yellow + file);
        console.log();
      });
      gn_bower.on('create', function (file) {
        console.log();
        console.log('  create '.yellow + file);
        console.log();
      });
      gn_gulpfile.on('create', function (file) {
        console.log();
        console.log('  create '.yellow + file);
        console.log();
      });
      gn_package.on('create', function (file) {
        console.log();
        console.log('  create '.yellow + file);
        console.log();
      });
      gn_app_index.on('create', function (file) {
        console.log();
        console.log('  create '.yellow + file);
        console.log();
      });
      gn_app.createFile('./app.ls', './app.ls', {}, done);
      gn_bower.createFile('./bower.json', './bower.json', {
        name: result.Projectname[0].toUpperCase() + result.Projectname.substr(1)
      }, done);
      gn_gulpfile.createFile('./gulpfile.ls', './gulpfile.ls', {}, done);
      gn_package.createFile('package.json', './package.json', {
        name: result.Projectname[0].toUpperCase() + result.Projectname.substr(1)
      }, done);
      gn_app_index.createFile('./app/index.html', './app/index.html', {
        name: result.Projectname[0].toUpperCase() + result.Projectname.substr(1)
      }, done);
      
    });
  });
};
