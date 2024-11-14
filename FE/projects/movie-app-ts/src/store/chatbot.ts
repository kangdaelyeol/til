import { Store } from 'src/core/core'

interface State {
    chatText: string
    messages: Message[]
    loading: boolean
}

interface Message {
    role: 'user' | 'assistant'
    content: string
}

const defaultMessages: Message[] = [
    { role: 'assistant', content: '좋아하는 영화 장르나 제목을 알려주세요' },
]

const store = new Store<State>({
    chatText: '',
    messages: defaultMessages,
    loading: false,
})

export default store

export const sendMesages = async () => {
    if (!store.state.chatText.trim()) return
    if (store.state.loading) return
    store.state.loading = true

    store.state.messages = [
        // messages Array의 push메서드를 사용하면 기존 배열의 참조값이 유지되므로 state 변경에 따른 리랜더링이 발생하지 않는다. 따라서 spread operator를 통해 deep copy 형태로 state값을 변경한다.
        ...store.state.messages,
        { role: 'user', content: store.state.chatText },
    ]

    try {
        const message = await (
            await fetch('/api/chatbot', {
                method: 'POST',
                body: JSON.stringify({
                    messages: store.state.messages,
                }),
            })
        ).json()

        store.state.messages = [...store.state.messages, message]
        store.state.chatText = ''
    } catch (e) {
        console.log('sendMessage error: ', e)
    } finally {
        store.state.loading = false
    }
}

export const resetMessages = () => {
    store.state.messages = defaultMessages
}
