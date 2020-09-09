const Quell = require('./quell2.js')
const { parse } = require('./node_modules/graphql/language/parser')

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

console.log('NEWQUELL', newQuell.proto)
