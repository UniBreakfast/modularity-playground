export function formPollerClass(idGenerator, requestFn) {

  return class Poller extends EventTarget {
    constructor (name) {
      super()
      Object.assign(this, {id: idGenerator(), name})
      this.listen()
    }

    async listen() {
      while (true) {
        const answers = await requestFn(this.id, {name: this.name})
        if (answers?.length)
          this.dispatchEvent(new CustomEvent('message', {detail: answers}))
      }
    }
  }

}
