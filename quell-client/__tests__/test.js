const Quell = require('../quell.js')
const { parse } = require('../node_modules/graphql/language/parser')

describe('A Test for the tests', () => {
  const addByTwo = (num) => {
    return num+2
  }
  it('This should pass', () =>{
    expect(addByTwo(2)).toEqual(4)
  })
})

describe('Quell Class, which builds prototype from query', () => {
  let dummyMap = {
      countries: 'Country',
      country: 'Country',
      citiesByCountryId: 'City',
      cities: 'City'
    }
    
  let dummyQuery = `
  {
    countries {
      id
      name
      capital
      cities {
        id
        country_id
        name
        population
      }
    }
  }`

  const newQuell = new Quell(dummyMap, dummyQuery)

  const dummyOutput = {
    countries: {
      id: true,  
      name: true,
      capital: true,  
      cities: {
       country_id: true,  
       id: true,
       population: true,  
       name: true
      }  
    }
  }

  it('Quell func should return proper prototype', () =>{
    expect(newQuell.proto).toEqual(output)
  })

  it('parseAST should return ', () => {
    const ast = parse(query)
    expect(newQuell.parseAST(ast)).toEqual(dummyOutput)
  })

  it('parseAST should return ', () => {
    const ast = parse(query)
    expect(newQuell.parseAST(ast)).toEqual(dummyOutput)
  })

})