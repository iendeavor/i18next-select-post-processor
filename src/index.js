const genDefaultOptions = () => ({
  regex: /\$s\(([a-zA-Z_\$]+),([^,]+),([^;]*)\);/,
  maxReplacementCount: 1000,
})

module.exports = {
  type: 'postProcessor',
  name: 'select',
  options: genDefaultOptions(),

  updateOptions: function(options) {
    this.options = {...this.options, ...options}
  },

  process: function process(value, _, options, translator) {
    if (Object.prototype.toString.call(options.postProcess) === '[object String]') {
      delete options.postProcess
    } else {
      options.postProcess.splice(options.postProcess.find(name => name === this.name), 1)
    }

    let count = 1
    while (count++ < this.options.maxReplacementCount) {
      const result = this.options.regex.exec(value)
      if (result === null) break

      const [matchedString, key, expect, string] = result
      const beforePart = value.slice(0, result.index)
      const endPart = value.slice(result.index + matchedString.length)

      if (options[key] === JSON.parse(expect)) {
        value = beforePart + string + endPart
      } else {
        value = beforePart + endPart
      }
    }

    return translator.translate(value, options)
  }
}