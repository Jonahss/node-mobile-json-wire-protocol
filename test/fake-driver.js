import { errors } from '../..';
import { MobileJsonWireProtocol } from '../..';

class FakeDriver extends MobileJsonWireProtocol {

  constructor () {
    super();
    this.sessionId = null;
  }

  sessionExists (sessionId) {
    if (!sessionId) return false;
    return sessionId === this.sessionId;
  }

  async createSession (caps) {
    this.sessionId = "1234";
    return [this.sessionId, caps];
  }

  async execute (cmd, ...args) {
    if (!this[cmd]) {
      throw new errors.NotYetImplementedError();
    }
    return await this[cmd](...args);
  }

  async deleteSession () {
    this.sessionId = null;
  }

  async getStatus () {
    return "I'm fine";
  }

  async setUrl (url) {
    return `Navigated to: ${url}`;
  }

  async getUrl () {
    return "http://foobar.com";
  }

  async back (sessionId) {
    return sessionId;
  }

  async forward () {}

  async refresh () {
    throw new Error('Too Fresh!');
  }

  async getSession () {
    throw new errors.NoSuchDriverError();
  }

  async click (elementId, sessionId) {
    return [elementId, sessionId];
  }

}

export { FakeDriver };
