module.exports = {
    "env": {
        "node": true,
        "es6": true,
        "mocha":true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion":2016,
        "sourceType":"script"
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console":["error",{
            "allow":["warn","error","info","log"]
        }],
    }
};
