# fuzzy-ads-sdk

Fuzzy Ads is a service which allows you to place advertisements into a web2 or web3 site to monetize your content in a privacy-preserving way. By joining our network you can get access to a community of web3 and crypto enthusiasts and advertisers.

## Getting started

This SDK is a plugin that can be inserted into any web2 or web3 website to power privacy-preserving monetization of the content.

There are two steps:

1. Add the `<script src="dist/fuzzy-ads-sdk.js"></script>` in the `<head>`.

2. Include the `<fuzzy-ad auID="12345"></fuzzy-ad>` component wherever you'd like in your HTML, with the `auID` you received from the portal.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>your site</title>
    <meta name="description" content="your site">
    <script src="https://gateway.pinata.cloud/ipfs/QmQgDt7LBMKunnCgEM1Z34NZT3vt7ym9FHL71GkjAhQszi/fuzzy-ads-sdk.js"></script>
  </head>
  <body>
    <fuzzy-ad auID="12345"></fuzzy-ad>
  </body>
</html>
```

## Development

```sh
npm i
npm run build
npm run serve
```

## TODO

- [ ] Flow for auto-uploading and pinning latest release of SDK to IPFS
- [ ] Reduce package size (`web3.js` is _huge_)
- [ ] Integrate view/click stats with Filecoin payment channels
