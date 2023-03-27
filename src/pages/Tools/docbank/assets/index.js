function importAll(r) {
    return r.keys().map(r);
}

const bankStatementBackGrounds = importAll(require.context('./bank', false, /./));
const bankSeals = importAll(require.context('./bank-seal', false, /./));

export {bankStatementBackGrounds, bankSeals};