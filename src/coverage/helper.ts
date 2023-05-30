const statuses = {
	red: '🔴',
	green: '🟢',
	blue: '🔵',
};

type Attribute = {
	pct: number;
	covered: number;
	total: number;
};

export const getStatus = (attribute: Attribute) => {
	let status = statuses.red;

	if (attribute.pct >= 50 && attribute.pct < 80) {
		status = statuses.blue;
	} else if (attribute.pct >= 80) {
		status = statuses.green;
	}

	return `<td align="center">${status}</td>`;
};

export const getAttributeRow = (attribute: Attribute) =>
	`<td align="center">${attribute.pct}% (${attribute.covered} / ${attribute.total})</td>\n`;
