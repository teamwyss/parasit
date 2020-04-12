
function pos(nX, nY) {
	return {x: nX, y: nY};
}
function posDiff(posZero, posOne) {
	return pos(
		(posZero.x - posOne.x),
		(posZero.y - posOne.y)
	);
}
function posAdd(posZero, posOne) {
	return posMove(posZero, posOne);
}
function posSubtract(posZero, posOne) {
	return posDiff(posZero, posOne);
}
function posMove(posZero, posOne) {
	let nNewX = posZero.x + posOne.x;
	let nNewY = posZero.y + posOne.y;
	return {x: nNewX, y: nNewY};
}
function posDivide(posZero, nDivisor) {
	return pos(
		(posZero.x / nDivisor),
		(posZero.y / nDivisor),
	);
}
function posToString(posZero) {
	return "{x:" +posZero.x + ", y:" + posZero.y + "}";
}
