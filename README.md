# gridsome-source-gmaps-geocode

## Install

`yarn add gridsome-source-gmaps-geocode `

Or

`npm install --save gridsome-source-gmaps-geocode`

## Usage

Configure the plugin in your `gridsome.config.js`

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

You will then be able to use access the gecode result for the value of the `address` field on each `Office` node via the `geocode` field on `Office` nodes:

```graphql
{
  allOffice {
    edges {
      node {
        geocode {
          lat
          lng
        }
      }
    }
  }
}
```
