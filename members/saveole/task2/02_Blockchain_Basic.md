# Task2 Blockchain Basic

本任务分为简答题、分析题和选择题，以此为模板，在下方填写你的答案即可。

选择题，请在你选中的项目中，将 `[ ]` 改为 `[x]` 即可

## [单选题] 如果你莫名奇妙收到了一个 NFT，那么

- [ ] 天上掉米，我应该马上点开他的链接
- [x] 这可能是在对我进行诈骗！

## [单选题] 群里大哥给我发的网站，说能赚大米，我应该

- [ ] 赶紧冲啊，待会米被人抢了
- [x] 谨慎判断，不在不信任的网站链接钱包

## [单选题] 下列说法正确的是

- [x] 一个私钥对应一个地址
- [ ] 一个私钥对应多个地址
- [ ] 多个私钥对应一个地址
- [ ] 多个私钥对应多个地址

## [单选题] 下列哪个是以太坊虚拟机的简称

- [ ] CLR
- [x] EVM
- [ ] JVM

## [单选题] 以下哪个是以太坊上正确的地址格式？

- [ ] 1A4BHoT2sXFuHsyL6bnTcD1m6AP9C5uyT1
- [ ] TEEuMMSc6zPJD36gfjBAR2GmqT6Tu1Rcut
- [ ] 0x997fd71a4cf5d214009619808176b947aec122890a7fcee02e78e329596c94ba
- [x] 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266

## [多选题] 有一天某个大哥说要按市场价的 80% 出油给你，有可能

- [x] 他在洗米
- [ ] 他良心发现
- [x] 要给我黒米
- [x] 给我下套呢

## [多选题] 以下哪些是以太坊的二层扩容方案？

- [ ] Lightning Network（闪电网络）
- [x] Optimsitic Rollup
- [x] Zk Rollup

## [简答题] 简述区块链的网络结构

```
去中心化/分布式的网络结构，数据存储在全球各个节点中，节点间使用 P2P 的形式通讯，基础的存储数据单位为区块，区块与区块间以形如列表的方式串联在一起，区块里存储的是交易信息，要想成功完成一笔交易，需要支付费用让矿工将其打包到区块中，经过链上所有节点的共识确认才能最终完成。
```

## [简答题] 智能合约是什么，有何作用？

```
合约是交易双方就交易达成的共识，并经过权威机构的认证。区块链中的智能合约是将这个过程电子化/程序化，并经由区块链的特性来保证合约的合法性和可信任性。作用是增强交易效率和交易安全。
```

## [简答题] 怎么理解大家常说的 `EVM` 这个词汇？

```
EVM 是以太坊虚拟机，是以太坊区块链程序运行的基础环境。白皮书规定了这个虚拟机的规范，由组织或者厂商去实现它的具体功能，不通编程语言有不同实现，最终会将代码(如智能合约程序)编译成字节码在实际的节点上执行各类交易。+
```

## [分析题] 你对去中心化的理解

```
首先谈一下中心化，如软件单体架构和现实中的权威机构，掌握着所有的资源/数据和权力，一旦失效或失稳，会有巨大的影响和损失。
去中心化，我理解相当于是分权，将决策的权力分配到每个参与的节点，将数据也给到每个节点，决策时群策群力，避免/减轻了某个或者若干个节点失效对整个系统造成的不良影响。如果这些节点都是精英或者强效率的节点，通过技术平权可能是可行的。但如果如现实世界情况一般，草台班子或民粹傻子居多，是否会有效率低下/资源浪费的情况出现？
```

## [分析题] 比较区块链与传统数据库，你的看法？

```
传统数据库一般是单体或者是有限分布式的，很难避免单点失效或区域失效，即使分布式也只做到了有限的数据冗余。区块链是真正的去中心化全球节点存储，且节点间数据可证/可信，每个几点做到了整体的数据冗余，只要有一个几点存在，所有链上数据就都存在。
```

## 操作题

安装一个 WEB3 钱包，创建账户后与 [openbuild.xyz](https://openbuild.xyz/profile) 进行绑定，截图后文件命名为 `./bind-wallet.jpg`.
