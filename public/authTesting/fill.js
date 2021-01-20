export function fill(authority, strings) {
  strings.add('aDmInKeY')
  authority.register('admin', 'aDmInKeY')
  authority.startSession('admin', 'aDmInKeY')
}
