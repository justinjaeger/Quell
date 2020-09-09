const Quell = require('../quell2.js')
const { parse } = require('graphql/language/parser')

describe('Quell Class', () => {

  let dummyMap = {
      countries: 'Country',
      country: 'Country',
      citiesByCountryId: 'City',
      cities: 'City'
    }
    
  let dummyQuery = `
  {
    countries {
      name
      capital
      cities {
        name
        population
      }
    }
  }`


  let dummyAst = parse(dummyQuery)

  const newQuell = new Quell(dummyQuery, dummyMap, dummyAst)

  // ===================== //

  it('should store query & map & ast properly', () => {
    expect(newQuell.query).toEqual(dummyQuery);
    expect(newQuell.map).toEqual(dummyMap);
    expect(newQuell.AST).toEqual(dummyAst);
  })

  it('should assign valid reseponse from parseAST to this.proto', () => {
    let dummyProtoResult = { countries: { name: true, capital: true, cities: { name: true, population: true } } }
    expect(newQuell.proto).toEqual(dummyProtoResult)
  })

})