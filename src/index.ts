const IPFS = require('ipfs');

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

  static async createIPFSNode() {
    return await IPFS.create().then((ipfs: any) => {
      ipfs.config.get('Addresses.Swarm').then((res: any) => {
        console.log(res);
      });
    });
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

  static async getAd(ipfs: any) {
    const chunks = [];
    for await (const chunk of ipfs.cat('QmQ2r6iMNpky5f1m4cnm3Yqw8VSvjuKpTcK1X7dBR1LkJF')) {
      chunks.push(chunk);
    }
    console.log(Buffer.concat(chunks).toString());
  }

  connectedCallback() {
    // on connect call out to IPFS
    // FuzzyAd.createIPFSNode().then(() => {
    // FuzzyAd.getAd(ipfs)
    // });

    let adElem = document.createElement('img');
    adElem.width = 100;
    adElem.height = 100;
    adElem.src = 'https://ipfs.io/ipfs/QmW2WQi7j6c7UgJTarActp7tDNikE4B2qXtFCfLPdsgaTQ/cat.jpg';
    this.appendChild(adElem);

    FuzzyAd.getToken().then((image) => {
      console.log(image);
      adElem.src = 'https://gateway.ipfs.io/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco/I/m/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_(454045).jpg';
    });
  }
}

customElements.define('fuzzy-ad', FuzzyAd);
