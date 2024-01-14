// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "hardhat/console.sol";

contract NFT is ERC721URIStorage {
    constructor() ERC721("ParlaTR","PTR") {}
    uint public tokenCount;

    function createNFT(string memory _tokenURI) external returns(uint) {
        tokenCount++;
        _safeMint(msg.sender, tokenCount);
        _setTokenURI(tokenCount, _tokenURI);
        return(tokenCount);
    }

    // Just a tryout
    // TODO: Delete later on.
    function printExistingNFTIDs() public view {
        for(uint i = 0; i < tokenCount; i++){
            console.log(i);
        }
    }
}