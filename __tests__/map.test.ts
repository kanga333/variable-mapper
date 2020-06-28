import {ParameterMapList} from '../src/map'

describe('ParameterMapList', () => {
  const list = new ParameterMapList(
    '{"k.y":{"env1":"value1"},".*":{"env2":"value2"}}'
  )

  it('ParameterMapList holds the order of keys', () => {
    const expects = ['k.y', '.*']
    for (const [index, param] of list.prams.entries()) {
      expect(param.key).toBe(expects[index])
    }
  })

  it('ParameterMapList can be matched with regular expressions', () => {
    const got = list.match('key')
    if (!got) {
      throw new Error('No match')
    }
    expect(got.key).toBe('k.y')
    expect(got.value).toMatchObject(new Map([['env1', 'value1']]))
  })
})
