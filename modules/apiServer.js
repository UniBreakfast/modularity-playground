module.exports = function prepAPI(params) {
  return {
    '/poll': handlePoller

  }
}


const {handle: handlePoller} = require('./pollMaster')
