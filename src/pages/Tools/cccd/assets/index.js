function importAll(r) {
    return r.keys().map(r);
}

const cccdBackGrounds = importAll(require.context('./background', false, /./));
const anhs = importAll(require.context('./anh', false, /./));
const vantay1s = importAll(require.context('./finger/vantay1', false, /./));
const vantay2s = importAll(require.context('./finger/vantay2', false, /./));

const matTruocs = cccdBackGrounds.filter(item => item.includes("mat-truoc"));
const matSaus = cccdBackGrounds.filter(item => item.includes("mat-sau"));

export {matTruocs, matSaus, vantay1s, vantay2s, anhs};