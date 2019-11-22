# Introduction

[![npm version](https://img.shields.io/npm/v/i18next-select-post-processor.svg?style=flat-square)](https://www.npmjs.com/package/i18next-select-post-processor)

A i18next plugin enabling select feature similar to ICU.

# Getting Started

```
# npm package
$ npm install i18next-select-post-processor

# yarn
$ yarn add i18next-select-post-processor
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
    basic: `$s(female,true,She's a lady.);`,
    nested: `$s(female,true,She's a $s(name,"alice",lady.););`,
    concat: `$s(female,true,She's a );$s(name,"alice",lady.);`,
    withOption: `$s(female,true,She's a {{noun}}.);`
  }
};

export default translation;
```

```js
i18next.t(example.basic,{ "female": true, "postProcess": "select" });
i18next.t(example.nested,{ "female": true, "name": "alice", "postProcess": "select" });
i18next.t(example.concat,{ "female": true, "name": "alice", "postProcess": "select" });
i18next.t(example.withOption, { "female": true, "name": "alice", "noun": "lady", "postProcess": "select" });

// => She's a lady
```

# Online Demo

[CodeSandbox](https://codesandbox.io/s/i18next-select-post-processor-5t4oz)

# Change Default Options

```js
import i18next from 'i18next';
import SelectPostprocessor from 'i18next-select-post-processor';

SelectPostprocessor.updateOptions({
  // this are the defaults
  regex: /\$s\(([a-zA-Z_\$]+),([^,]+),([^;]*)\);/,
  maxReplacementCount: 1000,
});

i18next
  .use(SelectPostprocessor)
  .init(i18nextOptions);
```
