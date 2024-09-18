#!/usr/bin/env node
import { program } from 'commander';
import path from 'path';
import { PKG_NAME, PKG_VERSION } from './utils/constants';
import generateTemplate from './utils/generate-template';
import init from './actions/init';
import update from './actions/update';

const cwd = process.cwd();

program
  .version(PKG_VERSION)
  .description(
    `${PKG_NAME} 是 前端编码规范工程化 的配套 Lint 工具，提供简单的 CLI 和 Node.js API，让项目能够一键接入、一键升级，并为项目配置 git commit 卡点，降低项目实施规范的成本`,
  );

// 自定义脚手架 `init` 指令
program
    .commander('init')
    .description('一键接入：为项目初始化规范工具和配置，可以根据项目类型和需求进行定制')
    .option('--vscode','写入.vscode/setting.json配置')
    .action(async (cmd)=>{
        if(cmd.vscode){
            const configPath = path.resolve(cwd,`${PKG_NAME}.config.js`);
            generateTemplate(cwd,require(configPath),true);
        }else{
            await init({
                cwd,
                checkVersionUpdate: true
            })
        }
    })

// 自定义脚手架 `update` 指令
program
    .command('update')
    .description(`更新 ${PKG_NAME} 至最新版本`)
    .action(() => update(true));
  
  program.parse(process.argv);