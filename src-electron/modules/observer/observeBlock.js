import logger from '../logger'
import _ from 'lodash'

const log = logger.create('ObserveBlock')

class ObserveBlock {
  constructor () {
    this.subscription = null
  }

  start () {
    const web3 = global.web3

    this.subscription = web3.eth
      .subscribe('newBlockHeaders')
      .on('data', function (blockHeader) {
        // log.debug('Emitted newBlockHeaders: ', blockHeader)
        global.stateManager.emit('sync', 'account')
      })
  }

  stop () {
    // unsubscribes the subscription
    if (this.subscription != null) {
      this.subscription.unsubscribe(function (error, success) {
        if (success) {
          log.info('Successfully unsubscribed!')
        } else {
          log.error('Failed to unsubscribe "newBlockHeaders": ', error)
        }
      })
    }
  }
}

export default new ObserveBlock()