module.exports = {
    presets: [[ '@babel/env', {modules: 'cjs'}], '@babel/react'],
    plugins: [
        '@babel/proposal-class-properties',
        'add-module-exports'
    ]
}