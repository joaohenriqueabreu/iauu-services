/** 
 * @class ScriptService 
 * Class for standalone script services (must self-contain db connection - compatible with services)
 */

const db = require('@iauu/connect');
const { InterfaceNotImplementdException } = require('@iauu/exceptions');

module.exports = class ScriptService {
  constructor(context) {
    this.context = context;
  }

  async run() {
    await db.connect(this.context);
    await this.internalRunScript();
  }

  async internalRunScript() {
    throw new InterfaceNotImplementdException('Must implement internalRunScript');
  }
}