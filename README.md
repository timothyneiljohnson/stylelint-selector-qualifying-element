# stylelint-selector-qualifying-element

[![Build Status](https://travis-ci.org/timothyneiljohnson/stylelint-selector-qualifying-element.svg)](https://travis-ci.org/timothyneiljohnson/stylelint-selector-qualifying-element)

A [stylelint](https://github.com/stylelint/stylelint) custom rule to disallow combinations of qualifying elements with id, class or attribute selectors.

This rule will cause stylelint to warn you whenever a disallowed combination is used.

## Installation

```
npm install stylelint-selector-qualifying-element
```

This plugin is compatible with v5.0.1+.

## Details

There are 3 options (`true` / `false`):
`noElementWithAttribute`,
`noElementWithClass`,
`noElementWithId`

For `noElementWithAttribute: true`:

```css
input { /* OK */
  margin: 0
}

input[type='button'] { /* Not OK */
  margin: 0
}
```

For `noElementWithClass: true`:

```css
.class { /* OK */
  margin: 0
}

div.class { /* Not OK */
  margin: 0
}
```

For `noElementWithId: true`:

```css
#id { /* OK */
  margin: 0
}

div#id { /* Not OK */
  margin: 0
}
```

## Usage

Add `"stylelint-selector-qualifying-element"` to your stylelint config `plugins` array, then add `selector-qualifying-element` to your rules, with your desired options.

Example:

```js
{
  "plugins": [
    "stylelint-selector-qualifying-element"
  ],
  "rules": {
    "selector-qualifying-element": {
      "noElementWithClass": true // Or false
      "noElementWithId": true // Or false
      "noElementWithAttribute": false // Or true
    }
  }
};
```
