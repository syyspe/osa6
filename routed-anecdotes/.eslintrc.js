module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jest/globals": true
    },
    "extends": [
        "eslint:recommended", 
        "plugin:react/recommended"
    ],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2016,
        "sourceType": "module",
        
    },
    "plugins": [
        "react",
        "jest"
    ],
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "react/prop-types": 0
    }
};