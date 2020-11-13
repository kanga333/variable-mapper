import {JSONMapper} from '../src/mapper'

describe('JSONMapper', () => {
  const mapper = new JSONMapper(
    '{"k.y":{"env1":"value1"},".*":{"env2":"value2"}}',
    'first_match'
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

  it('JSONMapper should throw an exception on invalid input', () => {
    expect(() => {
      new JSONMapper('{"invalid":"schema"}', 'first_match')
    }).toThrow()
  })

  describe('Overwrite Matcher', () => {
    const overwrite = new JSONMapper(
      '{"k.y":{"env1":"value1","env2":"value2"},".*":{"env2":"overwrite"}}',
      'overwrite'
    )

    it('Overwrite Matcher can match and overwrite multiple values', () => {
      const got = overwrite.match('key')
      if (!got) {
        throw new Error('No match')
      }
      expect(got.key).toBe('k.y\n.*')
      expect(got.variables).toMatchObject(
        new Map([
          ['env1', 'value1'],
          ['env2', 'overwrite']
        ])
      )
    })
  })
})
