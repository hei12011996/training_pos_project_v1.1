'use strict';
const fixtures = require('../main/fixtures');
const loadAllItems = fixtures.loadAllItems;
const loadPromotions = fixtures.loadPromotions;

function printReceipt(barcodesList){
}

function getItemsAndTotalQuantityByBarcodes(barcodesList){
	let barcodesAndQuantityMap = parseBarcodeListToCodeAndQuantity(barcodesList);
	return Object.keys(barcodesAndQuantityMap).map(barcode => {
		let parsedBarcode = barcode.split('-')[0];
		return {'item': getItemByBarcode(parsedBarcode), 'quantity': barcodesAndQuantityMap[parsedBarcode]};
	});
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
	if (unit === 'bottle' || unit === 'bag'){
		return quantity > 1 ? quantity + ' ' + unit + 's' : quantity + ' ' + unit;
	} else if (unit === 'box'){
		return quantity > 1 ? quantity + ' ' + unit + 'es' : quantity + ' ' + unit;
	}
	return quantity + ' ' + unit;
}

function getSubTotalByPromotions(item, quantity){
	let subTotal = 0;
	let promotionsInfo = loadPromotions();

	promotionsInfo.forEach(promotionInfo => {
		if (isPromotedItem(item, promotionInfo.barcodes) && promotionInfo.type === 'BUY_TWO_GET_ONE_FREE'){
			subTotal = getSubTotalWithBuyTwoGetOneFree(item, quantity);
		} else {
			subTotal = item.price * quantity;
		}
	});

	return subTotal;
}

function getSubTotalWithBuyTwoGetOneFree(item, quantity){
	let actualQuantity = quantity - parseInt(quantity / 3);
	return item.price * actualQuantity;
}

function isPromotedItem(item, promotionBarcodesList){
	return promotionBarcodesList.includes(item.barcode);
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
