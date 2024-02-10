// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "./Marketplace.sol";

// This contract is for testing only.
contract Test {
    Marketplace marketPlaceCont;

    struct Item {
        uint itemId;
        address nft;
        uint tokenId;
        uint price;
        address seller;
        bool sold;
    }

    mapping(uint => Item) public itemsTest;

    // These two functions are added to dissmiss the error messages...
    receive() external payable {}
    fallback() external payable {}

    constructor(address payable _marketplaceAddress) {
        marketPlaceCont = Marketplace(_marketplaceAddress);
    }

    function printAllItemsAndMetadata() view public {
        console.log("Test contract, print called");
        console.log("Total item count in market");
        console.log(marketPlaceCont.getItemCount());
        console.log("");
        console.log("Printing the Items");
        // Index is started from 1 because when the Struct is initalized
        // Index 0 is loaded with the default values...
        for(uint i = 1; i <= marketPlaceCont.getItemCount(); i++){
            (
            uint itemId,
            address nftAddress,
            uint tokenId,
            uint price,
            address owner,
            bool sold
            ) = marketPlaceCont.getEachItem(i);

            console.log("Item ID in Marketplace:");
            console.log(itemId);
            console.log("Item NFT address:");
            console.log(address(nftAddress));
            console.log("Item tokenID in NFT Contract:");
            console.log(tokenId);
            console.log("Item price:");
            console.log(price);
            console.log("Owner of the item:");
            console.log(owner);
            console.log("Is item sold:");
            console.log(sold);
            console.log(" ");
        }
    }
}