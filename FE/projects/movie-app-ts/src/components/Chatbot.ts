import { Component } from 'src/core/core'
import chatStore, { sendMessages } from '../store/chatbot'
import movieStore, { searchMovies } from '../store/movie'

export default class Chatbot extends Component {
    constructor() {
        super()
        chatStore.subscribe('messages', () => this.render())
        chatStore.subscribe('loading', () => this.render())
    }
    render() {
        this.el.classList.add('chatbot')

        this.el.innerHTML = /* HTML */ `
            <div class="chats">
                <ul>
                    ${chatStore.state.messages
                        .map(
                            (msg) => /* html */ `
                            
                  <li class="${msg.role}">
                    ${
                        msg.role === 'assistant'
                            ? /* html */ `
                            <div class="photo">
                              <span class="material-symbols-outlined">smart_toy</span>
                            </div>
                            `
                            : ''
                    }
                  ${
                      typeof msg.content === 'string' // type guard
                          ? msg.content.replace(
                                /{{(.*?)\/\/(.*?)}}/g,
                                (match, ko, en) => /* html */ `
                    <span class="movie-title" data-movie-title="${en}">${ko}</span>
                  `,
                            )
                          : ''
                  }
                </li>
                    `,
                        )
                        .join('')}
                    ${chatStore.state.loading
                        ? /* html */ `
                          <li class="assistant">
                        <div class="photo">
                            <span class="material-symbols-outlined"
                                >smart_toy</span
                            >
                        </div>
                        <div class="the-loader"></div>
                    </li>`
                        : ''}
                </ul>
                <div class="input">
                    <input />
                    <button class="btn btn-primary">
                        <span class="material-symbols-outlined">send</span>
                    </button>
                </div>
            </div>
            <div class="btn btn-circle chat-starter">
                <span class="material-symbols-outlined icon--open">chat</span>
                <span class="material-symbols-outlined icon--close">close</span>
            </div>
        `

        // chatbot input
        const inputEl = this.el.querySelector('input')
        inputEl?.addEventListener('input', () => {
            chatStore.state.chatText = inputEl.value
        })

        inputEl?.addEventListener('keydown', (event: Event) => {
            // type guard
            if (
                event instanceof KeyboardEvent &&
                event.key === 'Enter' &&
                !event.isComposing // CJK 텍스트의 경우 브라우저가 분석하는 과정을 거치기 때문에 이벤트가 두 번 발생할 수 있다 - isComposing
            ) {
                sendMessages()
            }
        })

        // movie title link
        const movieTitleElList =
            document.querySelectorAll<HTMLElement>('.movie-title')

        movieTitleElList.forEach((el) => {
            el.addEventListener('click', () => {
                const searchInputEl =
                    document.querySelector<HTMLInputElement>('.search input')
                if (!searchInputEl) return
                const titleText = el.dataset.movieTitle || ''
                movieStore.state.searchText = titleText
                searchInputEl.value = titleText
                searchMovies(1)
            })
        })

        const btnEl = this.el.querySelector('.input .btn')
        btnEl?.addEventListener('click', () => {
            sendMessages()
        })

        // chat starter button
        const chatStarterEl = this.el.querySelector('.chat-starter')
        chatStarterEl?.addEventListener('click', (event: Event) => {
            event.stopPropagation()
            console.log('click')
            this.el.classList.toggle('chatbot--on')
            const offChats = () => this.el.classList.remove('chatbot--on')
            setTimeout(() => {
                inputEl?.focus()
            }, 300)
            if (this.el.classList.contains('chatbot--on'))
                window.addEventListener('click', offChats)
            else window.removeEventListener('click', offChats)
        })

        const chatsEl = this.el.querySelector('.chats')
        chatsEl?.addEventListener('click', (event: Event) => {
            event.stopPropagation()
        })

        const messageListEl = this.el.querySelector('.chats ul')

        messageListEl?.scrollTo(0, messageListEl.scrollHeight || 0)

        inputEl?.focus()
    }
}
