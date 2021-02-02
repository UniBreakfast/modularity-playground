module.exports = function makeEndpointHandlers(authority, accounts, sessions){

  return {
    register: async (req, resp) =>
      resp.body = authority.register(...await req.data),

    logIn: async (req, resp) =>
      resp.body = authority.startSession(...await req.data),

    checkIn: async (req, resp) =>
      resp.body = authority.continueSession(...await req.data),

    getAccounts: async (req, resp) => resp.body = accounts,

    getSessions: async (req, resp) => resp.body = sessions,

    async removeAccount(req, resp) {
      const {id} = await req.data
      accounts.splice(0, Infinity, ...accounts.filter(acc => acc.id != id))
      resp.body = true
    },

    async removeSession(req, resp) {
      const {id} = await req.data
      accounts.splice(0, Infinity, ...sessions.filter(sess => sess.id != id))
      resp.body = true
    },
  }
}
