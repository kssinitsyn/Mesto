export default class CardList {
    constructor(authorization) {
        this.authorization = authorization
    }

    getInitialCards(baseUrl, method) {
        return fetch(`${baseUrl}/cards`, {
            method: `${method}`,
            headers: {
                authorization: `${this.authorization}`
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(`Ошибка: ${res.status}`)
            })
    }
}