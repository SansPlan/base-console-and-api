#!/bin/bash

# 配置仓库地址
REPOS=("https://github.com/LearnOnce/learn-permission-control-admin.git")

# 执行 Prettier 和 ESLint
pnpm -C ./console run prettier
pnpm -C ./console run eslint

# 验证提交消息
COMMIT_MSG=$1
if [[ -z "$COMMIT_MSG" ]]; then
  echo "错误: 请提供提交消息"
  exit 1
fi

if ! [[ "$COMMIT_MSG" =~ ^(feat|fix|docs|style|refactor|perf|test|chore|build|ci|revert)\: ]]; then
  echo "错误: 提交消息不符合规范，请以类型开头，例如 'feat: ...'"
  exit 1
fi

git commit -m "$COMMIT_MSG"

# 提交到所有配置的仓库
# for REPO in "${REPOS[@]}"; do
#   echo "正在推送到 $REPO ..."

#   # 检查临时远程是否已存在，存在则删除
#   if git remote get-url temp &>/dev/null; then
#     git remote remove temp
#   fi
  
#   # 添加远程仓库
#   git remote add temp "$REPO"
  
#   # 提交
#   git commit -m "$COMMIT_MSG"

#   # 推送
#   git push temp main
  
#   # 删除临时远程
#   git remote remove temp
# done

# echo "所有仓库已成功提交"
