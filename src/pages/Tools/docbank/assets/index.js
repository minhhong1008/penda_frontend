function importAll(r) {
    return r.keys().map(r);
}

const bankStatementBackGrounds = importAll(require.context('./bank', false, /./));
const bankSeals = importAll(require.context('./bank-seal', false, /./));
const ggvs = importAll(require.context('./ggv', false, /./));

export {bankStatementBackGrounds, bankSeals, ggvs};