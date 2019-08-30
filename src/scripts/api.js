export default class Api {
    constructor (authorization) {
        this.authorization = authorization
    }

    getInitialCards (baseUrl, method) {
        return fetch(`https://praktikum.tk/cohort1/${baseUrl}`, {
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

    getUserInfo (baseUrl, method) {
        return fetch(`https://praktikum.tk/cohort1/${baseUrl}`, {
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

    changeUserInfo (baseUrl, method) {
        editBtn.textContent = 'Загрузка...'
        return fetch(`https://praktikum.tk/cohort1/${baseUrl}`, {
            method: `${method}`,
            headers: {
                authorization: `${this.authorization}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: `${inputUserName.value}`,
                about: `${inputUserAbout.value}`
            })
        })

            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(`Ошибка: ${res.status}`)
            })
    }

    postCard (baseUrl, method, nameCard, linkCard) {
        postBtn.textContent = 'Загрузка...'
        return fetch(`https://praktikum.tk/cohort1/${baseUrl}`, {
            method: `${method}`,
            headers: {
                authorization: `${this.authorization}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: `${nameCard}`,
                link: `${linkCard}`
            })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(`Ошибка: ${res.status}`)
            })
    }

    likeSum (baseUrl, method) {
        return fetch(`https://praktikum.tk/cohort1/${baseUrl}`, {
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

    changeAvatar (baseUrl, method) {
        postAvatar.textContent = 'Загрузка...'
        return fetch(`https://praktikum.tk/cohort1/${baseUrl}`, {
            method: `${method}`,
            headers: {
                authorization: `${this.authorization}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: `${inputAvatarUrl.value}`
            })
        })

            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(`Ошибка: ${res.status}`)
            })
    }

    deleteCard (cardId, method) {
        return fetch(`https://praktikum.tk/cohort1/cards/${cardId}`, {
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