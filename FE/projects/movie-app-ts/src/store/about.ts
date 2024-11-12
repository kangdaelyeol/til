import { Store } from '../core/core'

interface State {
    photo: string
    name: string
    email: string
    blog: string
    github: string
    repository: string
}

export default new Store<State>({
    photo: 'https://avatars.githubusercontent.com/u/27201345?v=4',
    name: 'DANIEL / KangDaeLyeol',
    email: 'kdy0510123@gmail.com',
    blog: 'https://heropy.blog',
    github: 'https://github.com/kangdaelyeol',
    repository: 'https://github.com/kangdaelyeol/kangdaelyeol.github.io',
})
