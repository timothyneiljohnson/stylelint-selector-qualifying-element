var ruleTester = require('stylelint-rule-tester');
var statementMaxNestingDepth = require('..');

var messages = statementMaxNestingDepth.messages;
var testRule = ruleTester(statementMaxNestingDepth.rule, statementMaxNestingDepth.ruleName);

testRule({ noElementWithAttribute: true }, function(tr) {
  basics(tr);

  tr.ok('input { top: 0; }');
  tr.notOk('input[type=\'button\'] { top: 0; }', 'Avoid qualifying attribute selectors with an element.');
});

testRule({ noElementWithClass: true }, function(tr) {
  basics(tr);

  tr.ok('.class { top: 0; }');
  tr.ok('div>.class { top: 0; }');
  tr.ok('div+.class { top: 0; }');
  tr.ok('div~.class { top: 0; }');
  tr.notOk('div.class { top: 0; }','Avoid qualifying class selectors with an element.');
});

testRule({ noElementWithId: true }, function(tr) {
  basics(tr);

  tr.ok('#id { top: 0; }');
  tr.ok('div>#id { top: 0; }');
  tr.ok('div+#id { top: 0; }');
  tr.ok('div~#id { top: 0; }');
  tr.notOk('div#id { top: 0; }', 'Avoid qualifying id selectors with an element.');
});

function basics(tr) {
  tr.ok('');
  tr.ok('a {}');
  tr.ok('@import "foo.css";');
  tr.ok('a { top: 0; }');
}
