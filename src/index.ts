const Web3 = require('web3');
const web3 = new Web3(
  new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/d908b9235eca4084ae854480ec1defa5'),
);
const adAbi = require('./contracts/Ad.json');
const contract = new web3.eth.Contract(adAbi, '0x8d1d1467fe47f5ee1d923033117de927d91d1124');

const getCurrentTime = () => Math.round(new Date().getTime() / 1000);

class FuzzyAd extends HTMLElement {
  get auID() {
    return this.getAttribute('auID');
  }

  static async getToken() {
    const now = getCurrentTime();
    const totalSupply = await contract.methods.totalSupply().call();
    let ads = [];

    // Go through all ads and select elegible ones
    let it = 0;
    do {
      const ad = await contract.methods.advertisingPeriods(it).call();

      if (ad.endTime >= now) ads.push(it);

      it++;
    } while (it <= totalSupply);

    // Pick one randomly
    const selectedAd = ads[Math.floor(Math.random() * ads.length)];

    // Bonus: store first and last valid id on ThreadsDB for rapid search

    const ipfsHash = await contract.methods.getMetadata(selectedAd).call();

    // TODO: if no ipfs hash then fetch default ad
    const data = await fetch(`https://gateway.ipfs.io/ipfs/${ipfsHash}`);

    return data;
  }

  connectedCallback() {
    // on connect call out to IPFS
    // FuzzyAd.createIPFSNode().then(() => {
    // FuzzyAd.getAd(ipfs)
    // });

    let adImgElem = document.createElement('img');
    adImgElem.width = 200;
    adImgElem.height = 100;
    adImgElem.src = 'https://filecoin.io/vintage/images/blog/fihfs-ignite.png';
    this.onclick = () => window.open('https://filecoin.io', '_blank')
    this.appendChild(adImgElem);

    FuzzyAd.getToken().then((image) => {
      console.log(image);
      adImgElem.src = 'https://filecoin.io/vintage/images/blog/fihfs-ignite.png';
    });
  }
}

customElements.define('fuzzy-ad', FuzzyAd);
