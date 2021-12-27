module.exports = {
  'presets': [
    [
      '@babel/preset-env',
      {
        'modules': 'commonjs',
        'loose': true,
        'targets': {
          'browsers': [
            'last 2 versions',
            'ie >= 9'
          ]
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  // 'assumptions': {
  //   'setPublicClassFields': true
  // },
  'plugins': [
    '@babel/plugin-syntax-dynamic-import',
    // [
    //   '@babel/plugin-proposal-decorators',
    //   {
    //     'legacy': true
    //   }
    // ],
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-object-rest-spread',
    // ['@babel/plugin-proposal-class-properties', { 'loose': false }],
    ['@babel/plugin-proposal-private-methods', { 'loose': false }],
    ['@babel/plugin-proposal-private-property-in-object', { 'loose': false }],
    '@babel/plugin-proposal-class-properties',
    'styled-components',
    'transform-vue-jsx'
  ],
  'ignore': [
    'node_modules/**'
  ]
};
