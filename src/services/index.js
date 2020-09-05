export const findAll = model => model.findAll();

export const findByPk = (model, id) => model.findByPk(id);

export const findOrCreate = (model, payload) =>
    model.findOrCreate({
        where: { email: payload.email },
        defaults: {
            ...payload
        }
    });

export const findUser = (model, payload) =>
    model.findOne({
        where: {
            email: payload
        },
        logging: false
    });

export const genPaymentAccountId = () => {
    // random account id with header 9001 of banking
    const hed = "9001";
    const ran = Math.floor(Math.random() * 1000000000);
    const bod = ran.toString().padStart(9, "0"); // make sure 9 number zero (9 chữ số 0)
    return hed + bod;
    // chưa check trùng, nhưng 13 chữ số khả năng trùng rất thấp
}

export const genSaveAccountId = () => {
    const hed = "9002";
    const ran = Math.floor(Math.random() * 1000000000);
    const bod = ran.toString().padStart(9, "0"); // make sure 9 number zero (9 chữ số 0)
    return hed + bod;
    // chưa check trùng, nhưng 13 chữ số khả năng trùng rất thấp
}