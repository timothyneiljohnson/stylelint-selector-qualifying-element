'use strict';

const assign = require('object-assign');
const stylelint = require('stylelint');
const ruleName = 'plugin/selector-qualifying-element';
const messages = stylelint.utils.ruleMessages(ruleName, {});

const arrayContains = (searchItem, array) =>
  array.indexOf(searchItem) > -1;

const combinators = ['>', '+', '~'];

module.exports = stylelint.createPlugin(ruleName, (options) =>
  (root, result) => {
    const validOptions = stylelint.utils.validateOptions(result, ruleName, {
      actual: options,
      possible: {
        noElementWithAttribute: [true, false],
        noElementWithClass: [true, false],
        noElementWithId: [true, false]
      }
    });

    const isElementSelector = (selector) => {
      const firstChar = selector.trim().substring(0, 1);
      return /^[a-z]+$/i.test(firstChar);
    };

    const hasAttributeQualifiedByElement = (selector) => {
      const selectorArray = selector.split(' ');
      let isFound = false;
      selectorArray.forEach((value) => {
        if (isElementSelector(value) && value.indexOf('[') > -1) {
          isFound = true;
        }
      });
      return isFound;
    };

    const hasClassQualifiedByElement = (selector) => {
      const selectorArray = selector.split(' ');
      let isFound = false;
      selectorArray.forEach((value) => {
        if (isElementSelector(value) && value.indexOf('.') > -1) {
          isFound = true;
        }
      });
      return isFound;
    };

    const hasIdQualifiedByElement = (selector) => {
      const selectorArray = selector.split(' ');
      let isFound = false;
      selectorArray.forEach((value) => {
        if (isElementSelector(value) && value.indexOf('#') > -1) {
          isFound = true;
        }
      });
      return isFound;
    };

    const checkForQualifyingElement = (rule) => {
      rule.selectors.forEach(selector => {
        // Return early if there is interpolation in the selector
        if (/#{.+?}|@{.+?}|\$\(.+?\)/.test(selector)) { return }

        // Replace combinators with whitespace, as they not relevant to rule
        const selectorNoCombinators = selector.replace(/>|\+|~/g, ' ');

        if (options.noElementWithAttribute && hasAttributeQualifiedByElement(selectorNoCombinators)) {
          stylelint.utils.report({
            ruleName: ruleName,
            result: result,
            node: rule,
            message: 'Avoid qualifying attribute selectors with an element'
          });
        }
        if (options.noElementWithClass && hasClassQualifiedByElement(selectorNoCombinators)) {
          stylelint.utils.report({
            ruleName: ruleName,
            result: result,
            node: rule,
            message: 'Avoid qualifying class selectors with an element'
          });
        }
        if (options.noElementWithId && hasIdQualifiedByElement(selectorNoCombinators)) {
          stylelint.utils.report({
            ruleName: ruleName,
            result: result,
            node: rule,
            message: 'Avoid qualifying id selectors with an element'
          });
        }
      })
    };

    if (!validOptions) {
      return;
    }

    root.walkRules(checkForQualifyingElement);
  }
);

module.exports.ruleName = ruleName;
module.exports.messages = messages;
