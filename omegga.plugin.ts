import OmeggaPlugin, { OL, PS, PC, Brick, Vector, BrickV10 } from 'omegga';
import BrickMerger, { Mergable, vectorsEqual } from "./compressor"

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
    this.omegga.on('cmd:optimize', (callerName: string) => {
      const player = this.omegga.getPlayer(callerName)
      const decoratedName = `<color="${player.getNameColor()}"><b>${callerName}</></>`;

      this.omegga.broadcast(`${decoratedName} called /optimize`);

      const startTime = new Date().getTime()
      player.getTemplateBoundsData().then((copied) => {
        for (let brick of copied.bricks) {
          const type = copied.brick_assets[brick.asset_name_index]
          const correctType = type === "PB_DefaultBrick" || type === "PB_DefaultMicroBrick";
          const noComponents = BrickMerger.hasComponents(brick) === false;

          if (correctType && noComponents)
            BrickMerger.correct(brick)
        }

        // Merge bricks together by XYZ or YXZ so on so on.
        const previousCount = copied.bricks.length;
        const bricks = copied.bricks;

        // End of computations.
        // Report stats of the improvement.
        const percentImproved = 100 - ((bricks.length / previousCount) * 100)
        const finalTime = (new Date().getTime() - startTime) / 1000
        this.omegga.broadcast(`Optimized <b>${previousCount}</> bricks down to <b>${bricks.length}</> (${percentImproved}% reduction) in ${finalTime}s`)

        player.loadSaveData(copied)
      })
    });

    this.omegga.on('cmd:merge', (callerName: string) => {
      const player = this.omegga.getPlayer(callerName)

      player.getTemplateBoundsData().then((copied) => {
        const bricks: Brick[] = copied.bricks

        this.omegga.broadcast("Copied: ")
        for (let i = 1; i < bricks.length; i++) {
          const current = bricks[i - 1]
          const currentType = copied.brick_assets[current.asset_name_index] as Mergable

          const next = bricks[i]
          const nextType = copied.brick_assets[next.asset_name_index] as Mergable

          BrickMerger.correct(current)
          BrickMerger.correct(next)

          const mergable = BrickMerger.canMerge([current, currentType], [next, nextType])
          this.omegga.broadcast(`Can bricks[${i - 1}] merge with bricks[${i}]: ${mergable}`);
        }
      })
    })

    this.omegga.on('cmd:print', (callerName: string) => {
      const player = this.omegga.getPlayer(callerName)

      player.getTemplateBoundsData().then((copied) => {
        console.log(`Read ${copied.bricks.length} bricks in print`)

        for (let brick of copied.bricks) {
          this.omegga.broadcast(`Rot(${brick.rotation}), Size(${brick.size}), Pos(${brick.position})`);
        }
      })
    })

    this.omegga.on('cmd:orient', (callerName: string) => {
      const player = this.omegga.getPlayer(callerName)

      player.getTemplateBoundsData().then((copied) => {
        for (let brick of copied.bricks) {
          const type = copied.brick_assets[brick.asset_name_index]
          const correctType = type === "PB_DefaultBrick" || type === "PB_DefaultMicroBrick";
          const noComponents = BrickMerger.hasComponents(brick) === false;

          if (correctType && noComponents)
            BrickMerger.correct(brick)
        }

        player.loadSaveData(copied)
        this.omegga.broadcast(`Orienting bricks for ${callerName}`)
      })
    })

    this.omegga.on('cmd:clear', () => {
      for (let i = 0; i < 12; i++)
        this.omegga.broadcast("");
    })

    this.omegga.on('cmd:pos', (callerName: string) => {
      const player = this.omegga.getPlayer(callerName)
      player.getPosition().then((pos) => {
        this.omegga.whisper(callerName, `${pos}`)
      })
    })

    return { registeredCommands: ['optimize', 'merge', 'orient', 'pos', 'print', 'touch', 'clear'] };
  }

  async stop() {
    // Anything that needs to be cleaned up...
  }
}
