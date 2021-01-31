export async function fill(requestFn, strings) {
  strings.add('aDmInKeY')
  await requestFn('/api/reg', ['admin', 'aDmInKeY'])
  await requestFn('/api/login', ['admin', 'aDmInKeY'])
}
