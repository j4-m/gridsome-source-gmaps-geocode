# gridsome-source-gmaps-geocode

```js

module.exports = {
  ...
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: '_content/**/*.md',
        typeName: 'Office'
      }
    },
    {
      use: 'gridsome-source-gmaps-geocode',
      options: {
        apiKey: 'your-gmaps-geocode-api-key-here',
        sourceTypeName: 'Office',
        sourceTypeField: 'address'
      }
    },
  ]
}
```