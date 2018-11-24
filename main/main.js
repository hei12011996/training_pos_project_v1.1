'use strict';
const fixtures = require('../main/fixtures');
const loadAllItems = fixtures.loadAllItems;
const loadPromotions = fixtures.loadPromotions;

function printReceipt(barcodesList){
}

function getItemsAndTotalQuantityByBarcodes(barcodesList){
}

function parseBarcodeListToCodeAndQuantity(barcodesList){
	let barcodesOccurenceList = {};

	barcodesList.forEach(barcode => {
		let parsedBarcode = barcode.split('-')[0];
		if (barcodesOccurenceList[parsedBarcode]) {
			barcodesOccurenceList[parsedBarcode] += parseQuantityFromBarcode(barcode);
		} else {
			barcodesOccurenceList[parsedBarcode] = parseQuantityFromBarcode(barcode);
		}
	});

	return barcodesOccurenceList;
}

function parseQuantityFromBarcode(barcode){
	return barcode.includes('-') ? Number(barcode.split('-')[1]) : 1;
}

function getItemByBarcode(barcode){
	let allItemsList = loadAllItems();
	return allItemsList.find(item => item.barcode === barcode);
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
