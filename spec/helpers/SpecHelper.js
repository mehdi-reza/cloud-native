// configure reporting
var HtmlReporter = require('jasmine-pretty-html-reporter').Reporter;
jasmine.getEnv().addReporter(new HtmlReporter({
  path: 'spec/reports',
  writeReportEachSpec: true
}));

beforeEach(function () {
  /*jasmine.addMatchers({
    toBePlaying: function () {
      return {
        compare: function (actual, expected) {
          var player = actual;

          return {
            pass: player.currentlyPlayingSong === expected && player.isPlaying
          }
        }
      };
    }
  });*/
});
