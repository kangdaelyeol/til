// Interface - Function type (호출 시그니처: Call Signature)

// call signature as interface
interface GetName {
  (param: string): string
}

// call signature as type alias
type GetName2 = (param: string) => string

interface TUser {
  readonly name: string
  age: number
  isValid?: boolean
  getName: GetName
  getName2?: GetName2
}

const tUser: TUser = {
  name: 'rkdeofuf',
  age: 27,
  getName(message: string) {
      console.log(message)
      return this.name
  },
}
