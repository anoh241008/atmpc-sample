import api from "../../../axiosInstance";

export const getPaymentList = async(page = 0 , size = 20) => {

    return await api.get(`/api/billingpayment/paymentList?page=${page}&size=${size}`);

}

export const billingElectric = async(paymentid, data) => {

    return await api.put(`/api/billingpayment/MarkPaidUnpaid/${paymentid}`, data);

}