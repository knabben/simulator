#!/usr/bin/env node

const { createLogger } = require('../lib/logger')
const { getCurrentTask } = require('../lib/tasks.js')
const { cloneArray } = require('../lib/helpers')
const { nextHint } = require('../lib/hints.js')

require('../lib/error-handler')

const args = cloneArray(process.argv)

args.shift() // remove `node` from argv
args.shift() // remove `scenario.js` from argv

if (args.length === 1 && args[0] === '--debug') {
  console.log('Setting global DEBUG flag')
  global.DEBUG = true
}

const logger = createLogger({})

logger.debug('Getting current task')
getCurrentTask().then(task => {
  logger.debug('Current task', { task })
  if (task === null) {
    logger.error(
      'You have not started a task.  Please run `start_task` to select your task')
    process.exit(1)
  }

  logger.debug('Calling nextHint', { task })
  nextHint(task).then(_ => {
    process.exit(0)
  }, reason => {
    logger.errror(reason.message)
    process.exit(1)
  })
})
