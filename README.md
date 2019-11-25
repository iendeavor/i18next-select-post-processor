# Introduction

[![npm version](https://img.shields.io/npm/v/i18next-select-post-processor.svg?style=flat-square)](https://www.npmjs.com/package/i18next-select-post-processor)

A conditional ability that make i18next more powerful.

# Getting Started

```
# npm package
$ npm install i18next-select-post-processor
```

# Usage

> We could using Boolean, String, Number, and Null type to check values.

```js
import i18next from 'i18next';
import SelectPostprocessor from 'i18next-select-post-processor';

i18next
  .use(SelectPostprocessor)
  .init(i18nextOptions);
```

```js
const translation = {
  example: {
    basic: `$s(female,true,She is a lady.);`,
    nesting: `$s(cond1,true,She $s(cond2,true,is $s(cond3,true,a $s(cond4,true,lady.););););`,
    concatenation: `$s(cond1,true,She );$s(cond2,true,is );$s(cond3,true,a );$s(cond4,true,lady.);`
  }
};
```

```js
i18next.t(example.basic, { "postProcess": "select" });
// => She's a lady.
i18next.t(example.nesting, {"postProcess": "select", "cond1": true, "cond2": true, "cond3": true, "cond4": true});
// => She's a lady.
i18next.t(example.concatenation, {"postProcess": "select", "cond1": true, "cond2": true, "cond3": true, "cond4": true});
// => She's a lady.
```

# Online Demo

[CodeSandbox](https://codesandbox.io/s/i18next-select-post-processor-5t4oz)

# Change Default Options

```js
import i18next from 'i18next';
import SelectPostprocessor from 'i18next-select-post-processor';

SelectPostprocessor.updateOptions({
  // this are the defaults
  regex: /\$s\(([a-zA-Z0-9_\$]+),([^,]+),([^(;\))]*)\);/,
  maxReplacementCount: 1000,
});

i18next
  .use(SelectPostprocessor)
  .init(i18nextOptions);
```
