import {JSONMapper} from '../src/mapper'

describe('JSONMapper', () => {
  const mapper = new JSONMapper(
    '{"k.y":{"env1":"value1"},".*":{"env2":"value2"}}'
  )

  it('JSONMapper holds the order of keys', () => {
    const expects = ['k.y', '.*']
    for (const [index, pair] of mapper.pairs.entries()) {
      expect(pair.key).toBe(expects[index])
    }
  })

  it('JSONMapper can be matched with regular expressions', () => {
    const got = mapper.match('key')
    if (!got) {
      throw new Error('No match')
    }
    expect(got.key).toBe('k.y')
    expect(got.variables).toMatchObject(new Map([['env1', 'value1']]))
  })
})
