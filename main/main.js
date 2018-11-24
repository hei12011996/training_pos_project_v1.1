'use strict';
const fixtures = require('../main/fixtures');
const loadAllItems = fixtures.loadAllItems;
const loadPromotions = fixtures.loadPromotions;

function printReceipt(barcodesList){
}

function getItemsAndTotalQuantityByBarcodes(barcodesList){
}

function parseBarcodeListToCodeAndQuantity(barcodesList){
}

function parseQuantityFromBarcode(barcode){
}

function getItemByBarcode(barcode){
}

function getReceiptInfoByItemsAndQuantity(itemsAndQuantityMap){
}

function constructQuantityString(quantity, unit){
}

function getSubTotalByPromotions(item, quantity){
}

function getSubTotalWithBuyTwoGetOneFree(item, quantity){
}

function isPromotedItem(item, promotionBarcodesList){
}

function calculateTotalAndSave(itemWithQuantityAndSubtotal){
}

function getReceiptByReceiptInfo(receiptInfo){
}

module.exports = {
	printReceipt,
	parseQuantityFromBarcode,
	parseBarcodeListToCodeAndQuantity,
	getItemByBarcode,
	getItemsAndTotalQuantityByBarcodes,
	getSubTotalWithBuyTwoGetOneFree,
	isPromotedItem,
	getSubTotalByPromotions,
	constructQuantityString,
	calculateTotalAndSave,
	getReceiptInfoByItemsAndQuantity,
	getReceiptByReceiptInfo
};
