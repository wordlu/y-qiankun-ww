module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build', // 构建
        'ci', // 持续集成修改
        'docs', // 文档更新
        'feat', // 新功能
        'fix', // 问题修复
        'perf', // 性能升级
        'refactor', // 功能重构
        'revert', // 回滚
        'style', // 格式更改
        'test', // 单元测试/测试
        'chore', // 除上述之外的
        'improvement', // 改进
      ],
    ],
  },
  prompt: {
    messages: {
      type: '选择您要提交的更改类型:',
      scope: '选择一个提交范围(可选):',
      customScope: '请输入自定义的提交范围:',
      subject: '填写简短精炼的变更描述:\n',
      body: '填写更加详细的变更描述(可选)。使用"|"换行:\n',
      breaking: '列举非兼容性重大的变更(可选)。使用 "|" 换行:\n',
      footerPrefixsSelect: '选择关联 issue 前缀（可选）:',
      customFooterPrefixs: '输入自定义 issue 前缀 :',
      footer: '列举关联 issue (可选) 例如:#31, #34:\n',
      confirmCommit: '您确定要继续进行上面的提交吗?',
    },
    types: [
      { value: 'feat', name: 'feat:    新增功能', emoji: ':sparkles:' },
      { value: 'fix', name: 'fix:      修复缺陷', emoji: ':bug:' },
      { value: 'docs', name: 'docs:     文档变更', emoji: ':memo:' },
      {
        value: 'style',
        name: 'style:    代码格式（不影响功能，例如空格、分号等格式修正）',
        emoji: ':lipstick:',
      },
      {
        value: 'refactor',
        name: 'refactor: 代码重构（不包括 bug 修复、功能新增）',
        emoji: ':recycle:',
      },
      { value: 'perf', name: 'perf:     性能优化', emoji: ':zap:' },
      {
        value: 'test',
        name: 'test:     添加疏漏测试或已有测试改动',
        emoji: ':white_check_mark:',
      },
      {
        value: 'build',
        name: 'build:    构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）',
        emoji: ':package:',
      },
      {
        value: 'ci',
        name: 'ci:       修改 CI 配置、脚本',
        emoji: ':ferris_wheel:',
      },
      { value: 'revert', name: 'revert:   回滚 commit', emoji: ':rewind:' },
      {
        value: 'chore',
        name: 'chore:    对构建过程或辅助工具和库的更改（不影响源文件、测试用例）',
        emoji: ':hammer:',
      },
      {
        value: 'improvement',
        name: 'improvement:    其他的优化改进',
        emoji: ':dart:',
      },
    ],
    emptyIssuePrefixsAlias: '跳过',
    customIssuePrefixsAlias: '自定义前缀',
    useEmoji: true,
  },
};
