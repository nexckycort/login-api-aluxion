import type { Config } from '@jest/types'
import { pathsToModuleNameMapper } from 'ts-jest/utils'
const {
  compilerOptions: { paths: tsconfigPaths }
} = require('./tsconfig.json')

const paths = {
  ...pathsToModuleNameMapper(tsconfigPaths)
}
Object.assign(
  paths,
  ...Object.keys(paths).map((key) => ({
    [key]: `<rootDir>/src/${paths[key]}`
  }))
)

const typeTest = process.env.TEST ?? 'unit'
const roots: any = {
  unit: ['<rootDir>/src'],
  int: ['<rootDir>/tests']
}

const config: Config.InitialOptions = {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: roots[typeTest],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!**/node_modules/**'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  moduleNameMapper: paths
}

export default config
