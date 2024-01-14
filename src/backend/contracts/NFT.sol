// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFT is ERC721URIStorage {
    constructor() ERC721("ParlaTR","PTR") {}
    uint private _amountOfToken = 0;

    function createNFT(string calldata _tokenURI) external returns(uint){
        _amountOfToken++;
        _safeMint(msg.sender, _amountOfToken);
        _setTokenURI(_amountOfToken, _tokenURI);
        return(_amountOfToken);
    }
}