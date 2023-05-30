const statuses = {
	red: "🔴",
	green: "🟢",
	blue: "🔵",
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

	return `<td>${status}</td>`;
};

export const getAttributeRow = (attribute: Attribute) =>
	`<td>${attribute.pct} (${attribute.covered} / ${attribute.total})</td>\n`;
