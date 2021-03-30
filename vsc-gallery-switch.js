const { writeFileSync } = require('fs');

const productPath = "/Applications/VSCodium.app/Contents/Resources/app/product.json";

const openVSX = {
    "serviceUrl": "https://open-vsx.org/vscode/gallery",
    "itemUrl": "https://open-vsx.org/vscode/item"
};

const microsoft = {
    "serviceUrl": "https://marketplace.visualstudio.com/_apis/public/gallery",
    "cacheUrl": "https://vscode.blob.core.windows.net/gallery/index",
    "itemUrl": "https://marketplace.visualstudio.com/items",
    "controlUrl": "",
    "recommendationsUrl": ""
};

const doneMessage = "Set extension gallery source to ";

let current = require(productPath);

switch (process.argv[2]) {
    case "o":
        current.extensionsGallery = openVSX;
        writeFileSync(productPath, JSON.stringify(current, null, 2));
        console.log(doneMessage + "Open VSX");
        break;
    case "m":
        current.extensionsGallery = microsoft;    
        writeFileSync(productPath, JSON.stringify(current, null, 2));
        console.log(doneMessage + "Microsoft");
        break;
    default:
        const currentGallery = current.extensionsGallery;
        const currentProvider = (currentGallery.itemUrl === openVSX.itemUrl && currentGallery.serviceUrl === openVSX.serviceUrl) ? "Open VSX" : "Microsoft";
        console.log(`
        To change the VSCodium extension gallery source:

        - Open VSX: node ${__filename} o
        - Microsoft: node ${__filename} m

        Make sure to restart VSCodium for the changes to take effect.
        
        Current setting: ${currentProvider}
        `);
}