module.exports = function fill(authority) {
  authority.register('admin', 'aDmInKeY')
  authority.startSession('admin', 'aDmInKeY')
}
