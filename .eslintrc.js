module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": "eslint:recommended", 
  "parserOptions": {
    "ecmaVersion": 6
  },
  "overrides": [
    {
      "files": ["test/*"],
      "parserOptions": {
        "ecmaVersion": 2017
      },
      "globals": {
        "describe": "readonly",
        "it": "readonly"
      }
    },
    {
      "files": ["main.js"],
      "globals": {
        "JZZ": "readonly",
        "define": "readonly",
        "acquireVsCodeApi": "readonly",
        "webkitAudioContext": "readonly"
      },
      "rules": {
        "no-console" : "off",
        "no-constant-condition" : ["error", { "checkLoops": false }],
        "no-empty" : ["warn", { "allowEmptyCatch": true }],
        "no-prototype-builtins" : "off"
      }
    }
  ]
};