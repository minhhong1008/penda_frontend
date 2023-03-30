function importAll(r) {
    return r.keys().map(r);
}

const cccdBackGrounds = importAll(require.context('./background', false, /./));
const fingers = importAll(require.context('./finger', false, /./));

const matTruocs = cccdBackGrounds.filter(item => item.includes("mat-truoc"));
const matSaus = cccdBackGrounds.filter(item => item.includes("mat-sau"));

export {matTruocs, matSaus, fingers};