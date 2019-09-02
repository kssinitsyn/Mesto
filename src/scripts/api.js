const editBtn = document.querySelector('.popup-edit__button')
const inputUserName = document.querySelector('.popup-edit__input_type_name')
const inputUserAbout = document.querySelector('.popup-edit__input_type_about')
const postBtn = document.querySelector('.popup__button')
const postAvatar = document.querySelector('.popup-avatar__button')
const inputAvatarUrl = document.querySelector('.popup-avatar__input_type_name')

export default class Api {
    constructor (authorization) {
        this.authorization = authorization
    }

    getUserInfo (baseUrl, method) {
        return fetch(`${baseUrl}/users/me`, {
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
        return fetch(`${baseUrl}/users/me`, {
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
        return fetch(`${baseUrl}/cards/`, {
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

    changeAvatar (baseUrl, method) {
        postAvatar.textContent = 'Загрузка...'
        return fetch(`${baseUrl}/users/me/avatar`, {
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

    deleteCard (baseUrl, cardId, method) {
        return fetch(`${baseUrl}/cards/${cardId}`, {
            method: `${method}`,
            headers: {
                authorization: `${this.authorization}`,
                'Content-Type': 'application/json'
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


// event.target.classList.toggle("place-card__like-icon_liked");
// }
// remove(event) {
//     const card = event.target.closest(".place-card");
//     placesList.removeChild(card);
// }