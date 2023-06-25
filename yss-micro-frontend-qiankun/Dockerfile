# nginx 基础镜像
FROM nginx:1.14-alpine

# 环境变量 参数
ARG PROJECT_DIR="dist"

# 把前端项目拷贝到指定nginx目录
COPY dist/ /usr/share/nginx/html/
# 用本地配置文件来替换nginx镜像里的默认配置 （可选）
# COPY nginx/nginx-${PROFILE}.conf /etc/nginx/nginx.conf

# 暴露端口
EXPOSE 80