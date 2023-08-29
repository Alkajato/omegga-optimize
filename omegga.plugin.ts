import OmeggaPlugin, { OL, PS, PC } from 'omegga';

type Config = { foo: string };
type Storage = { bar: string };

export default class Plugin implements OmeggaPlugin<Config, Storage> {
  omegga: OL;
  config: PC<Config>;
  store: PS<Storage>;

  constructor(omegga: OL, config: PC<Config>, store: PS<Storage>) {
    this.omegga = omegga;
    this.config = config;
    this.store = store;
  }

  async init() {
    this.omegga.on('cmd:print', (callerName: string) => {
      const player = this.omegga.getPlayer(callerName)

      player.getTemplateBoundsData().then((copied) => {
        this.omegga.broadcast(`Copied: ${copied.bricks}!`);
      })
    })

    this.omegga.on('cmd:optimize', (callerName: string) => {
    });

    return { registeredCommands: ['optimize', 'print'] };
  }

  async stop() {
    // Anything that needs to be cleaned up...
  }
}
